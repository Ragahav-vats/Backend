const userModel = require("../../models/user")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const nodemailer = require("nodemailer");


exports.register = async (request, response) => {
    
    // checkEmail = await userModel.findOne({
    //     email: request.body.email, 
    //     deleted_at : null, 
    //     role_type : 'user'
    // });
    
    // if(checkEmail){
    //     const data = {
    //             _status : false,
    //             _message : 'Email Id already Exit !!',
    //             _data : null
    //         }

    //       return  response.send(data);
    // }

    // dataSave = request.body;
    // dataSave.password = await bcrypt.hash(request.body.password, saltRounds);
    // dataSave.role_type = 'user'

    // userModel(dataSave).save()
    // .then((result) => {

    //     token = jwt.sign({userInfo : result}, process.env.secret_key);

    //     const data ={ 
    //      _status : true,
    //        _message : 'Register user successfully',
    //        _token : token,
    //             _data : result
    //        }

    //      return   response.send(data);
    // })
    checkEmail = await userModel.findOne({
        email: request.body.email, 
        deleted_at : null, 
        role_type: 'user'
    })

    if(checkEmail){
        const data = {
            _status : false,
            _message : 'Email Id already exit !!',
            _data : null
        }

        response.send(data)
    }

    dataSave = request.body;
    dataSave.role_type = 'user';
    dataSave.password = await bcrypt.hash(request.body.password, saltRounds);

    userModel(dataSave).save()
    .then((result) => {

        token = jwt.sign({ uerInfo : result } , process.env.secret_key);

        const data = {
            _status : true,
            _message : 'Register user successfully !',
            _token : token,
            _data : result
        }

        response.send(data)
    })
    .catch(() => {
         const data = {
                        _status : false,
                        _message : ' Something went wrong !!',
                        _data : null
                    }

            response.send(data);
    })
};

exports.Login = async (request, response) => {
    checkEmail = await userModel.findOne({
        email: request.body.email, 
        deleted_at : null, 
        role_type : 'user'
    });
    
    if(!checkEmail){
        const data = {
                _status : false,
                _message : 'Email Id is InValid !!',
                _data : null
            }

            response.send(data);
    }

    var checkPassword = await bcrypt.compare(request.body.password, checkEmail.password);

    if(!checkPassword){
        const data = {
                _status : false,
                _message : 'Password is InCorrect !!',
                _data : null
            }

            response.send(data);
    }

     if(checkEmail.status == 0){
        const data = {
                _status : false,
                _message : 'your account is deactivated. Please contact support',
                _data : null
            }

            response.send(data);
    }

     token = jwt.sign({userInfo : checkEmail}, process.env.secret_key);

        const data ={ 
         _status : true,
           _message : 'Login successfully',
           _token : token,
                _data : checkEmail
           }

            response.send(data);
}

exports.viewProfile = async(request, response) => {

    var token = request.headers.authorization.split(' ');
     var decoded = jwt.verify(token[1], process.env.secret_key);
    //  console.log(decoded);

    await userModel.findOne({
        _id : decoded.userInfo._id,
        deleted_at : null
    })
    .then((result) => {
        if(result){
            const data = {
                _status : true,
                _message : 'Record found successfully.',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No Record found.',
                _data : null
            }

            response.send(data);
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong',
            _error : error,
            _data : null
        }

        response.send(data);
    })
}

exports.updateProfile = async(request, response) => {

     var token = request.headers.authorization.split(' ');
     var decoded = jwt.verify(token[1], process.env.secret_key);
     
    const saveData = request.body

    await userModel.updateOne({
        _id :decoded.userInfo._id,
    }, {
        $set : saveData
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record updated successfully !!',
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
            _message : 'Something went wrong !!',
            _error : errorMessages,
            _data : null
        }

       return response.send(data)
    })
}

