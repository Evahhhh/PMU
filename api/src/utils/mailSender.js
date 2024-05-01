var nodeoutlook = require("nodejs-nodemailer-outlook");

exports.sendEmail = (req, res) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const emailDestination = req.body.to;

  if (!emailDestination || !emailRegex.test(emailDestination)) {
    return res.status(400).send("Invalid email address");
  }

  nodeoutlook.sendEmail({
    auth: {
      user: process.env.OUTLOOK_MAIL,
      pass: process.env.OUTLOOK_PASSWORD,
    },
    from: process.env.OUTLOOK_MAIL,
    to: emailDestination,
    subject: "test",
    html: "<b>This is bold text</b>",
    text: "This is text version!",
    replyTo: "",

    onError: (e) => console.log(e),
    onSuccess: (i) => res.send("Email envoyé"),
  });
};
