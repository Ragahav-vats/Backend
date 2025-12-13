const materialModel = require("../../models/material")

exports.create = async (request,response) => {

    const saveData = request.body

    await materialModel(saveData).save()
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
  var limit = 15;
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

   const andCondition = [
        {
            deleted_at : null, 
            // status : 1   // when create api for website
        }
    ];

    const orCondition = [];

    if(request.body){
        if(request.body.name != undefined){
            if(request.body.name != ''){
                name = new RegExp(request.body.name,"i")
                andCondition.push({ name : name })
            }
        }
    }

    if(andCondition.length > 0){
        var filter = { $and : andCondition }
    } else {
        var filter = {}
    }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }


    var total_records = await materialModel.find(filter).countDocuments();

  await materialModel.find(filter).limit(limit).skip(skip)
  .select('name status order')
  .sort({
    // order : 'asc', In case of website
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
exports.details = async (request,response) => {

  await materialModel.findOne({
    _id : request.params.id
  })
  .then((result) => {
      if(result){
      const data = {
        _status : true,
        _message : 'Record Found sucessfully !!',
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
exports.update = async (request,response) => {
  const saveData = request.body

    await materialModel.updateOne({
      _id : request.params.id
    },{
      $set : saveData
    })
    .then((result) => {
        const data = {
        _status : true,
        _message : 'Record update sucessfully !!',
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
exports.chnageStatus = async (request,response) => {
     await materialModel.updateMany({
      _id : request.body.ids
    },[{
      $set : {
         status : {
          $not : "$status"
            }
      }
    }])
    .then((result) => {
        const data = {
        _status : true,
        _message : 'Change status sucessfully !!',
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
exports.destroy = async (request,response) => {
     await materialModel.updateMany({
      _id : request.body.ids
    },{
      $set : {
        deleted_at : Date.now()
      }
    })
    .then((result) => {
        const data = {
        _status : true,
        _message : 'Record delete sucessfully !!',
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