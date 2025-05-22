const UserModel = require('../model/user-model.js');
const Common=require("../../../../utils/common.js");
const {t}=require('localizify');

const UserController = {
    signup: (req, res) => {
        const data = {
            full_name:req.body.full_name,
            email: req.body.email,
            country_code:req.body.country_code,
            phone:req.body.phone,
            password:req.body.password
        };

        const rules = {
                full_name:'required|alpha',
                email: 'required|email',
                country_code:'required',
                phone:'required|numeric|digits_between:6,15',
                password:'required',
            };


        const message={
            required:t('required'),
            numeric:t('numeric'),
            digits_between:t('digits_between'),
            email:t('email')
        }

        if(Common.checkValidations(req,res,data,rules,message)){
            UserModel.signup(req,res);
        }
    },

    login:(req,res)=>{
        const data = {
            emailphone:req.body.emailphone,
            password:req.body.password,
        };

        let rules = {
            emailphone:'required',
            password:'required',
        };
        
        const message={
            required:t('required')
        }

        if(Common.checkValidations(req,res,data,rules,message)){
            UserModel.login(req,res);
        }
    },

    logout:(req,res)=>{
        UserModel.logout(req,res);
    },

    get_categories:(req,res)=>{
        UserModel.get_categories(req,res);
    },
    
    add_course:(req,res)=>{
        const data = {
            title:req.body.title,
            category_id:req.body.category_id,
            description:req.body.description
        };

        let rules = {
            title:'required',
            category_id:'required',
            description:'required'
        };
        
        const message={
            required:t('required')
        }

        if(Common.checkValidations(req,res,data,rules,message)){
            UserModel.add_course(req,res);
        }
    },

    get_courses:(req,res)=>{
        UserModel.get_courses(req,res);
    },

    get_course_by_id:(req,res)=>{
        UserModel.get_course_by_id(req,res);
    },

    buy_course:(req,res)=>{
        UserModel.buy_course(req,res);
    },

    add_lesson:(req,res)=>{
        const data = {
            id:req.body.id,
        };

        let rules = {
            id:'required',
        };
        
        const message={
            required:t('required')
        }

        if(Common.checkValidations(req,res,data,rules,message)){
            UserModel.add_lesson(req,res);
        }
    },

    mark_lesson:(req,res)=>{
        const data = {
            course_id:req.body.course_id,
            lesson_id:req.body.lesson_id
        };

        let rules = {
            course_id:'required',
            lesson_id:'required',
        };

        const message={
            required:t('required')
        }

        if(Common.checkValidations(req,res,data,rules,message)){
            UserModel.mark_lesson(req,res);
        }
    },

    mark_lesson_get:(req,res)=>{
        UserModel.mark_lesson_get(req,res);
    },

    get_users:(req,res)=>{
        UserModel.get_users(req,res);
    },

    get_course_progress:(req,res)=>{
        UserModel.get_course_progress(req,res);
    },

    get_course_subscription:(req,res)=>{
        UserModel.get_course_subscription(req,res);
    },

}

module.exports=UserController;