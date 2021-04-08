const axios = require("axios");

const fetchBcpiList = async (req, res, next) => {
  try {
    let { oid = null } = req.query;
    let options = {
      method: "get",
      url: `http://www.ancpi.ro/aplicatii/urmarireCerereRGI/data/bcpi.json`,
      headers: {
        "Content-Type": "application/json"
      }
    };
    // console.log(options);
    // try {
    let bcpiResponse = await axios(options);

    bcpiResponse = oid
      ? bcpiResponse.data.filter(v => v.oid === oid)
      : bcpiResponse.data;
    res.json({
      data: bcpiResponse
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      data:error.message
    })
  }
};

exports.fetchBcpiList = fetchBcpiList;
