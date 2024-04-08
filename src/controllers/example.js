//Import database connection
const db = require("../client/dbConnect.js");

let pseudo = "Evah";
let email = "evah@example.com";
let password = "motdepassetropdur";
let token = "nfz8fç3NUF";


//Insert example
db.run(
  `INSERT INTO User (pseudo, email, password, token) VALUES (?, ?, ?, ?)`,
  [pseudo, email, password, token],
  function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  }
);


//SElECT example
db.all(
  `SELECT user_id AS userId, pseudo AS userPseudo, email AS userEmail, password AS userPassword, token AS userToken FROM User`,
  [],
  (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(
        row.userId,
        row.userPseudo,
        row.userEmail,
        row.userPassword,
        row.userToken
      );
    });
  }
);
