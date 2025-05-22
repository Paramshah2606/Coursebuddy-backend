const signupTemplate = (userName, dashboardLink) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Arial', sans-serif; background-color: #f4f7f9; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15); }
            .header { background: #004080; padding: 20px; text-align: center; color: #ffffff; font-size: 24px; font-weight: bold; border-radius: 12px 12px 0 0; }
            .content { padding: 25px; text-align: center; color: #333333; font-size: 16px; line-height: 1.7; }
            .highlight { color: #004080; font-weight: bold; }
            .btn-box { margin: 20px 0; }
            .btn { font-size: 18px; font-weight: bold; background: #ff6600; color: #ffffff; padding: 12px 25px; display: inline-block; border-radius: 6px; text-decoration: none; letter-spacing: 1px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); }
            .btn:hover { background: #e65c00; }
            .footer { font-size: 13px; color: #666666; text-align: center; padding: 15px; margin-top: 20px; border-top: 1px solid #dddddd; }
            .footer a { color: #ff6600; text-decoration: none; font-weight: bold; }
            .footer a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                Welcome to Cargo! 🚛  
            </div>
            <div class="content">
                <p>Hi <span class="highlight">${userName}</span>,</p>
                <p>We're excited to have you on board! Your Cargo account has been successfully created.</p>
                <p>Get started by exploring your dashboard:</p>
                <div class="btn-box">
                    <a href="${dashboardLink}" class="btn">Access Your Dashboard</a>
                </div>
                <p>If you have any questions, feel free to <a href="mailto:support@cargo.com">contact us</a>. </p>
            </div>
            <div class="footer">
                &copy; 2025 Cargo. All rights reserved. | Need help? <a href="mailto:support@cargo.com">Support</a>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = signupTemplate;


