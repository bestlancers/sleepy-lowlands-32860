const axios = require("axios");

const countTrackNumber = async (req, res, next) => {
  let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  let { year,sheetId,workSheetName} = req.body;
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
        let filteryear = array.filter((row)=> {return row[15]===year});
        if(filteryear && filteryear.length)
        {
            let filteradmitere = filteryear.filter((row)=>{  return row[20].toUpperCase()=='SOLUTIONATA - ADMITERE'});
            let filterRespingere = filteryear.filter((row)=>{ return row[20].toUpperCase()== 'SOLUTIONATA - RESPINGERE'});
          // console.log(filteryear,filteradmitere,filterRespingere)
            let c1 = filteradmitere?filteradmitere.length:0;
            let c2 = filterRespingere?filterRespingere.length:0;
            res.json({
                admitere:c1,
                respingere:c2,
            })
        }
        else{
            res.json({
                admitere:0,
                respingere:0
            })
        }
       
    }else
    {
        res.json({
            admitere:0,
            respingere:0
        })
    }
   
    
  } catch (error) {
    res.status(400).json({
      data:error
    })
    console.log(error);
  }
};

exports.countTrackNumber = countTrackNumber;
