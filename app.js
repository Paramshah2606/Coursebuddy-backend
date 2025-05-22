const express=require("express");
const app=express();
const cors = require('cors');
require('dotenv').config();
const app_routing=require("./module/app-routing");
const appdoc = require("./module/v1/Api_document/route");
const constant=require("./config/constant.js");
const port = constant.PORT || 8080;
const common=require("./utils/common.js");
const bodyParser = require('body-parser');


app.use(cors());
app.post('/api/v1/payment/webhook', bodyParser.raw({ type: 'application/json' }), 
  (req, res, next) => {
    console.log("💰 Webhook received!");
    console.log("Headers:", JSON.stringify(req.headers));
    console.log("Signature:", req.headers['stripe-signature']);
    next();
  });
// app.use('/api/v1/payment/webhook', express.raw({ type: 'application/json' }));

app.use("/apiDoc",appdoc);
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));
app.use(require("./middleware/user_middleware.js").extractHeaderLanguageAndToken);

// common.updateOrderStatus();
//app.set('view engine', 'ejs');

app_routing.v1(app);

app.listen(port, ()=>{
    console.log("Server is listening on port ",port);
})