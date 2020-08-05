const productivityQuery = (keyword) => {
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
        specification: {
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
        date: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        time: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        worker: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        client: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        model: {
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
        console.log(err);
      }
      res.send(docs);
    },
  };
};

module.exports = productivityQuery;
