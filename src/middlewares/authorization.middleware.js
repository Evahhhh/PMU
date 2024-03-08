function authorization(req, res, next) {
  const listUser = [
    {
      id: "1",
      token: "hashed",
    },
    {
      id: "2",
      token: "hashed",
    },
    {
      id: "3",
      token: "hashed",
    },
  ];

  // Replace by database query which search for a user with the given token
  const user = listUser.find((user) => user.token === req.headers.authorization);

  if (!user) {
    res.status(401).send({
      message: 'Unauthorized'
   });
  }
  next();
}

module.exports = authorization;