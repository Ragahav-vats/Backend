const http = require('http');
const { categories, brands, productDetails } = require('./apiData');

http.createServer((request,response) => {

    if(request.url == '/'){
        response.end('<h1>server is started</h1>');
    }else if(request.url == '/categories' && request.method == 'GET'){

        const data = {
            _status : true,
            _message : 'Record Found Successfully !' ,
            _data : categories
        }
        response.end(JSON.stringify(data));
    }else if(request.url == '/brands' && request.method == 'POST'){

        if(brands.length > 0){
            const data = {
            _status : true,
            _message : 'Record Found Successfully !' ,
            _data : brands
        }
        response.end(JSON.stringify(data));
    }else{
            const data = {
            _status : false,
            _message : 'NO Record Found !!' ,
            _data : [],
        }
        response.end(JSON.stringify(data));
    }
        }else if(request.url == '/product-details' && request.method == 'POST'){

        if(productDetails != ''){
            const data = {
            _status : true,
            _message : 'Record Found Successfully !' ,
            _data : productDetails
        }
        response.end(JSON.stringify(data));
    }else{
            const data = {
            _status : false,
            _message : 'NO Record Found !!' ,
            _data : null,
        }
        response.end(JSON.stringify(data));
    }
        }else{
        response.end('API NOT FOUND !!');
        }
        

    // console.log(request.url);
    // console.log(request.method);

    // var categories = [
    //     {
    //         id : 1,
    //         name :'mens'
    //     },
    //     {
    //         id : 2,
    //         name : 'women'
    //     }
    // ]
    //   response.end(JSON.stringify(categories));

    
})
.listen(5000, () => {
    console.log('server is working');
});
