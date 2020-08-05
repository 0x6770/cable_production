const taskQuery = (keyword) => {
  return {
    $or: [
      {
        machine_number: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        production_number: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        product_name: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        specification: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        color: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        conductor_struct: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        note: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        created_at_string: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
    function(err, docs) {
      if (err) {
        console.log("taskQuery -> err", err);
      }
      res.send(docs);
    },
  };
};

module.exports = taskQuery;
