class Room {
    constructor(status, code, adminId, userIds) {
      this.status = status;
      this.code = code;
      this.adminId = adminId;
      this.userIds = userIds;
    }
  }
  
  module.exports = Room;
  