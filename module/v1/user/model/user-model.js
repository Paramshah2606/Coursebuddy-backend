const Common=require("../../../../utils/common.js")
const ResponseCode=require("../../../../utils/response-code.js");
const signupTemplate=require("../../../../utils/emailTemplates/signup.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserModel = {
    signup: async (req, res) => {
        try {
            const {
                 email,country_code,phone, full_name, password
            } = req.body;

            let hashed_password;
            if (password) {
                hashed_password = await bcrypt.hash(password, saltRounds);
            }
    
            let existingUser = await Common.executeQuery(
                "SELECT id, is_active, is_deleted FROM tbl_user WHERE (email = ? OR phone=?) ORDER BY created_at DESC",
                [email,phone]
            );

            if (existingUser.length>0) {
                let user = existingUser[0];
    
                if (user.is_active === 0) {
                    return Common.generateResponse(req, res, 403, ResponseCode.ERROR, { keyword: "user_blocked" });
                }
    
                if (user.is_deleted === 0) {
                    return Common.generateResponse(req, res, 403, ResponseCode.ERROR, { keyword: "user_already_exists" });
                }
            }

            let insertUserQuery = `INSERT INTO tbl_user ( country_code,phone,email,full_name,password,role) VALUES (?, ?, ?, ?,?,'user')`;
            let insertUserParams = [country_code,phone,email, full_name,hashed_password];
    
            let userInsertResult = await Common.executeQuery(insertUserQuery, insertUserParams);
            let userId = userInsertResult.insertId;

            Common.sendMail("Signup Successful! Start Exploring Cargo ",email,signupTemplate(full_name,"http://localhost:8080/api/v1/user/find_ride"));

            const payload = { id: userId, email, role:'user' };
            const token = Common.generateJWTToken(payload);

            return Common.generateResponse(req, res, 200, ResponseCode.SUCCESS, { keyword: "signup_success" }, {user_token:token,full_name,role:'user'});
        } catch (error) {
            console.error("Signup error:", error);
            return Common.generateResponse(req, res, 500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    login:async (req, res) => {
        try {
            const { emailphone, password } = req.body;
            let loginUserQuery=`SELECT id,password,full_name,role FROM tbl_user WHERE (phone = ? OR email=?) AND is_active=1 AND is_deleted=0`;
            let loginUserQueryParam=[emailphone,emailphone];
            let loginUserResult=await Common.executeQuery(loginUserQuery,loginUserQueryParam);
            if(loginUserResult.length===0){
                return Common.generateResponse(req, res,404, ResponseCode.DATA_NOT_FOUND, { keyword: "user_not_registered" });
            }else{

                    const isMatch = await bcrypt.compare( password,loginUserResult[0].password);
                    if (!isMatch) {
                        return Common.generateResponse(req, res,403, ResponseCode.ERROR, { keyword: "login_incorrect_password" });
                    }

                    const role = loginUserResult[0].role;
                    const full_name=loginUserResult[0].full_name;
                    const userId=loginUserResult[0].id;

                const payload = { id: userId, emailphone, role };
                const token = Common.generateJWTToken(payload);

                return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "login_normal_success" },{user_token:token,role,full_name});
            }
        } catch (error) {
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },    

    logout:async (req,res)=>{
        try {
            let userid=req.user_id;
            let q=`UPDATE tbl_user_device SET user_token=NULL,device_token=NULL WHERE user_id=?`;
            await Common.executeQuery(q,userid);
            return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "user_logged_out" });
        } catch (error) {
            console.log("Error in logout"+error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    get_categories:async (req,res)=>{
        try{
            const getCategoryQuery='SELECT id,name FROM tbl_course_category WHERE is_active=1 AND is_deleted=0';
            const getCategoryResult=await Common.executeQuery(getCategoryQuery,[]);
            console.log(getCategoryResult);
             return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "categories_fetched_successfully" },getCategoryResult);
        } catch(error) {
            console.log("Error in fetching categories sdsadsadsa"+error);
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    add_course:async (req,res)=>{
        try{
            let {title,category_id,description,cover_image,price}=req.body;
            if(!cover_image){
                cover_image="https://placehold.co/600x400?text=Course+Image"
            }
            let courseInsertQuery='INSERT INTO tbl_course (title,category_id,description,cover_image,price) VALUES (?,?,?,?,?)';
            let courseInsertParams=[title,category_id,description,cover_image,price];
            let courseInsertRes=await Common.executeQuery(courseInsertQuery,courseInsertParams);
            console.log(courseInsertRes.insertId);
            return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "course_added_successfully" },[]);
        }catch (error) {
            console.log("Error in adding course"+error);
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    get_courses:async (req,res)=>{
        try{
            let {category_id,search}=req.body;
            let category_condition='';
            let search_condition='';
            if(category_id){
                category_condition=`AND category_id=${category_id}`;
            }
            if(search){
                search_condition=`AND ( title LIKE '%${search}%' OR (SELECT name FROM tbl_course_category WHERE id=category_id) LIKE '%${search}%')`
            }
            let getcourseQuery=`SELECT id,title,description,cover_image,price,(SELECT name FROM tbl_course_category WHERE id=category_id) as category FROM tbl_course WHERE is_active=1 AND is_deleted=0 ${category_condition} ${search_condition}`;
            console.log(getcourseQuery);
            let getcourseRes=await Common.executeQuery(getcourseQuery);
            return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "courses_fetched_successfully" },getcourseRes);
        }catch (error) {
            console.log("Error in fetching courses"+error);
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    get_course_by_id:async (req,res)=>{
        try{
            let {id}=req.params;
            let getcourseQuery='SELECT title,description,cover_image,price,category_id,(SELECT name FROM tbl_course_category WHERE id=category_id) as category FROM tbl_course WHERE id=? AND is_active=1 AND is_deleted=0';
            let getcourseRes=await Common.executeQuery(getcourseQuery,[id]);
            let getLessonQuery='SELECT id,video_link,text_lesson FROM tbl_lesson WHERE course_id=? AND is_active=1 AND is_deleted=0';
            let getLessonRes=await Common.executeQuery(getLessonQuery,[id]);
            return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "courses_fetched_successfully" },{course:getcourseRes[0],lesson:getLessonRes});
        }catch (error) {
            console.log("Error in fetching courses by id"+error);
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    buy_course:async (req,res)=>{
        try{
            let user_id=req.user_id;
            let {course_id}=req.body;
            let buycourseQuery='INSERT INTO tbl_course_subscription (course_id,user_id) VALUES (?,?)';
            let buyCourseParams=[course_id,user_id]
            await Common.executeQuery(buycourseQuery,buyCourseParams);
            return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "course_bought_successfully" },[]);
        }catch (error) {
            console.log("Error in buying course"+error);
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    add_lesson:async (req,res)=>{
        try{
            let {video,id,text_lesson}=req.body;
            let lessonInsertQuery='INSERT INTO tbl_lesson (course_id,video_link,text_lesson) VALUES (?,?,?)';
            let lessonInsertParams=[id,video,text_lesson];
            let lessonInsertRes=await Common.executeQuery(lessonInsertQuery,lessonInsertParams);
            console.log(lessonInsertRes.insertId);
            return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "lesson_added_successfully" },[]);
        }catch (error) {
            console.log("Error in adding lesson"+error);
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    mark_lesson:async (req,res)=>{
        try{
            let user_id=req.user_id;
            let {lesson_id,course_id}=req.body;
            let lessonMarkQuery='INSERT INTO tbl_user_progress (lesson_id,user_id,course_id) VALUES (?,?,?)';
            let lessonMarkParams=[lesson_id,user_id,course_id];
            let lessonMarkRes=await Common.executeQuery(lessonMarkQuery,lessonMarkParams);
            console.log(lessonMarkRes.insertId);
            return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "lesson_marked_successfully" },[]);
        }catch (error) {
            console.log("Error in marking lesson"+error);
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    mark_lesson_get:async (req,res)=>{
        try{
            let user_id=req.user_id;
            let selectMarkLessonQuery='SELECT lesson_id FROM tbl_user_progress WHERE user_id=?';
            let selectMarkLessonParams=[user_id];
            let selectMarkLessonRes=await Common.executeQuery(selectMarkLessonQuery,selectMarkLessonParams);
            return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "marked_lesson_fetched_successfully" },selectMarkLessonRes);
        }catch (error) {
            console.log("Error in fetching marked lessons"+error);
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    get_users:async (req,res)=>{
        try {
            let user_id=req.user_id;
            let getUserQuery=`SELECT id,full_name,email,CONCAT(country_code,' ',phone) as phone,role FROM tbl_user WHERE is_active=1 AND is_deleted=0`;
            let getUserRes=await Common.executeQuery(getUserQuery);
            if(getUserRes.length===0){
                return Common.generateResponse(req, res,404, ResponseCode.DATA_NOT_FOUND, { keyword: "no_User_found" } );
            }
            return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "User_details_fetched_successfully" },getUserRes );
        } catch (error) {
            console.log("Error in getting Users"+error);
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    get_course_progress:async (req,res)=>{
        try {
            let user_id=req.user_id;
            let role=req.role;
            let {id,course_id}=req.body
            if(role=='admin'){
                let getUserQuery=`SELECT full_name,email FROM tbl_user WHERE is_active=1 AND is_deleted=0 AND id=?`;
                let getUserRes=await Common.executeQuery(getUserQuery,id);
                if(getUserRes.length===0){
                    return Common.generateResponse(req, res,404, ResponseCode.DATA_NOT_FOUND, { keyword: "no_user_found" } );
                }
                let getProgressQuery='SELECT round(count(up.lesson_id)*100/(SELECT count(id) FROM tbl_lesson WHERE course_id=up.course_id),2) as progress,(SELECT title from tbl_course WHERE id=up.course_id) as title FROM tbl_user_progress as up WHERE up.is_active=1 AND up.is_deleted=0 AND user_id=? GROUP BY up.course_id';
                let getProgressRes=await Common.executeQuery(getProgressQuery,[id]);
                return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "User_details_fetched_successfully" },{user:getUserRes[0],progress:getProgressRes} );
            }else if(role=='user'){
                let getProgressQuery='SELECT round(count(up.lesson_id)*100/(SELECT count(id) FROM tbl_lesson WHERE course_id=up.course_id),2) as progress,(SELECT title from tbl_course WHERE id=up.course_id) as title FROM tbl_user_progress as up WHERE up.is_active=1 AND up.is_deleted=0 AND user_id=? AND up.course_id=? GROUP BY up.course_id';
                let getProgressRes=await Common.executeQuery(getProgressQuery,[user_id,course_id]);
                return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "Progress_details_fetched_successfully" },{progress:getProgressRes[0]} );
            }
        } catch (error) {
            console.log("Error in getting Users"+error);
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    get_course_subscription:async (req,res)=>{
        try {
            let user_id=req.user_id;
            let getCourseSubscriptionQuery=`SELECT course_id FROM tbl_course_subscription WHERE user_id=? AND is_active=1 AND is_deleted=0`;
            let getCourseSubscriptionParams=[user_id];
            let getCourseSubscriptionRes=await Common.executeQuery(getCourseSubscriptionQuery,getCourseSubscriptionParams);
            return Common.generateResponse(req, res,200, ResponseCode.SUCCESS, { keyword: "Subscription_details_fetched_successfully" },getCourseSubscriptionRes );
        } catch (error) {
            console.log("Error in fetching subscriptions"+error);
            console.log(error);
            return Common.generateResponse(req, res,500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },
};


module.exports=UserModel;