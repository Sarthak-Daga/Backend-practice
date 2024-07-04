import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs';

export const sendEmail = async({Email , EmailType , userID}:any) => {
  try {

    const hashUserID = await bcryptjs.hash(userID.toString() , 10)


    if(EmailType==='Verify'){
      await User.findByIdAndUpdate(userID , {
        verifyToken:hashUserID,
        verifyTokenExpiry:Date.now() + 360000
      })
    }
    else if(EmailType==='Reset'){
      await User.findByIdAndUpdate(userID , {
        forgotPasswordToken:hashUserID,
        forgotPasswordTokenExpiry:Date.now() + 360000
      })
    }


    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4103d71b719dfa",
        pass: "8a6d103fdf18df"
      }
    });

    const mailOptions = {
      from: 'sarthak@hello.ai',
      to: Email,
      subject: EmailType ==='Verify'?'verify Your ID':'reset password',  
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashUserID}">here</a> to ${EmailType ==='Verify'?'Verify Your Email':'reset your password'}`,
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse

  } catch (error:any) {
    throw new Error(error.message)
  }
}