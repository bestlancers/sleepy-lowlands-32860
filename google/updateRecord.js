const axios = require("axios");

const updatedRecord = async (req, res, next) => {
  let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  let { sheetId, workSheetName, values ,ocpi,bcpi,numar,year} = req.body;
  
  


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
   
      let array =  workSheetResponse.data.values;
      if(array && array.length)
      {
                var index = array.findIndex((row)=>{return row[13]==ocpi && row[14]==bcpi && row[16]==numar && row[15]==year});
               // console.log(index);

        if(index==-1)
            {
              res.json({
                data:"not found"
              })
            }
            else{
         // console.log(index);
            index =index+1;
           // console.log(index);
            workSheetName += "!A"+index;
           // console.log(workSheetName);
            let options = {
              method: "put",
              url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${workSheetName}?includeValuesInResponse=true&responseDateTimeRenderOption=SERIAL_NUMBER&responseValueRenderOption=FORMATTED_VALUE&valueInputOption=RAW&`,
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              },
              data: JSON.stringify({ values: values, majorDimension: "ROWS" })
            };
            // console.log(options);
             try {
            let workSheetResponse = await axios(options);
          // console.log(workSheetResponse)
           
            res.json({
              data: workSheetResponse.data
            });
          }catch(err)
          {
           // console.log(err);
            res.status(400).json({
              data: err
            });
          }
          
        }
         // console.log(index,array.length,isUpdated);
         
       
      
      }else{
        res.json({
          data:"empty sheet"
        })
      }
    
  } catch (error) {
    res.status(400).json({
      data: error
    });
  }

  
};

exports.updatedRecord = updatedRecord;
