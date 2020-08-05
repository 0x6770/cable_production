const express = require("express");

const router = express.Router();

const Productivity_fuzhao = require("../models/productivity_fuzhao");
const Productivity_jichu = require("../models/productivity_jichu");

const productivityQuery = require("../queries/all_productivity");

const User = require("../models/user");
const auth = require("../middleware/auth");

// Fetch All productivity
router.get("/:type/get", (req, res) => {
  let Scheme;
  if (req.params.type == "jichu") {
    Scheme = Productivity_jichu;
  } else if (req.params.type == "fuzhao") {
    Scheme = Productivity_fuzhao;
  }
  Scheme.find({})
    .sort({ created_at: -1 })
    .exec((err, productivity) => {
      res.send({
        productivity: Object.keys(productivity).length > 0 ? productivity : {},
      });
    });
});

// ADD productivity
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
      let newProductivity;
      if (req.params.type === "jichu") {
        Scheme = Productivity_jichu;
        // Date,姓名,Shift,Production number,Process,Model,Specs（mm2）,Output（KM),机号,Notes
        newProductivity = new Scheme({
          date: req.body.date,
          worker: req.body.worker,
          time: req.body.time,
          production_number: req.body.production_number,
          process: req.body.process,
          model: req.body.model,
          specification: req.body.specification,
          amount: req.body.amount,
          machine_number: req.body.machine_number,
          note: req.body.note,
        });
      } else if (req.params.type === "fuzhao") {
        Scheme = Productivity_fuzhao;
        // Date,姓名,Shift,Client,Model,Specs,Output（KM),Notes
        newProductivity = new Scheme({
          date: req.body.date,
          worker: req.body.worker,
          time: req.body.time,
          client: req.body.client,
          model: req.body.model,
          specification: req.body.specification,
          amount: req.body.amount,
          note: req.body.note,
        });
      }

      newProductivity
        .save()
        .then(() => {
          res.send("success");
        })
        .catch((err) => console.log(err));
    }
  });
});

// Delete productivity
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
      const productivityID = req.params.id;
      let Scheme;
      if (req.params.type == "jichu") {
        Scheme = Productivity_jichu;
      } else if (req.params.type == "fuzhao") {
        Scheme = Productivity_fuzhao;
      }
      Scheme.findOneAndRemove({ _id: productivityID }, (err) => {
        if (err) console.log(err);
      })
        .then(() => res.send("success"))
        .catch((err) => console.log(err));
    }
  });
});

// Update productivity
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
      const productivityID = req.params.id;
      let Scheme;
      if (req.params.type == "jichu") {
        Scheme = Productivity_jichu;
      } else if (req.params.type == "fuzhao") {
        Scheme = Productivity_fuzhao;
      }

      Scheme.findByIdAndUpdate(productivityID, req.body, (err) => {
        if (err) console.log(err);
      })
        .then(() => res.send({ message: "success" }))
        .catch((err) => console.log(err));
    }
  });
});

// Search productivity by keyword
router.get("/:type/search/:keyword", (req, res) => {
  let Scheme;
  if (req.params.type == "jichu") {
    Scheme = Productivity_jichu;
  } else if (req.params.type == "fuzhao") {
    Scheme = Productivity_fuzhao;
  }
  Scheme.find(productivityQuery(req.params.keyword.replace(/\_/g, "/"))).exec(
    (err, docs) => {
      if (err) res.status(400).json(err);
      res.send(docs);
    }
  );
});

module.exports = router;
