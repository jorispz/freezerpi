import nodemailer from "nodemailer";
import envalid, { str, email } from "envalid";

const env = envalid.cleanEnv(process.env, {
  FPI_USER: email(),
  FPI_CLIENT_ID: str(),
  FPI_CLIENT_SECRET: str(),
  FPI_REFRESH_TOKEN: str(),
  FPI_FROM: str(),
  FPI_TO: str()
});

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: env.FPI_USER,
    clientId: env.FPI_CLIENT_ID,
    clientSecret: env.FPI_CLIENT_SECRET,
    refreshToken: env.FPI_REFRESH_TOKEN
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log("Failed to verify GMail transport configuration.");
    console.error(error);
    process.exit(1);
  } else {
    console.log("GMail transport configuration verified.");
  }
});

var message = {
  from: env.FPI_FROM,
  to: env.FPI_TO,
  subject: "[FREEZERPI] The door is open!",
  text: "It has been open for 123",
  html: "<p>It has been open for 123</p>"
};

transporter
  .sendMail(message)
  .then(() => console.log(`Message sent to recipients: ${message.to}`))
  .catch(error => console.log(error));
