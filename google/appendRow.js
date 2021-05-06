const axios = require("axios");

const findMinLucrare= async(workSheetName,sheetId,token)=>{
    workSheetName += "!A:A";
  try {
    // let token = req.b;
    let request = {
      method: "get",
      url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${workSheetName}?majorDimension=COLUMNS`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };
    let workSheetResponse = await axios(request);
    console.log(workSheetResponse);
     let array = workSheetResponse.data.values;
    
     if(array && array.length)
     {
       array=array[0];
     
        array.sort((a,b)=>{return a-b});
        console.log(array);
        let l=0,r=array.length-1;
        while(l<=r)
        {
          if(l!=array[l])
          {
            return l;
          }
          let m=Math.floor((l+r)/2);
          //console.log(m,array[m]);
          if(m==array[m])
          {
            l=m+1;
          }else{
            r=m-1;
          }
          //console.log(l);
        }
        return l;
     }else{
       return 0;
     }
  }catch(err)
  {
     console.log(err);
     
  }
}
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
       let lucrare = await findMinLucrare(workSheetName,sheetId,token);
       console.log(lucrare);
       values[0][0]=lucrare;
       let isDuplicate = false;
       let len=0;
       let str2=values[0].join("*");
       str2 = str2.substring(str2.indexOf("*")+1);
       if(array && array.length)
       {
        array.map(async(row,index)=>{
          // console.log(row[13],values[0][13]);
          let str1=row.join("*");
          str1 = str1.substring(str1.indexOf("*")+1);
         
          console.log(str1);
          console.log(str2);
          if(str1==str2)
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
