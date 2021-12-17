const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

/** 
 * @DESC To sign up user
 */
const signupUser = async (userDetailsEntered, res) => {

  try {

    // check if email already exists
    let emailDoesNotExist = await checkEmailExistance(userDetailsEntered.email);

    if (!emailDoesNotExist) {
      return res.status(400).json({
        message: "This email already exists",
        success: false
      });
    }

    // check if phone number already exists
    let phoneNumberDoesNotExist = await checkPhoneNumberExistance(userDetailsEntered.phoneNumber);
    if (!phoneNumberDoesNotExist) {
      return res.status(400).json({
        message: "This phone number already exists",
        success: false
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userDetailsEntered.password, 12);
    
    // Save user details to database
    const newUser = new User({
      ...userDetailsEntered,
      hashedPassword
    });
    await newUser.save();

    return res.status(201).json({
      message: "Hurray! You are successfully signed up",
      success: true
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable to sign up. Please try again",
      success: false
    });
  }

};

const checkEmailExistance = async email => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const checkPhoneNumberExistance = async phoneNumber => {
  let user = await User.findOne({ phoneNumber });
  return user ? false : true;
};

module.exports = { signupUser };