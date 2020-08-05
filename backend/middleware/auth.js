const jwt = require("jsonwebtoken");

const randomString = process.env["RANDOM_STRING"];

module.exports = function (req, res, next) {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "校验失败，未检测到令牌" });

  try {
    const decoded = jwt.verify(token, randomString);
    req.user = decoded.user;

    // renew the access token
    const payload = {
      user: {
        id: decoded.user.id,
      },
    };

    jwt.sign(
      payload,
      randomString,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).cookie("token", token, { httpOnly: true });
      }
    );
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "无效令牌" });
  }
};
