const Stripe = require('stripe');
const constant=require('../../../../config/constant')
const stripe = Stripe(constant.STRIPE_SECRET_KEY);
const Common = require('../../../../utils/common');
const ResponseCode = require('../../../../utils/response-code');
const baseurl=constant.Base_url;

const payment_model = {
    create_checkout_session: async (req, res) => {
        try {
            const { course_id } = req.body;
            const user_id = req.user_id;

            const getCourseQuery = `SELECT id, title, description, price FROM tbl_course WHERE id=${course_id} AND is_active=1 AND is_deleted=0`;
            const courseRes = await Common.executeQuery(getCourseQuery);

            if (!courseRes || courseRes.length === 0) {
                return Common.generateResponse(req, res, 404, ResponseCode.ERROR, { keyword: "course_not_found" });
            }

            const course = courseRes[0];
            console.log("Preparing session for:", { user_id, course });

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: [{
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: course.title,
                            description: course.description || '',
                        },
                        unit_amount: course.price * 100,
                    },
                    quantity: 1,
                }],
                customer_email: 'paramshah2606@gmail.com',
                success_url: `${baseurl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${baseurl}/payment-cancel`,
                metadata: {
                    user_id: user_id.toString(),
                    course_id: course_id.toString(),
                }
            });
            console.log("Sessio details", session);

            return Common.generateResponse(req, res, 200, ResponseCode.SUCCESS, { keyword: "checkout_session_created" }, { url: session.url });

        } catch (error) {
            console.log("Error in payment_model.create_checkout_session:", error);
            return Common.generateResponse(req, res, 500, ResponseCode.ERROR, { keyword: "internal_error" }, error);
        }
    },

    stripe_webhook: async (req, res) => {
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                constant.STRIPE_WEBHOOK_SECRET_PROD
            );
            console.log(`Event received: ${event.type}`);

        } catch (err) {
            console.log("Stripe webhook error:", err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            console.log("Payment successful! Session data:", session.id);
            console.log("Metadata:", session.metadata);

            if (session.metadata && session.metadata.user_id && session.metadata.course_id) {
                const user_id = session.metadata.user_id;
                const course_id = session.metadata.course_id;

                try {
                    const checkQuery = "SELECT id FROM tbl_course_subscription WHERE user_id=? AND course_id=? AND is_active=1 AND is_deleted=0";
                    const existing = await Common.executeQuery(checkQuery, [user_id, course_id]);

                    if (!existing || existing.length === 0) {
                        const insertQuery = "INSERT INTO tbl_course_subscription (user_id, course_id, is_active, is_deleted) VALUES (?, ?, 1, 0)";
                        await Common.executeQuery(insertQuery, [user_id, course_id]);
                        console.log(`Subscription created for user ${user_id} - course ${course_id}`);
                    } else {
                        console.log(`Subscription already exists for user ${user_id} - course ${course_id}`);
                    }
                } catch (err) {
                    console.error("DB error in stripe_webhook:", err);
                }
            }
        }
        return res.status(200).json({ received: true });
    },

    session_details: async (req, res) => {

        const { session_id } = req.body;

        try {
            const session = await stripe.checkout.sessions.retrieve(session_id);
            return Common.generateResponse(req, res, 200, ResponseCode.SUCCESS, { keyword: "checkout_session_created" }, {session:session});
        } catch (err) {
            console.error(err);
            return Common.generateResponse(req, res, 500, ResponseCode.SUCCESS, { keyword: "checkout_session_creation_error" });
        }
    }
};

module.exports = payment_model;
