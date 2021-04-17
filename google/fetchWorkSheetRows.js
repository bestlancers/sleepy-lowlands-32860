const axios = require("axios");

const fetchWorkSheetRows = async (req, res, next) => {
  let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  let { sheetId, workSheetName } = req.body;
  try {
    let fields = encodeURIComponent(`sheets(properties)`);
    // let token = req.b;
    let options = {
      method: "get",
      url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${workSheetName}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };
    // console.log(options);
    // try {
    let workSheetResponse = await axios(options);
    res.json({
      data: workSheetResponse.data
    });
  } catch (error) {
    res.status(400).json({
      data:error
    })
    console.log(error);
  }
};

exports.fetchWorkSheetRows = fetchWorkSheetRows;
