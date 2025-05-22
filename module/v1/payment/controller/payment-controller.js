const payment_model = require('../model/payment-model');
const Common = require('../../../../utils/common');
const ResponseCode = require('../../../../utils/response-code');

const payment_controller = {
    create_checkout_session: async (req, res) => {
        let { course_id } = req.body;

        if (!course_id) {
            return Common.generateResponse(req, res, 400, ResponseCode.ERROR, { keyword: "course_id_required" });
        }

        return payment_model.create_checkout_session(req, res);
    },

    stripe_webhook: async (req, res) => {
        return payment_model.stripe_webhook(req, res);
    },

    session_details:async (req,res) => {
        return payment_model.session_details(req,res);
    }
};

module.exports = payment_controller;

