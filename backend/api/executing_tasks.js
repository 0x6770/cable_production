const express = require("express");
const qs = require("qs");

const router = express.Router();

const ExecutingTask_jichu = require("../models/executing_task_jichu");
const ExecutingTask_fuzhao = require("../models/executing_task_fuzhao");

const Task_jichu = require("../models/task_jichu");
const Task_fuzhao = require("../models/task_fuzhao");

// Fetch all executing tasks
router.get("/:type/get", (req, res) => {
  let Scheme;
  if (req.params.type == "jichu") {
    Scheme = ExecutingTask_jichu;
  } else if (req.params.type == "fuzhao") {
    Scheme = ExecutingTask_fuzhao;
  }

  Scheme.find({}, (err, machines) => {
    res.send({
      machines: Object.keys(machines).length > 0 ? machines : {},
    });
  });
});

// ADD or Update task
router.post("/:type/change", (req, res) => {
  let Scheme;
  if (req.params.type == "jichu") {
    Scheme = ExecutingTask_jichu;
  } else if (req.params.type == "fuzhao") {
    Scheme = ExecutingTask_fuzhao;
  }

  Scheme.find({ machine_number: req.body.machine_number }, (err, result) => {
    if (err) {
      res.send(err);
    }
    const existed = result.length === 0 ? false : true;
    if (existed) {
      Scheme.findOneAndUpdate(
        { machine_number: req.body.machine_number },
        { task_id: req.body.id },
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    } else {
      const newMachine = new Scheme({
        machine_number: req.body.machine_number,
        task_id: req.body.id,
      });

      newMachine
        .save()
        .then((task) => {})
        .catch((err) => console.log(err));
    }
  });
});

// Update property of task
router.post("/:type/update", (req, res) => {
  let Scheme;
  if (req.params.type == "jichu") {
    Scheme = Task_jichu;
  } else if (req.params.type == "fuzhao") {
    Scheme = Task_fuzhao;
  }
  const data = qs.parse(req.body);
  console.log("data", data);
  Scheme.findByIdAndUpdate(data.id, data.data)
    .then((result) => {
      res.json({ message: "success" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
