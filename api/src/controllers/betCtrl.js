const modelBet = require("../models/betModel");

exports.create = (req, res) => {
  const { sibsNumber, horseId, userId, roundId } = req.body;
  if (sibsNumber && horseId && userId && roundId) {
    if (
      typeof sibsNumber !== "number" ||
      typeof horseId !== "number" ||
      typeof roundId !== "number" ||
      typeof userId !== "number"
    ) {
      return res.status(400).json({
        error: "sibsNumber, horseId, userId and roundId must be numbers",
        errorCode: 3000,
      });
    } else {
      const db = req.db;
      const newBet = new modelBet(sibsNumber, horseId, userId, roundId);
      const sqlQuery =
        "INSERT INTO Bet (sibs_number, horse_id, user_id, round_id) VALUES (?, ?, ?, ?)";
      db.run(
        sqlQuery,
        [newBet.sibsNumber, newBet.horseId, newBet.userId, newBet.roundId],
        function (err) {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Internal server error", errorCode: 3001 });
          }

          res.status(200).json({ message: "Bet created successfully" , "betId": this.lastID});
        }
      );
    }
  } else {
    res.status(400).json({ error: "Missing data", errorCode: 3002 });
  }
};
