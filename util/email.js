const redis = require("../config/redis.config");
const nodeMailer = require("nodemailer");

const container = nodeMailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

const random_number = () => {
  return Math.floor(Math.random() * 90000);
};

const send_email = async (receipt) => {
  const random_num_otp = random_number();
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: receipt,
    subject: process.env.MAIL_SUBJECT,
    text: `${process.env.MAIL_MSG} ${random_num_otp}`,
  };

  container.sendMail(mailOptions, async (err, info) => {
    if (err) {
      console.log(err);
      common.failure_func(res);
    }
    await redis.hset(process.env.REDIS_HASHSET_NAME, receipt, random_num_otp);
  });
};

const getOTPFromRedis = async (username) => {
  return await redis.hget(process.env.REDIS_HASHSET_NAME, username);
};

module.exports = { send_email, getOTPFromRedis };
