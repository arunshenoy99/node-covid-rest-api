const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.EMAIL_API_TOKEN)

const sendOTP = (email, otp) => {
    sgMail.send({
        to: email,
        from: 'netstat.devlabs@gmail.com',
        subject: 'CovidHelp-India One Time Password',
        html: `<h3>Your CovidHelp-India OTP:</h3><h1>${otp}</h1><p>Please do not share this one time password with anyone.`
    })
}

module.exports = sendOTP