import nodemailer from "nodemailer";
import envalid, { str, email } from "envalid";
import { io } from "./gpio";

console.log({ io });
io.doorSensor.onChange(isOpen => {
  console.log({ isOpen });
});

io.buzzer.buzz(0.5, 100);

// init(() => {
//   const buzzer = new PWM({ pin: "P1-12", frequency: 1200 });
//   const door = new DigitalInput({
//     pin: "P1-16",
//     pullResistor: PULL_UP
//   });

//   door.on("change", (value: number) => {
//     if (value === 1) {
//       buzzer.write(0.95);
//     } else {
//       buzzer.write(0);
//     }
//   });

//   const shutdown = () => {
//     console.log("Shutting down");
//     buzzer.write(0);
//     process.exit();
//   };

//   process.on("SIGTERM", shutdown);
//   process.on("SIGINT", shutdown);
// });

const env = envalid.cleanEnv(process.env, {
  FPI_USER: email(),
  FPI_CLIENT_ID: str(),
  FPI_CLIENT_SECRET: str(),
  FPI_REFRESH_TOKEN: str(),
  FPI_FROM: str(),
  FPI_TO: str()
});

const transporter = nodemailer.createTransport({
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

/*
transporter
  .sendMail(message)
  .then(() => console.log(`Message sent to recipients: ${message.to}`))
  .catch(error => console.log(error));
*/
