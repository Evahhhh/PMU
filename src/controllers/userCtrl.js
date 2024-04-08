const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+\\\/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\-]{2,63}$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const modelUser = require("../models/userModel");

exports.signup = (req, res) => {
  const { pseudo, email, password} = req.body;
  if (!regexEmail.test(email)) {
    return res
      .status(400)
      .json({ error: "'Please fill in the form fields correctly'" });
  } else if (!regexPassword.test(password)) {
    return res.status(400).json({
      error:
        "Your password must contain at least 8 characters, one lower case, one upper case, one number and one special character",
    });
  } else {
    const db = req.db;
    const sel = bcrypt.genSaltSync(10);
    const hachage = bcrypt.hashSync(password , sel );
    // Création d'une instance d'utilisateur avec les données reçues
    const newUser = new modelUser(pseudo, email, hachage);
    //requête SQL
    const sqlQuery = 'INSERT INTO User (pseudo, email, password) VALUES (?, ?, ?)';
    // Exécution de la requête
    db.run(sqlQuery, [newUser.pseudo, newUser.email, newUser.password],(err) => {
      if (err) {
        if(err == "SQLITE_CONSTRAINT") {
          return res.status(409).json({ error: 'Email existing already' });
        }
        else {
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
      res.status(200).json({ message: 'User created successfully'});
    });
  }
}

exports.login = (req, res) => {
  /* Connexion BDD => */const db = req.db;
  const { email, password} = req.body;
  const sqlQuery = 'SELECT * FROM user WHERE email = ?';
  db.all(sqlQuery, [email], (err, results) => {
    if (results.length === 0) {
      res.status(400).send('invalid data');
      return;
    } else {
      bcrypt
      .compare(password, results[0].password)
      .then((valid) => {
        if(!valid) {
          return res.status(400).json({error: "wrong password"})
        }
        res.status(200).json({
          id: results[0].user_id,
          token:jwt.sign({id:results[0].user_id}, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h"
          })
        });
      })
      .catch((error) => res.status(400).json({error}));
    }
  });
}

exports.modify = (req, res) => {
    const db = req.db;
    const { user_id, email, password, pseudo} = req.body;
    if (!regexEmail.test(email.trim()) || !regexPassword.test(password.trim())) {
      res.status(400).send('Donnée invalide');
    } else {
      const sel = bcrypt.genSaltSync(10);
      const hachage = bcrypt.hashSync(password , sel );
      // Requête SQL pour mettre à jour l'utilisateur avec les nouvelles valeurs
      const sqlUpdate = 'UPDATE user SET email = ?,password = ?, pseudo = ? WHERE id_user = ?';
      db.query(sqlUpdate, [email, hachage, pseudo, user_id], (err, result) => {
          if (err) {
              console.error('Error while editing article:', err);
              res.status(400).send('Server error');
              return;
          }
          if (result.affectedRows === 0) {
              res.status(400).send('user not found');
              return;
          }
          res.status(200).send('User modified');
      });
    }
}