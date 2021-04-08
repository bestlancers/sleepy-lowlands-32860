const axios = require("axios");

const fetchOcpiList = async (req, res, next) => {
  try {
    let options = {
      method: "get",
      url: `http://www.ancpi.ro/aplicatii/urmarireCerereRGI/data/ocpi.json`,
      headers: {
        "Content-Type": "application/json"
      }
    };
    // try {
    let ocpiResponse = await axios(options);
    // console.log(ocpiResponse.data);

    res.json({
      data: ocpiResponse.data
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      data:error.message
    })
  }
};

exports.fetchOcpiList = fetchOcpiList;
