import { Client } from "../index.js";
import nodemailer from "nodemailer";
import bycrpt from "bcrypt";

export async function getUserEmail(email) {
  let result = await Client.db("userDetails")
    .collection("user")
    .findOne({ email: email });
  return result;
}

export async function getUserName(username) {
  let result = await Client.db("userDetails")
    .collection("user")
    .findOne({ username: username });
  return result;
}

export async function generatehashpassword(password) {
  const noOfRounds = 10;
  const salt = await bycrpt.genSalt(noOfRounds);
  const hashpassword = await bycrpt.hash(password, salt);
  return hashpassword;
}

export async function sendOTP(email) {
  const OTP = Math.floor(Math.random() * 1000000 + 1);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Gowtham TN37 ❤️‍🔥" <gowthamtn37@gmail.com>', // sender address

    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `${OTP}`, // plain text body
  });
  return OTP;
}

export async function getOTP(OTP) {
  let result = await Client.db("userDetails")
    .collection("user")
    .findOne({ OTP: OTP });
  return result;
}

export function OTPerase(OTP) {
  return Client.db("userDetails")
    .collection("user")
    .updateOne({ OTP: OTP }, { $set: { OTP: 0 } });
}

export function passwordReset(OTP, hashpass) {
  return Client.db("userDetails")
    .collection("user")
    .updateOne({ OTP: OTP }, { $set: { password: hashpass } });
}