exports.changePassword = async(request, response) => {

      var token = request.headers.authorization.split(' ');
    var decoded = jwt.verify(token[1], process.env.secret_key);

    userInfo = await userModel.findOne({
        _id: decoded.userInfo._id, 
        deleted_at : null, 
        role_type: 'user'
    })

    if(!userInfo){
        const data = {
            _status : false,
            _message : 'User doest not exit !!',
            _data : null
        }

        response.send(data)
    }

    var checkPassword = await bcrypt.compare(request.body.current_password, userInfo.password);
    
    if(!checkPassword){
        const data = {
            _status : false,
            _message : 'Password is incorrect !!',
            _data : null
        }

        response.send(data)
    }

    if(request.body.new_password == request.body.current_password){
        const data = {
            _status : false,
            _message : 'New Password and current password cannot be same !!',
            _data : null
        }

        response.send(data)
    }

    if(request.body.new_password != request.body.confirm_password){
        const data = {
            _status : false,
            _message : 'New Password and confirm password must be same !!',
            _data : null
        }

        response.send(data)
    }

    var password = await bcrypt.hash(request.body.confirm_password, saltRounds);

    await userModel.updateOne({
        _id : decoded.uerInfo._id
    }, {
        $set : {
            password : password
        }
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Change Password successfully !!',
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
            _message : 'Something went wrong !!',
            _error : errorMessages,
            _data : null
        }

        response.send(data)
    })
}

exports.forgotPassword = async(request, response) => {

    userInfo = await userModel.findOne({
        email: request.body.email, 
        deleted_at : null, 
        role_type: 'user'
    })

    if(!userInfo){
        const data = {
            _status : false,
            _message : 'InCorrect Email id !!',
            _data : null
        }

        response.send(data)
    }

        // create a JWT token that expires (used in reset link)
        const token = jwt.sign({ id: userInfo._id, email: userInfo.email }, process.env.secret_key, { expiresIn: '1h' });

        const resetBase = process.env.RESET_PASSWORD_URL || process.env.FRONTEND_URL || 'http://localhost:3000';
        const resetLink = `${resetBase}/reset-password?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.email,
                pass: process.env.pass
            },
        });

        const mailOptions = {
            from: process.env.email,
            to: userInfo.email,
            subject: 'Reset your password',
            html: `<p>Hello ${userInfo.name || ''},</p>
                         <p>You requested a password reset. Click the link below to reset your password. This link expires in 1 hour.</p>
                         <p><a href="${resetLink}">Reset password</a></p>
                         <p>If you didn't request this, please ignore this email.</p>`
        };

        await transporter.sendMail(mailOptions)
            .then(() => {
                const data = {
                    _status: true,
                    _message: 'Password reset mail sent successfully',
                    _data: null
                }

                response.send(data)
            })
            .catch((error) => {
                const data = {
                    _status: false,
                    _message: 'Something went wrong while sending mail',
                    _error: error,
                    _data: null
                }

                response.send(data)
            })
        }


exports.resetPassword = async (request, response) => {
    const token = request.body.token || request.query.token;

    if (!token) {
        return response.send({ _status: false, _message: 'Token is required', _data: null });
    }

    let payload;
    try {
        payload = jwt.verify(token, process.env.secret_key);
    } catch (err) {
        return response.send({ _status: false, _message: 'Invalid or expired token', _error: err.message, _data: null });
    }

    const user = await userModel.findOne({ _id: payload.id, deleted_at: null, role_type: 'user' });
    if (!user) {
        return response.send({ _status: false, _message: 'User not found', _data: null });
    }

    const { password, confirm_password } = request.body;
    if (!password || !confirm_password) {
        return response.send({ _status: false, _message: 'Password and confirm password are required', _data: null });
    }

    if (password !== confirm_password) {
        return response.send({ _status: false, _message: 'Password and confirm password must match', _data: null });
    }

    const hashed = await bcrypt.hash(password, saltRounds);

    await userModel.updateOne({ _id: user._id }, { $set: { password: hashed } })
        .then(() => {
            return response.send({ _status: true, _message: 'Password has been reset successfully', _data: null });
        })
        .catch((error) => {
            return response.send({ _status: false, _message: 'Something went wrong while updating password', _error: error, _data: null });
        });
}


   
    


// exports.create = async (request, response) => {

