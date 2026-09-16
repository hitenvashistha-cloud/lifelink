import axios from 'axios';

// Main OTP sender - tries the SMS provider, falls back to console log for testing

export const sendOTP = async (phone, otp) => {
  // If Message Central credentials are set, use it
  if (process.env.MESSAGE_CENTRAL_API_KEY && process.env.MESSAGE_CENTRAL_CUSTOMER_ID) {
    return await sendViaMessageCentral(phone, otp);
  }

  // Otherwise, fall back to console log (for development)
  console.log(`[DEV MODE] OTP for ${phone}: ${otp}`);
  return { success: true, devMode: true };
};

// ===== Message Central =====
const sendViaMessageCentral = async (phone, otp) => {
  try {
    const response = await axios.post(
      'https://cpaas.messagecentral.com/verification/v3/send',
      {
        countryCode: '91',
        customerId: process.env.MESSAGE_CENTRAL_CUSTOMER_ID,
        flowType: 'SMS',
        mobileNumber: phone,
        otpLength: 6,
        otp: otp,
      },
      {
        headers: {
          authToken: process.env.MESSAGE_CENTRAL_API_KEY,
        },
      }
    );

    console.log('Message Central response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Message Central error:', error.response?.data || error.message);
    console.log(`[FALLBACK] OTP for ${phone}: ${otp}`);
    return { success: true, fallback: true };
  }
};

// ===== Fast2SMS (disabled - requires ₹100 recharge) =====
// Uncomment this if you recharge Fast2SMS later
/*
const sendViaFast2SMS = async (phone, otp) => {
  try {
    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'q',
        message: `Your Lifelink OTP is ${otp}.`,
        numbers: phone,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Fast2SMS error:', error.response?.data || error.message);
    return { success: false, error: error.response?.data };
  }
};
*/