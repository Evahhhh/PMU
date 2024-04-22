const modelRound = require("../models/roundModel");

exports.create = (req, res) => {
  const { duration, gameId } = req.body;
  if (duration && gameId) {
    if (typeof duration !== "number" || typeof gameId !== "number") {
      return res.status(400).json({
        error: "duration and gameId must be numbers",
        errorCode: 5000,
      });
    } else {
      const db = req.db;
      const newRound = new modelRound(1, duration, gameId);
      const sqlQuery =
        "INSERT INTO Round (status, duration, game_id) VALUES (?, ?, ?)";
      db.run(
        sqlQuery,
        [newRound.status, newRound.duration, newRound.gameId],
        function (err) {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Internal server error", errorCode: 5001 });
          }

          res.status(200).json({
            message: "Round created successfully",
            roundId: this.lastID,
          });
        }
      );
    }
  } else {
    res.status(400).json({ error: "Missing data", errorCode: 5002 });
  }
};

exports.disable = (req, res) => {
  const db = req.db;
  const roundId = req.params.id;

  const sqlQuery = "UPDATE Round SET status = 0 WHERE round_id = ?";
  db.run(sqlQuery, roundId, function (err) {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Internal server error", errorCode: 5010 });
    }
    res.status(200).json({
      message: "Round disabled successfully",
      numberRowsUpdated: this.changes,
    });
  });
};

exports.get = (req, res) => {
  const db = req.db;
  const roundId = req.params.id;

  if (roundId) {
    if (isNaN(roundId)) {
      return res.status(400).json({
        error: "id must be a number",
        errorCode: 5021,
      });
    } else {
      const sqlQuery = "SELECT * FROM Round WHERE round_id = ?";
      db.all(sqlQuery, roundId, (err, results) => {
        if (results.length === 0) {
          res.status(400).json({ error: "Invalid data", errorCode: 5020 });
        } else {
          res.status(200).json({
            id: results[0].round_id,
            status: results[0].status,
            duration: results[0].duration,
            gameId: results[0].game_id,
          });
        }
      });
    }
  } else {
    res.status(400).json({ error: "Missing data", errorCode: 5022 });
  }
};

exports.getBets = (req, res) => {
  const db = req.db;
  const roundId = req.params.id;

  if (roundId) {
    if (isNaN(roundId)) {
      return res.status(400).json({
        error: "id must be a number",
        errorCode: 5032,
      });
    } else {
      const sqlQueryRound = "SELECT * FROM Round WHERE round_id = ?";
      db.get(sqlQueryRound, roundId, (err, round) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Internal server error", errorCode: 5030 });
        }

        if (!round) {
          return res
            .status(404)
            .json({ error: "Round not found", errorCode: 5031 });
        }

        const sqlQueryBetsRound = "SELECT * FROM Bet WHERE round_id = ?";
        db.all(sqlQueryBetsRound, roundId, (err, results) => {
          if (results.length === 0) {
            res.status(200).json({ msg: "No bets in this round" });
          } else {
            res.status(200).json({
              bets: results,
            });
          }
        });
      });
    }
  } else {
    res.status(400).json({ error: "Missing data", errorCode: 5033 });
  }
};
