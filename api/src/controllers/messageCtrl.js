const modelMessage = require("../models/messageModel");

exports.create = (req, res) => {
  const { content, roomId, userId } = req.body;
  if (content && roomId && userId) {
    if (
      typeof content !== "string" ||
      typeof roomId !== "number" ||
      typeof userId !== "number"
    ) {
      return res.status(400).json({
        error: "content must be a string | roomId and userId must be numbers",
        errorCode: 4000,
      });
    } else {
      const db = req.db;
      const newMessage = new modelMessage(content, roomId, userId);
      const sqlQuery =
        "INSERT INTO Message (content, sending_date, room_id, user_id) VALUES (?,datetime('now'), ?, ?)";
      db.run(
        sqlQuery,
        [newMessage.content, newMessage.roomId, newMessage.userId],
        function (err) {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Internal server error", errorCode: 4001 });
          }
          res.status(200).json({
            message: "Message created successfully",
            messageId: this.lastID,
          });
        }
      );
    }
  } else {
    res.status(400).json({ error: "Missing data", errorCode: 4002 });
  }
};

exports.delete = (req, res) => {
  const messageId = req.params.id;
  const db = req.db;
  const sqlQuery = "DELETE FROM Message WHERE message_id = ?";
  db.run(sqlQuery, messageId, function (err) {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Internal server error", errorCode: 4010 });
    }
    res
      .status(200)
      .json({
        message: "Message deleted successfully",
        numberRowsUpdated: this.changes,
      });
  });
};
