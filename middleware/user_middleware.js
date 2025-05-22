const Common=require("../utils/common");
const ResponseCode=require("../utils/response-code");
let en = require("../language/en");
let hi = require('../language/hi');
const {
    t
} = require('localizify');
const {
    default: localizify
} = require('localizify');
const jwt = require("jsonwebtoken");
const constant = require("../config/constant");
const api_key_backend=constant.API_KEY;
const bypassPaths = ["/api/v1/payment/webhook", "/apiDoc"];

const middleware={
    extractHeaderLanguageAndToken:async(req,res,next)=>{
            try {
              if (bypassPaths.includes(req.path)) {
        return next();
    }
              console.log("Request body to decrypt",req.body);
              if (req.is('text/plain') && req.body) {
                  try {
                    req.body = Common.decrypt(req.body);
                  } catch (error) {
                    return Common.generateResponse(req, res,500, ResponseCode.ERROR, {
                      keyword: "internal_error"
                  });
                  }
                }
  
                var headerlang = (req.headers['accept-language'] != undefined && req.headers['accept-language'] != "") ?
                  req.headers['accept-language'] : 'en';
      
              req.lang = headerlang;
      
              req.language = (headerlang == 'en') ? en : hi;
      
              localizify
                  .add('en', en)
                  .add('hi', hi)
                  .setLocale(req.lang);
  
                  const api_key_frontend = req.headers["api_key"];
                  console.log("API_KEY",api_key_frontend);
                  const reqPath=req.path;
                  let decrypted_api_key="";
                  if(api_key_frontend){
                       decrypted_api_key=Common.decrypt(api_key_frontend);
                  }
                  if (api_key_backend != decrypted_api_key) {
                      return Common.generateResponse(req, res,403, ResponseCode.ERROR, {
                          keyword: "invalid_api_key"
                      });
                  }

                  const bypass = ["/api/v1/user/signup", "/api/v1/user/login","/api/v1/user/forgot_password","/api/v1/user/forgot_password/verification","/api/v1/user/forgot_password_change","/api/v1/driver/signup","/api/v1/driver/login","/api/v1/driver/forgot_password","/api/v1/driver/forgot_password/verification","/api/v1/driver/forgot_password_change"];
              
                  if (bypass.includes(reqPath)) {
                      return next();
                  }
          
                  let token = req.headers["user-token"];
          
                  if (!token) {
                      return Common.generateResponse(req, res,400, ResponseCode.ERROR, {
                          keyword: "missing_token"
                      });
                  }

                  token=Common.decrypt(token);
                  
                  try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    console.log("decoded token",decoded);
                    req.user_id = decoded.id;
                    req.role=decoded.role;
                } catch (err) {
                    return Common.generateResponse(req, res, 401, ResponseCode.ERROR, {
                        keyword: "invalid_or_expired_token"
                    });
                }
                next();
            } catch (error) {
                          console.log("Error in middleware"+error);
                          return Common.generateResponse(req, res,500, ResponseCode.ERROR, {
                              keyword: "internal_error"
                          });
            }
    },
    multerErrorHandler: (multerMiddleware) => {
        return (req, res, next) => {
          multerMiddleware(req, res, function (err) {
            if (err) {
              if (err.code === "LIMIT_FILE_SIZE") {
                return Common.generateResponse(req, res, 400, ResponseCode.ERROR, {
                  keyword: "file_size_too_large",
                });
              }
              if (err.code === "UNSUPPORTED_FILE_TYPE") {
                return Common.generateResponse(req, res, 400, ResponseCode.ERROR, {
                  keyword: "unsupported_file_type",
                });
              }
              return Common.generateResponse(req, res, 400, ResponseCode.ERROR, {
                keyword: "file_upload_error",
                message: err.message,
              });
            }
            next();
          });
        };
    }
}

module.exports=middleware;
