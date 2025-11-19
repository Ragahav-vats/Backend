const defaultModel = require("../../models/default")

exports.create = async (request,response) => {

    const saveData = {
        name : request.body.name,
        status : request.body.status,
        order : request.body.order
    }

    await defaultModel(saveData).save()
    .then((result) => {
        const data = {
        _status : true,
        _message : 'Record Found sucessfully !!',
        _data : result
      }
    response.send(data)
    })
    .catch((error) => {

      var errorMessages = {};

      for( var i in error.errors){
        errorMessages[i] = error.errors[i].message;
      }


        const data = {
        _status : false,
        _message : 'something went wrong !!',
        _error : errorMessages,
        _data : null
      }
    response.send(data)
    })
}
exports.view = async(request,response) => {

  var page = 1;
  var limit = 4;
  var skip = 0;

    if(request.body){
      if(request.body.limit){
        limit = request.body.limit;
      }

      if(request.body.page){
        page = request.body.page;
        skip = (page - 1) * limit;
      }
    }

    // var nameRegex = new RegExp(request.body.name,"i")

    var filter = {
      deleted_at : null,
      // name : nameRegex,
      // order : {
      //   $gt : 2
      // },
      status : {
        $type : 8
      },
    }

    var total_records = await defaultModel.find(filter).countDocuments();

  await defaultModel.find(filter).limit(limit).skip(skip)
  .select('name status order')
  .sort({
    order : 'asc',
    _id : 'desc'
  })
  .then((result) => {
      if(result.length > 0){
      const data = {
        _status : true,
        _message : 'Record Found sucessfully !!',
        paginate : {
          total_records : total_records,
          current_page : page,
          total_pages : Math.ceil(total_records/limit)
        },
        _data : result
      }
    response.send(data)
      }else {
      const data = {
        _status : false,
        _message : 'No Record Found !!',
        _data : result
      }
    response.send(data)
      }
  })
   .catch(() => {
       const data = {
        _status : false,
        _message : 'something went wrong !!',
        _data : result
      }
    response.send(data)
  })
}
exports.details = () => {

}
exports.update = () => {

}
exports.chnageStatus = () => {

}
exports.destroy = () => {

}