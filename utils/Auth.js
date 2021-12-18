const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const nodemailer = require("nodemailer");
const { GMAIL_ADDRESS, GMAIL_PASSWORD } = require("../config");
const { success, error } = require("consola");

/** 
 * @DESC To sign up user
 */
const signupUser = async (req, res, next) => {
  
  try {

    let { name, email, phoneNumber, gender, about, password } = req.body;
    
    // check if email already exists
    let doesEmailExist = await User.findOne({ email });

    if (doesEmailExist) {
      return res.status(400).json({
        message: "This email already exists",
        success: false
      });
    }

    // check if phone number already exists
    let doesPhoneNumberExist = await User.findOne({ phoneNumber });

    if (doesPhoneNumberExist) {
      return res.status(400).json({
        message: "This phone number already exists",
        success: false
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Save user details to database
    const newUser = new User({
      name,
      email,
      phoneNumber,
      gender,
      about,
      hashedPassword
    });
    await newUser.save();
    
    res.status(201).json({
      message: "Hurray! You are successfully signed up",
      success: true
    });

    return next();

  } catch (err) {

    error({
      message: err,
      badge: true
    });
    
    return res.status(500).json({
      message: "Unable to sign up. Please try again",
      success: false
    });
    
  }

};

const sendWelcomeEmail = (req, res) => {
  
  const senderEmailAddress = GMAIL_ADDRESS;
  const senderEmailPassword = GMAIL_PASSWORD;
  const recipientEmailAddress = req.body.email;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmailAddress,
      pass: senderEmailPassword
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: senderEmailPassword,
    to : recipientEmailAddress,
    subject: "Welcome to Dhanam",
    text: `Hi ${req.body.name},\n\n` + 
          `Thank you for signing up on Dhanam.\n\n` + 
          `We welcome you to our Dhanam community where you can make ` + 
          `your investing easy, engaging and more rewarding.\n\n` + 
          `Best,\n` + 
          `Dhanam Team
    `
  };

  transporter.sendMail(mailOptions)
    .then(res => {
      success({ 
        message: "Welcome email sent successfully!",
        badge: true
      });
    })
    .catch(err => {
      error({
        message: err,
        badge: true
      });
    });

};

module.exports = { signupUser, sendWelcomeEmail };