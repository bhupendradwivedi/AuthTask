const nodeMailer = require("nodemailer")
const { verificationEmailTemplate } = require("./emailTemplate")

const sendEmailVerification = async (email, link) => {

 try {

  const transporter = nodeMailer.createTransport({
   service: "gmail",
   auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
   }
  })

  await transporter.sendMail({
   from: process.env.EMAIL_USER,
   to: email,
   subject: "Verify your email",
   html: verificationEmailTemplate(link)
  })

 } catch (error) {

  console.log("Error in sending email.", error)

 }

}

module.exports = sendEmailVerification