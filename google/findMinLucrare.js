const axios = require("axios");

const findMinLucrare= async(req,res,next)=>{
    let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  let { sheetId, workSheetName } = req.body;

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
     
        array.sort((a,b)=>{return a-b});
        console.log(array);
        let l=0,r=array.length-1;
        while(l<=r)
        {
          if(l+1!=array[l])
          {   
             break;
          }
          let m=Math.floor((l+r)/2);
          //console.log(m,array[m]);
          if(m+1==array[m])
          {
            l=m+1;
          }else{
            r=m;
          }
        
        }
        res.status(200).json({
            lucrare:l+1
        });
     }else{
        res.status(200).json({
            lucrare:1
        });
     }
  }catch(err)
  {
     res.status(400).json({data:err});
     
  }
}
exports.findMinLucrare=findMinLucrare;