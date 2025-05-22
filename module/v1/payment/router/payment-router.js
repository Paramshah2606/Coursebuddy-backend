const express = require('express');
const router = express.Router();
const payment_controller = require('../controller/payment-controller');
const middleware = require('../../../../middleware/user_middleware');

router.post('/create-checkout-session', payment_controller.create_checkout_session);
router.post('/webhook', payment_controller.stripe_webhook);
router.post('/session-details',payment_controller.session_details);

module.exports = router;
