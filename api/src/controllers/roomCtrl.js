const modelRoom = require("../models/roomModel");

exports.create = (req, res) => {
  const { userIds, adminId } = req.body;
  if (userIds && adminId) {
    if (!Array.isArray(userIds) || !userIds.every(Number.isFinite)) {
      return res.status(400).json({
        error: "userIds must be an array of numbers only",
        errorCode: 2000,
      });
    } else if (typeof adminId !== "number") {
      return res.status(400).json({
        error: "adminId must be a number",
        errorCode: 2001,
      });
    } else {
      createRoom(req, res, userIds, adminId);
    }
  } else {
    res.status(400).json({ error: "missing data", errorCode: 2004 });
  }
};

function createRoom(req, res, userIds, adminId) {
  const db = req.db;
  const code = Math.floor(100000 + Math.random() * 900000);
  const newRoom = new modelRoom(1, code, adminId, userIds);
  const sqlQueryRoom =
    "INSERT INTO Room (status, code, admin_id) VALUES (?, ?, ?)";
  const sqlQueryUserRoom =
    "INSERT INTO User_Room (user_id, room_id) VALUES (?, ?)";
  db.run(
    sqlQueryRoom,
    [newRoom.status, newRoom.code, newRoom.adminId],
    function (err) {
      if (err) {
        console.error(err);
        if (err.code == "SQLITE_CONSTRAINT") {
          // Retry with a new code
          createRoom(req, res, userIds, adminId);
        } else {
          return res
            .status(500)
            .json({ error: "Internal server error", errorCode: 2002 });
        }
      }
      const roomId = this.lastID;

      const promises = userIds.map((userId) => {
        return new Promise((resolve, reject) => {
          db.run(sqlQueryUserRoom, [userId, roomId], (err) => {
            if (err) {
              console.error(err);
              reject({
                status: 500,
                json: {
                  error: "Internal server error",
                  errorCode: 2003,
                },
              });
            }
            resolve();
          });
        });
      });

      Promise.all(promises)
        .then(() => {
          res.status(200).json({
            message: "Room created successfully",
            roomdId: this.lastID,
          });
        })
        .catch((err) => {
          res.status(err.status).json(err.json);
        });
    }
  );
}

exports.get = (req, res) => {
  const db = req.db;
  const code = req.params.code;

  const sqlQuery = "SELECT * FROM Room WHERE code = ?";
  db.all(sqlQuery, [code], (err, results) => {
    if (results.length === 0) {
      res.status(400).json({ error: "Invalid data", errorCode: 2010 });
    } else {
      res.status(200).json({
        id: results[0].room_id,
        status: results[0].status,
        code: results[0].code,
        adminId: results[0].admin_id,
      });
    }
  });
};

exports.getPlayers = (req, res) => {
  const db = req.db;
  const roomId = req.params.id;

  const sqlQuery = "SELECT * FROM User_Room WHERE room_id = ?";
  db.all(sqlQuery, [roomId], (err, results) => {
    if (results.length === 0) {
      res.status(400).json({ error: "Invalid data", errorCode: 2020 });
    } else {
      const userIds = results.map((result) => result.user_id);
      res.status(200).json({
        userIds: userIds,
      });
    }
  });
};

exports.getMessages = (req, res) => {
  const db = req.db;
  const roomId = req.params.id;

  const sqlQueryRoom = "SELECT * FROM Room WHERE room_id = ?";
  db.get(sqlQueryRoom, [roomId], (err, room) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Internal server error", errorCode: 2030 });
    }

    if (!room) {
      return res.status(404).json({ error: "Room not found", errorCode: 2031 });
    }

    const sqlQueryUserRoom = "SELECT * FROM Message WHERE room_id = ?";
    db.all(sqlQueryUserRoom, [roomId], (err, results) => {
      if (results.length === 0) {
        res.status(200).json({ msg: "No messages in this room" });
      } else {
        res.status(200).json({
          messages: results,
        });
      }
    });
  });
};

exports.disable = (req, res) => {
  const db = req.db;
  const roomId = req.params.id;

  const sqlQuery = "UPDATE Room SET status = 0 WHERE room_id = ?";
  db.run(sqlQuery, roomId, function (err) {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Internal server error", errorCode: 2040 });
    }
    res
      .status(200)
      .json({ message: "Room disabled successfully", numberRowsUpdated: this.changes });
  });
};
