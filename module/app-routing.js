class Routing {
    v1(app) {
        const userRoutes = require("./v1/user/router/user-router");
        app.use("/api/v1/user", userRoutes); 
        const paymentRoutes=require("./v1/payment/router/payment-router");
        app.use("/api/v1/payment", paymentRoutes);
    }
}

module.exports = new Routing();