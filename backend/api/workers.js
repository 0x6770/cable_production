const express = require("express");

const router = express.Router();

const Worker_fuzhao = require("../models/worker_fuzhao");
const Worker_jichu = require("../models/worker_jichu");

const User = require("../models/user");
const auth = require("../middleware/auth");

// Fetch All worker
router.get("/:type/get", (req, res) => {
  let Scheme;
  if (req.params.type == "jichu") {
    Scheme = Worker_jichu;
  } else if (req.params.type == "fuzhao") {
    Scheme = Worker_fuzhao;
  }
  Scheme.find({}, (err, workers) => {
    res.send({
      workers: Object.keys(workers).length > 0 ? workers : {},
    });
  });
});

// ADD worker
router.post("/:type/add", auth, (req, res) => {
  let valid = true;
  User.findById(req.user.id, (err, user) => {
    if (
      (req.params.type === "jichu" &&
        !user.authority.includes("jichu_admin")) ||
      (req.params.type === "fuzhao" && !user.authority.includes("fuzhao_admin"))
    ) {
      valid = false;
      return res.status(400).json({ message: "无权限访问" });
    }
  }).then(() => {
    if (valid) {
      let Scheme;
      if (req.params.type == "jichu") {
        Scheme = Worker_jichu;
      } else if (req.params.type == "fuzhao") {
        Scheme = Worker_fuzhao;
      }
      const newWorker = new Scheme({
        name: req.body.name,
      });

      newWorker
        .save()
        .then(() => {
          res.send("success");
        })
        .catch((err) => console.log(err));
    }
  });
});

// Delete worker
router.delete("/:type/delete/:id", auth, (req, res) => {
  let valid = true;
  User.findById(req.user.id, (err, user) => {
    if (
      (req.params.type === "jichu" &&
        !user.authority.includes("jichu_admin")) ||
      (req.params.type === "fuzhao" && !user.authority.includes("fuzhao_admin"))
    ) {
      valid = false;
      return res.status(400).json({ message: "无权限访问" });
    }
  }).then(() => {
    if (valid) {
      const workerID = req.params.id;
      let Scheme;
      if (req.params.type == "jichu") {
        Scheme = Worker_jichu;
      } else if (req.params.type == "fuzhao") {
        Scheme = Worker_fuzhao;
      }
      Scheme.findOneAndRemove({ _id: workerID }, (err) => {
        if (err) console.log(err);
      })
        .then(() => res.send("success"))
        .catch((err) => console.log(err));
    }
  });
});

// Update worker
router.put("/:type/update/:id", auth, (req, res) => {
  let valid = true;
  User.findById(req.user.id, (err, user) => {
    if (
      (req.params.type === "jichu" &&
        !user.authority.includes("jichu_admin")) ||
      (req.params.type === "fuzhao" && !user.authority.includes("fuzhao_admin"))
    ) {
      valid = false;
      return res.status(400).json({ message: "无权限访问" });
    }
  }).then(() => {
    if (valid) {
      const workerID = req.params.id;
      let Scheme;
      if (req.params.type == "jichu") {
        Scheme = Worker_jichu;
      } else if (req.params.type == "fuzhao") {
        Scheme = Worker_fuzhao;
      }

      Scheme.findByIdAndUpdate(workerID, req.body, (err) => {
        if (err) console.log(err);
      })
        .then(() => res.send("success"))
        .catch((err) => console.log(err));
    }
  });
});

module.exports = router;
