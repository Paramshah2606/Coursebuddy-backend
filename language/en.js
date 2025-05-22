const message = {
    "required": ":attr is required",
    "numeric": ":attr should contain only numbers",
    "email": "Email validation failed",
    "digits_between": ":attr exceeds limit",
    "alpha": "This field should contain only alphabetical values",
    "date": "Date is not valid",
  
    "user_blocked":"This user has been blocked",
    "user_reactivation_failed":"User can't reactivated",
    "user_reactivated":"User has been successfully reactivated",
    "user_already_exists":"This user already exists",
    "user_insert_failed": "User table insertion failed.",
    "user_update_failed": "User table update failed.",
    "device_insert_failed": "Device table entry failed.",
  
    "signup_success": "Congratulations! User registered successfully.",
    "signup_failed": "Signup failed.",
    "signup_step_one": "First step of user registration completed.",
  
    "verification_failed": "User verification failed.",
    "verification_success": "User verification successful.",
  
    "signup_profile_internal_error": "Error fetching user profile data.",
    "signup_profile_update_failed": "Failed to update user profile.",
    "user_update_failed": "User table update failed.",
    "user_not_registered":"User not found",
    "complete_signup_profile":"Please complete your profile first",
    "complete_verification":"Either verification is pending or profile is already updated",
    "access_denied": "Access denied. Invalid signup step.",
  
    "missing_token": "You can't access this api without token",
    "invalid_or_inactive_token": "Invalid or inactive token.",
    "invalid_api_key": "Invalid API key was passed.",
  
    "verification_code_generation_success": "Verification code generated successfully.",
    "verification_code_generation_error": "An error occurred while generating verification code.",
  
    "verification_code_match_error": "Incorrect verification code entered.",
    "verification_code_matched": "Code matched! Verification completed.",
  
    "access_denied": "You can't access this API.",
    "internal_error": "An internal error occurred. Please try again later.",
    "otp_generation_error": "An error occurred while generating OTP.",

    "social_id_not_registered": "Social ID is not registered.",
    "login_social_success": "Social login successful.",
    "no_email_phone": "Please provide an email or phone number.",
    "login_missing_fields": "Password is required.",
    "login_failed": "Login attempt failed. Please try again.",
    "login_incorrect_password": "Incorrect password was entered.",
    "login_verification_pending": "Verification pending. Please verify your account.",
    "login_update_required": "Please update your profile to proceed.",
    "login_normal_success": "Login successful.",
    "signup_type_invalid": "Invalid login type.",
    "user_logged_out": "User successfully logged out..",
  
    "forgot_password_internal_error": "An error occurred while processing your request. Please try again later.",
    "forgot_password_user_not_found": "No account found with the provided phone number or email",
    "forgot_password_social_login": "This account is registered via social login. Please use the respective platform to log in.",
    "forgot_password_verification": "A verification code has been sent to your registered phone number or email",
    "verification_failed": "Verification code invalid or expired. Please try again",
    "verification_successful": "Verification successful. You may now proceed.",
    "password_required": "Password is required to proceed.",
    "password_update_error": "An error occurred while updating the password. Please try again later.",
    "password_update_success": "Your password has been updated successfully.",
  
    "passwords_required": "Both old and new passwords are required.",
    "passwords_same": "The new password cannot be the same as the old password.",
    "password_fetch_error": "An error occurred while fetching the user's password.",
    "forgot_password_social_login": "This account is registered via social login. Please use the respective platform to log in.",
    "incorrect_old_password": "The old password provided is incorrect.",
    "password_update_error": "An error occurred while updating the password. Please try again later.",
    "password_update_success": "Your password has been updated successfully.",
  
    "no_data_found":"No data has been found.",

    "account_deleted":"Your account got deleted successfully",

    "nothing_to_update":"You haven't passed anything to update",
    "user_updated":"User profile updated successfully",

    "all_category_fetched":"All categoried fetched successfully",

    "product_fetched":"Products fetched successfully",
    "product_detail_fetched":"Product details fetched successfully",

    "invalid_product_data":"You haven't passed proper data",
    "product_added_to_cart":"Products have been added to cart successfully",




    "course_added_successfully":"Congratulations!! Course successfully added",
    "categories_fetched_successfully":"Categories fetched successfully"
  }
  
  module.exports = message;