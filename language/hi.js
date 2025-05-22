const message = {
    "required": ":attr आवश्यक है",
    "numeric": ":attr में केवल संख्याएँ होनी चाहिए",
    "email": "ईमेल सत्यापन विफल हुआ",
    "digits_between": ":attr सीमा से अधिक है",
    "alpha": "इस फ़ील्ड में केवल वर्णमाला के अक्षर होने चाहिए",
    "date": "तारीख़ मान्य नहीं है",

    "user_blocked": "यह उपयोगकर्ता अवरुद्ध कर दिया गया है",
    "user_reactivation_failed": "उपयोगकर्ता को पुनः सक्रिय नहीं किया जा सकता",
    "user_reactivated": "उपयोगकर्ता सफलतापूर्वक पुनः सक्रिय किया गया",
    "user_already_exists": "यह उपयोगकर्ता पहले से मौजूद है",
    "user_insert_failed": "उपयोगकर्ता तालिका में प्रविष्टि विफल हुई",
    "user_update_failed": "उपयोगकर्ता तालिका अपडेट विफल हुई",
    "device_insert_failed": "डिवाइस तालिका में प्रविष्टि विफल हुई",

    "signup_success": "बधाई हो! उपयोगकर्ता सफलतापूर्वक पंजीकृत हुआ।",
    "signup_failed": "साइनअप विफल हुआ।",
    "signup_step_one": "उपयोगकर्ता पंजीकरण का पहला चरण पूरा हुआ।",

    "verification_failed": "उपयोगकर्ता सत्यापन विफल हुआ।",
    "verification_success": "उपयोगकर्ता सत्यापन सफल।",

    "signup_profile_internal_error": "उपयोगकर्ता प्रोफ़ाइल डेटा प्राप्त करने में त्रुटि।",
    "signup_profile_update_failed": "उपयोगकर्ता प्रोफ़ाइल अपडेट करने में विफल।",
    "user_not_registered": "उपयोगकर्ता नहीं मिला",
    "complete_signup_profile": "कृपया पहले अपनी प्रोफ़ाइल पूर्ण करें",
    "complete_verification": "या तो सत्यापन लंबित है या प्रोफ़ाइल पहले से अपडेट है",
    "access_denied": "पहुँच अस्वीकृत। अमान्य साइनअप चरण।",

    "missing_token": "आप इस API को टोकन के बिना एक्सेस नहीं कर सकते",
    "invalid_or_inactive_token": "अमान्य या निष्क्रिय टोकन।",
    "invalid_api_key": "अमान्य API कुंजी प्रदान की गई।",

    "verification_code_generation_success": "सत्यापन कोड सफलतापूर्वक उत्पन्न हुआ।",
    "verification_code_generation_error": "सत्यापन कोड उत्पन्न करते समय त्रुटि हुई।",

    "verification_code_match_error": "गलत सत्यापन कोड दर्ज किया गया।",
    "verification_code_matched": "कोड मिल गया! सत्यापन पूरा हुआ।",

    "access_denied": "आप इस API को एक्सेस नहीं कर सकते।",
    "internal_error": "आंतरिक त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।",
    "otp_generation_error": "OTP उत्पन्न करने में त्रुटि हुई।",

    "social_id_not_registered": "सामाजिक आईडी पंजीकृत नहीं है।",
    "login_social_success": "सामाजिक लॉगिन सफल।",
    "no_email_phone": "कृपया ईमेल या फोन नंबर प्रदान करें।",
    "login_missing_fields": "पासवर्ड आवश्यक है।",
    "login_failed": "लॉगिन प्रयास विफल हुआ। कृपया पुनः प्रयास करें।",
    "login_incorrect_password": "गलत पासवर्ड दर्ज किया गया।",
    "login_verification_pending": "सत्यापन लंबित है। कृपया अपना खाता सत्यापित करें।",
    "login_update_required": "कृपया आगे बढ़ने के लिए अपनी प्रोफ़ाइल अपडेट करें।",
    "login_normal_success": "लॉगिन सफल।",
    "signup_type_invalid": "अमान्य लॉगिन प्रकार।",
    "user_logged_out": "उपयोगकर्ता सफलतापूर्वक लॉगआउट हुआ।",

    "forgot_password_internal_error": "आपके अनुरोध को संसाधित करते समय त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।",
    "forgot_password_user_not_found": "प्रदान किए गए फोन नंबर या ईमेल से कोई खाता नहीं मिला।",
    "forgot_password_social_login": "यह खाता सामाजिक लॉगिन के माध्यम से पंजीकृत है। कृपया संबंधित प्लेटफ़ॉर्म का उपयोग करें।",
    "forgot_password_verification": "सत्यापन कोड आपके पंजीकृत फोन नंबर या ईमेल पर भेजा गया है।",
    "verification_failed": "अमान्य सत्यापन कोड। कृपया पुनः प्रयास करें।",
    "verification_successful": "सत्यापन सफल। अब आप आगे बढ़ सकते हैं।",
    "password_required": "आगे बढ़ने के लिए पासवर्ड आवश्यक है।",
    "password_update_error": "पासवर्ड अपडेट करते समय त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।",
    "password_update_success": "आपका पासवर्ड सफलतापूर्वक अपडेट किया गया।",

    "passwords_required": "पुराना और नया दोनों पासवर्ड आवश्यक हैं।",
    "passwords_same": "नया पासवर्ड पुराने पासवर्ड के समान नहीं हो सकता।",
    "password_fetch_error": "उपयोगकर्ता का पासवर्ड प्राप्त करने में त्रुटि हुई।",
    "incorrect_old_password": "प्रदान किया गया पुराना पासवर्ड गलत है।",
    "password_update_error": "पासवर्ड अपडेट करते समय त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।",
    "password_update_success": "आपका पासवर्ड सफलतापूर्वक अपडेट किया गया।",

    "no_data_found": "कोई डेटा नहीं मिला।",

    "account_deleted": "आपका खाता सफलतापूर्वक हटाया गया।",

    "nothing_to_update": "आपने अपडेट करने के लिए कुछ भी प्रदान नहीं किया।",
    "user_updated": "उपयोगकर्ता प्रोफ़ाइल सफलतापूर्वक अपडेट हुई।",

    "all_category_fetched": "सभी श्रेणियाँ सफलतापूर्वक प्राप्त हुईं।",

    "product_fetched": "उत्पाद सफलतापूर्वक प्राप्त किए गए।",
    "product_detail_fetched": "उत्पाद विवरण सफलतापूर्वक प्राप्त हुआ।"
};



module.exports = message;