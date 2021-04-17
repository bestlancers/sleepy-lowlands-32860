const axios = require("axios");

const createSheet = async (req, res, next) => {
  let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  let { name } = req.body;
  try {
    // let token = req.b;
    let options = {
      method: "post",
      url: `https://sheets.googleapis.com/v4/spreadsheets`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      data: JSON.stringify({ properties: { title: `${name}` } })
    };
    // console.log(options);
    // try {
    let fileResponse = await axios(options);
    console.log(fileResponse.data)
    res.json({
      data: fileResponse.data
    });
  } catch (error) {
    
    res.status(400).json({
      data: error
    });
  }
};

exports.createSheet = createSheet;
