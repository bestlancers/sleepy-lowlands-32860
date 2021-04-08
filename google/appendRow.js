const axios = require("axios");

const appendRow = async (req, res, next) => {
  let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  let { sheetId, workSheetName, values } = req.body;

  try {
    // let token = req.b;
    let request = {
      method: "get",
      url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${workSheetName}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };
   
    let workSheetResponse = await axios(request);
  // console.log(workSheetResponse.data.values)
      let array =  workSheetResponse.data.values;
       let isDuplicate = false;
       let len=0;
       if(array && array.length)
       {
        array.map(async(row,index)=>{
          // console.log(row[13],values[0][13]);
          if(row[13]===values[0][13] && row[14]===values[0][14] && row[16]===values[0][16] && row[15]===values[0][15])
          {
             isDuplicate=true;
          }
         })
       }
      
       if(!isDuplicate)
       {
          len = array?array.length+1:len+1;
         workSheetName += "!A"+len;
        try {
          // let token = req.b;
          let options = {
            method: "post",
            url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${workSheetName}:append?includeValuesInResponse=true&insertDataOption=INSERT_ROWS&responseDateTimeRenderOption=SERIAL_NUMBER&responseValueRenderOption=FORMATTED_VALUE&valueInputOption=RAW`,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            data: JSON.stringify({ values: values })
          };
          // console.log(options);
          // try {
          let workSheetResponse = await axios(options);
          res.json({
            data: workSheetResponse.data
          });
        } catch (error) {
          res.status(400).json({
            data: error
          });
        }
       }
       else{
        res.json({
          data: "already exists!"
        });
       }
      }catch(err)
      {
        res.status(400).json({
          data: err
        });
      }

 
};

exports.appendRow = appendRow;
