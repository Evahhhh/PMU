var nodeoutlook = require("nodejs-nodemailer-outlook");
var jwt = require("jsonwebtoken");

exports.sendEmail = (req, res) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const emailDestination = req.body.to;

  if (!emailDestination || !emailRegex.test(emailDestination)) {
    return res.status(400).send("Invalid email address");
  }

  const token = jwt.sign(
    { email: emailDestination },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  const resetLink = `${process.env.PMU_WEBSITE}/reset-password?token=${token}`;

  nodeoutlook.sendEmail({
    auth: {
      user: process.env.OUTLOOK_MAIL,
      pass: process.env.OUTLOOK_PASSWORD,
    },
    from: process.env.OUTLOOK_MAIL,
    to: emailDestination,
    subject: "Réinitialisation de votre mot de passe PMU",
    html: `
    <p>Bonjour,</p>
    <p>Vous avez demandé à réinitialiser votre mot de passe PMU. Veuillez cliquer sur le bouton ci-dessous pour procéder à la réinitialisation.</p><br>
    <div style="text-align: center;">
      <a href="${resetLink}" style="background-color: #00A870; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Réinitialiser le mot de passe</a>
    </div><br><br>
    <p>Si vous n'avez pas demandé à réinitialiser votre mot de passe, veuillez ignorer cet email.</p>
    <p>Cordialement,</p>
    <p>L'équipe PMU</p>
  `,
    text: `
    Bonjour,
    Vous avez demandé à réinitialiser votre mot de passe PMU. Veuillez cliquer sur le lien ci-dessous pour procéder à la réinitialisation.
    ${resetLink}
    Si vous n'avez pas demandé à réinitialiser votre mot de passe, veuillez ignorer cet email.
    Cordialement,
    L'équipe PMU
  `,
    replyTo: "",

    onError: (e) => {
      console.log(e);
      res.status(500).send({ error: "Error while sending the email", errorCode: 7000});
    },
    onSuccess: (i) => {
      res.status(200).send({ message: "Email sent successfully" });
    },
  });
};
