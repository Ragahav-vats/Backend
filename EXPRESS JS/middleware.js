module.exports = (request,response,next) => {
    if(!request.query.api_key || !request.query.password){
        const data = {
            _status : false,
            _message : "Invalid API !!",
            _data : []
        }
        response.send(data);
    }else{
        next();
    }
}