//     const saveData = request.body

//     await colorModel(saveData).save()
//     .then((result) => {
//         const data = {
//             _status : true,
//             _message : 'Record created successfully !!',
//             _data : result
//         }

//         response.send(data)
//     })
//     .catch((error) => {
//         var errorMessages = {};
//         for( var i in error.errors){
//             errorMessages[i] = error.errors[i].message;
//         }

//         const data = {
//             _status : false,
//             _message : 'Something went wrong !!',
//             _error : errorMessages,
//             _data : null
//         }

//         response.send(data)
//     })
// }

// exports.view = async(request, response) => {

//     var page    = 1;
//     var limit   = 15;
//     var skip    = 0;

//     if(request.body){
//         if(request.body.limit){
//             limit = request.body.limit; 
//         }

//         if(request.body.page){
//             page = request.body.page;
//             skip = (page - 1) * limit;
//         }
//     }

//     const andCondition = [
//         {
//             deleted_at : null, 
//             // status : 1   // when create api for website
//         }
//     ];

//     const orCondition = [];

//     if(request.body){
//         if(request.body.name != undefined){
//             if(request.body.name != ''){
//                 name = new RegExp(request.body.name,"i")
//                 andCondition.push({ name : name })
//             }
//         }

//         if(request.body.code != undefined){
//             if(request.body.code != ''){
//                 code = new RegExp(request.body.code,"i")
//                 andCondition.push({ code : code })
//             }
//         }
//     }

//     if(andCondition.length > 0){
//         var filter = { $and : andCondition }
//     } else {
//         var filter = {}
//     }

//     if(orCondition.length > 0){
//         filter.$or = orCondition;
//     }

//     var total_records = await colorModel.find(filter).countDocuments();

//     await colorModel.find(filter).limit(limit).skip(skip)
//     .select('name code status order')
//     .sort({
//         // order : 'asc',   in case of website
//         _id : 'desc'
//     })
//     .then((result) => {
//         if(result.length > 0){
//             const data = {
//                 _status : true,
//                 _message : 'Record found successfully.',
//                 _paginate : {
//                     total_records : total_records,
//                     current_page : page,
//                     total_pages : Math.ceil(total_records/limit)
//                 },
//                 _data : result
//             }

//             response.send(data);
//         } else {
//             const data = {
//                 _status : false,
//                 _message : 'No Record found.',
//                 _data : result
//             }

//             response.send(data);
//         }
//     })
//     .catch((error) => {
//         const data = {
//             _status : false,
//             _message : 'Something went wrong',
//             _error : error,
//             _data : []
//         }

//         response.send(data);
//     })
// }


// exports.changeStatus = async(request, response) => {
//     await colorModel.updateMany({
//         _id : request.body.ids
//     }, [{
//         $set : {
//             status : {
//                 $not : "$status"
//             }
//         }
//     }])
//     .then((result) => {
//         const data = {
//             _status : true,
//             _message : 'Status changed successfully !!',
//             _data : result
//         }

//         response.send(data)
//     })
//     .catch((error) => {
//         var errorMessages = {};
//         for( var i in error.errors){
//             errorMessages[i] = error.errors[i].message;
//         }

//         const data = {
//             _status : false,
//             _message : 'Something went wrong !!',
//             _error : errorMessages,
//             _data : null
//         }

//         response.send(data)
//     })
// }

// exports.destroy = async(request, response) => {
//     await colorModel.updateMany({
//         _id : request.body.ids
//     }, {
//         $set : {
//             deleted_at : Date.now()
//         }
//     })
//     .then((result) => {
//         const data = {
//             _status : true,
//             _message : 'Record deleted successfully !!',
//             _data : result
//         }

//         response.send(data)
//     })
//     .catch((error) => {
//         var errorMessages = {};
//         for( var i in error.errors){
//             errorMessages[i] = error.errors[i].message;
//         }

//         const data = {
//             _status : false,
//             _message : 'Something went wrong !!',
//             _error : errorMessages,
//             _data : null
//         }

//         response.send(data)
//     })
// }
