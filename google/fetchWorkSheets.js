const axios = require("axios");

const fetchWorkSheets = async (req, res, next) => {
  let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  let { sheetId } = req.query;
  try {
    let fields = encodeURIComponent(`sheets(properties)`);
    // let token = req.b;
    let options = {
      method: "post",
     
      url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=${fields}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
       
    };
    // try {
    let workSheetResponse = await axios(options);
    console.log(workSheetResponse.data.sheets);
    res.json({
      data: workSheetResponse.data.sheets.map(v => {
        return {
          sheetId: v.properties.sheetId,
          title: v.properties.title,
          gridProperties: v.properties.gridProperties
        };
      })
    });
  } catch (error) {
    res.status(error.response.status).json({
      data: error
    });
  }
};

exports.fetchWorkSheets = fetchWorkSheets;
