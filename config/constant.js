require('dotenv').config();

module.exports = {
    app_name:'Bagzag',
    app_url:'/v1/user',
    API_KEY: process.env.API_KEY,  
    ENCRYPTION_KEY: 'cryptlib.getHashSha256("238a97b8c6cb73c22463e025bbefd49",32)' , 
    ENCRYPTION_IV: "e025bbefd4941de2", 
    port_base_url:"http://localhost:8080/",
    mailer_email:'paramshah2606@gmail.com',               
    mailer_password:'giao hddk whhd agcc',
    from_email:"paramshah2606@gmail.com",
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
    STRIPE_WEBHOOK_SECRET:process.env.STRIPE_WEBHOOK_SECRET
  };

// API_KEY="e28192c7502b7bbb04e981cc6d53939e"
// Image_url=https://param/

  