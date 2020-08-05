const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const auth = require("../middleware/auth");

const randomString = process.env["RANDOM_STRING"];

// Fetch All users
router.get("/get", auth, (req, res) => {
  let valid = true;
  User.findById(req.user.id, (err, user) => {
    if (!user.admin) {
      valid = false;
      return res.status(400).json({ message: "无权限访问" });
    }
  }).then(() => {
    if (valid) {
      User.find({}, (err, users) => {
        res.send({
          users: Object.keys(users).length > 0 ? users : {},
        });
      });
    }
  });
});

// Delete user
router.delete("/delete/:id", auth, (req, res) => {
  let valid = true;
  User.findById(req.user.id, (err, user) => {
    if (!user.admin) {
      valid = false;
      return res.status(400).json({ message: "无权限访问" });
    }
  }).then(() => {
    if (valid) {
      User.findById(req.params.id, (err, user) => {
        if (user.admin) {
          valid = false;
          return res.status(400).json({ message: "无权限访问" });
        }
      }).then(() => {
        if (valid) {
          User.findOneAndRemove({ _id: req.params.id }, (err) => {
            if (err) console.log(err);
          })
            .then(() => res.send("success"))
            .catch((err) => res.send(err));
        }
      });
    }
  });
});

// Update user
router.put("/update/:id", auth, (req, res) => {
  let valid = true;
  User.findById(req.user.id, (err, user) => {
    if (!user.admin) {
      valid = false;
      return res.status(400).json({ message: "无权限访问" });
    }
  }).then(() => {
    if (valid) {
      User.findByIdAndUpdate(
        req.params.id,
        { $set: { authority: Object.values(req.body) } },
        (err) => {
          if (err) console.log(err);
        }
      )
        .then(() => res.send("success"))
        .catch((err) => res.send(err));
    }
  });
});

// User sign up
router.post(
  "/signup",
  [
    check("username", "请输入有效的用户名").not().isEmpty(),
    check("password", "请输入有效的密码").isLength({
      min: 6,
    }),
    check("phoneNumber", "请输入有效的手机号").isMobilePhone(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, phoneNumber, password } = req.body;
    try {
      let user = await User.findOne({
        phoneNumber,
      });
      if (user) {
        return res.status(400).json({
          message: "该手机号已注册",
        });
      }

      user = new User({
        username,
        password,
        phoneNumber,
        authority: ["basic"],
        admin: false,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          authority: user.authority,
        },
      };

      jwt.sign(
        payload,
        randomString,
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).cookie("token", token, { httpOnly: true });
          res.status(200).json({ message: "success" });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("保存用户时出错");
    }
  }
);

// User login
router.post(
  "/login",
  [
    check("phoneNumber", "请输入有效的手机号").isMobilePhone(),
    check("password", "请输入有效的密码").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { phoneNumber, password } = req.body;
    try {
      let user = await User.findOne({
        phoneNumber,
      });
      if (!user)
        return res.status(400).json({
          message: "该手机号未注册",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "密码错误",
        });

      const payload = {
        user: {
          id: user.id,
          authority: user.authority,
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
          res.status(200).json({ message: "success" });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "服务器异常",
      });
    }
  }
);

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json({
      username: user.username,
      phoneNumber: user.phoneNumber,
      authority: user.authority,
      admin: user.admin,
    });
  } catch (e) {
    res.status(400).send({ message: "获取用户信息时出现错误" });
  }
});

// User logout
router.post("/logout", auth, async (req, res) => {
  const payload = {
    user: {},
  };
  try {
    jwt.sign(
      payload,
      randomString,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() - 900000),
        });
        res.status(200).json({ message: "success" });
      }
    );
  } catch (err) {
    console.log("err", err);
  }
});

module.exports = router;
