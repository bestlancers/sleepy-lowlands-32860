const axios = require("axios");

const fetchStatisticsRecord = async (req, res, next) => {
  let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  let { stareCurrenta,sheetId,workSheetName} = req.body;
  try {
   
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
    let array = workSheetResponse.data.values;
    if(array && array.length)
    {
        let records = array.filter((row)=>{return row[20].toUpperCase()==stareCurrenta.toUpperCase()});
        res.json({
            data:records
        })
    }else
    {
        res.json({
            data:null
        })
    }
   
    
  } catch (error) {
    res.status(400).json({
      data:error
    })
    console.log(error);
  }
};

exports.fetchStatisticsRecord = fetchStatisticsRecord;
