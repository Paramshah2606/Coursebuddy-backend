var express = require('express');
var path = require('path');
var globals = require('../../../config/constant');
var user_model = require('../user/model/user-model');
//var tutor_model=require("../Tutor/model/Tutor-model");

// Language file load
/* const { t } = require('localizify'); */

//console.log(globals);
app = express();
var router = express.Router(); // get an instance of the express Router

//set the template engine ejs
app.set('view engine', 'ejs')
    //routes
router.get('/api_doc', (req, res) => {

    res.render(path.join(__dirname + '/view/api_doc.ejs'), { globals: globals })
});

//routes
router.get('/code', (req, res) => {
    res.render(path.join(__dirname + '/view/reference_code.ejs'), { globals: globals })
});

//routes
router.get('/user_list', (req, res) => {
    user_model.api_user_list(function(response) {
        res.render(path.join(__dirname + '/view/user_list.ejs'), { data: response, globals: globals })
    });
});

module.exports = router;