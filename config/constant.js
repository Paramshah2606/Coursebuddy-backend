require('dotenv').config();

module.exports = {
    app_name:'Bagzag',
    app_url:'/v1/user',
    API_KEY: process.env.API_KEY,  
    port_base_url:"http://localhost:8080/",
    mailer_email:process.env.mailer_email,               
    mailer_password:process.env.mailer_password,
    from_email:process.env.from_email,
    PORT:process.env.PORT,
    DB_Password:process.env.DB_Password,
    DB_Database:process.env.DB_Database,
    DB_User:process.env.DB_User,
    DB_Host:process.env.DB_Host,
    DB_Port:process.env.DB_Port,
    KEY:process.env.KEY,
    IV:process.env.IV,
    JWT_SECRET:process.env.JWT_SECRET,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET:process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_WEBHOOK_SECRET_PROD:process.env.STRIPE_WEBHOOK_SECRET_PROD,
    Base_url:process.env.Base_url,
    Base_url_local:process.env.Base_url_local
  };


  
