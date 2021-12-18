const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

/** 
 * @DESC To sign up user
 */
const signupUser = async (userDetailsEntered, res) => {

  try {

    // check if email already exists
    let doesEmailExist = await User.findOne({ email: userDetailsEntered.email });

    if (doesEmailExist) {
      return res.status(400).json({
        message: "This email already exists",
        success: false
      });
    }

    // check if phone number already exists
    let doesPhoneNumberExist = await User.findOne({ phoneNumber: userDetailsEntered.phoneNumber });

    if (doesPhoneNumberExist) {
      return res.status(400).json({
        message: "This phone number already exists",
        success: false
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userDetailsEntered.password, 12);
    
    // Save user details to database
    let { name, email, phoneNumber, gender, about } = userDetailsEntered;
    const newUser = new User({
      name,
      email,
      phoneNumber,
      gender,
      about,
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

module.exports = { signupUser };