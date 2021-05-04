const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.EMAIL_API_TOKEN)

const sendOTP = (email, otp) => {
    sgMail.send({
        to: email,
        from: 'node-covid-help-0051@gmail.com',
        subject: 'Covid Help India One Time Password',
        html: `<h3>Your Covid Help India OTP for Contribution:</h3><h1>${otp}</h1><p>Please do not share this one time password with anyone.`
    })
}

module.exports = sendOTP