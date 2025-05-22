const mysql= require('mysql2');
const constant=require('./constant');

const connection = mysql.createConnection({
    host: constant.DB_Host,
    user: constant.DB_User,
    database: constant.DB_Database,
    password:constant.DB_Password,
    port: constant.DB_Port
});

connection.connect((err) => {
        if (err) {
          console.error('Error connecting to the database:', err);
          return;
        }
        console.log('Connected to MySQL successfully!');
      });
    console.log("Connection succesful");

module.exports=connection;