const axios = require("axios");

const isLucrareExists= async(req,res,next)=>{
    let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  let { sheetId, workSheetName,lucrare } = req.body;

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
   // console.log(workSheetResponse);
     let array = workSheetResponse.data.values;
    
     if(array && array.length)
     {
       array=array[0];
       let idx = array.findIndex((a)=>{return a==lucrare});
       if(idx==-1)
       {
        res.status(200).json({
            data:false
        }); 
       }else{
        res.status(200).json({
            data:true
        });
       }
        
     }else{
        res.status(200).json({
            data:false
        }); 
     }
  }catch(err)
  {
     res.status(400).json({data:err});
     
  }
}
exports.isLucrareExists=isLucrareExists;