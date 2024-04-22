const modelGame = require("../models/gameModel");

exports.create = (req, res) => {
  const roomId = req.params.roomId;
  if (roomId) {
    if (isNaN(roomId)) {
      return res.status(400).json({
        error: "roomId must be a number",
        errorCode: 6000,
      });
    } else {
      const db = req.db;
      const newGame = new modelGame(1, roomId);
      const sqlQuery = "INSERT INTO Game (status, room_id) VALUES (?, ?)";
      db.run(sqlQuery, [newGame.status, newGame.roomId], function (err) {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Internal server error", errorCode: 6001 });
        }

        res.status(200).json({
          message: "Game created successfully",
          gameId: this.lastID,
        });
      });
    }
  } else {
    res.status(400).json({ error: "Missing data", errorCode: 6002 });
  }
};

exports.disable = (req, res) => {
  const db = req.db;
  const gameId = req.params.id;

  if (gameId) {
    if (isNaN(gameId)) {
      return res.status(400).json({
        error: "id must be a number",
        errorCode: 6010,
      });
    } else {
      const sqlQuery = "UPDATE Game SET status = 0 WHERE game_id = ?";
      db.run(sqlQuery, gameId, function (err) {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Internal server error", errorCode: 6011 });
        }
        res.status(200).json({
          message: "Game disabled successfully",
          numberRowsUpdated: this.changes,
        });
      });
    }
  } else {
    res.status(400).json({ error: "Missing data", errorCode: 6012 });
  }
};
