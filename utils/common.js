const connection = require("../config/database");
const {
    default: localizify
} = require('localizify');
const ResponseCode = require("./response-code");
let en = require("../language/en");
let hi = require('../language/hi');
const {
    t
} = require('localizify');

const Validator = require('Validator');
const nodemailer = require('nodemailer');
const constant = require("../config/constant");
require('dotenv').config();

const hash_key = constant.KEY;

const iv = constant.IV;

const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const JWT_SECRET = constant.JWT_SECRET;
const JWT_EXPIRY = "7d";

class Common {

    static executeQuery = (query, params) => {
        return new Promise((resolve, reject) => {
            connection.query(query, params, (err, result) => {
                if (err) {
                    console.log("err", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static generateJWTToken = (payload) => {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    };

    static verifyJWTToken = (token) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return null;
        }
    };

    static getMessage(language, message) {
        localizify
            .add('en', en)
            .add('hi', hi)
            .setLocale(language);

        let translatedMessage = t(message.keyword);

        if (message.content) {
            Object.keys(message.content).forEach(key => {
                translatedMessage = translatedMessage.replace(`:${key}`, message.content[key]);
            });
        }

        return translatedMessage;
    }


    static checkValidations(req, res, data, rules, message) {
        const v = Validator.make(data, rules, message);

        if (v.fails()) {
            const errors = v.getErrors();
            let error = "";
            for (let key in errors) {
                error = errors[key][0];
                break;
            }
            console.log(error);
            Common.generateResponse(req, res, 400, ResponseCode.ERROR, { keyword: error });
            return false;
        }
        if (v.passes()) {
            return true;
        }
    }

    static generateResponse(req, res, httpstatus = 200, status, message, data = null) {
        let translated_message = this.getMessage(req.lang, message);

        let response_data = {
            code: status,
            message: translated_message,
            data: data
        };

        console.log("Response we sent to frontend", response_data);
        let encrypted_response = Common.encrypt(response_data);
        res.status(httpstatus).send(encrypted_response);
        // res.status(httpstatus).send(response_data);
    }

    static encrypt(requestData) {
        try {
            if (!requestData) return null;

            const data = typeof requestData === 'object' ? JSON.stringify(requestData) : requestData;
            const cipher = crypto.createCipheriv('aes-256-cbc', hash_key, iv);

            const encrypted = Buffer.concat([
                cipher.update(data, 'utf8'),
                cipher.final()
            ]);

            return encrypted.toString('hex');
        } catch (error) {
            console.error('Encryption error:', error);
            throw error;
        }
    }


    static decrypt(requestData) {
        try {
            if (!requestData) return {};
            const decipher = crypto.createDecipheriv('AES-256-CBC', hash_key, iv);
            let decrypted = decipher.update(requestData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return Common.isJson(decrypted) === true ? JSON.parse(decrypted) : decrypted;
        } catch (error) {
            console.error('Decryption error:', error);
            return requestData;
        }
    }



    static isJson(request_data) {
        try {
            JSON.parse(request_data);
            return true;
        } catch (error) {
            return false;
        }
    }

    static sendMail = async (subject, to_email, message) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: constant.mailer_email,
                    pass: constant.mailer_password
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                from: constant.from_email,
                to: to_email,
                subject: subject,
                html: message
            };

            const info = await transporter.sendMail(mailOptions);
            return { success: true, info }; // Return success response

        } catch (error) {
            console.error("Error sending email:", error);
            return { success: false, error }; // Return failure response
        }
    }
}


module.exports = Common;