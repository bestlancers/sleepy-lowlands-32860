const axios = require("axios");




const syncRecord = async (req, res, next) => {
  let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  let { sheetId, workSheetName} = req.body;
  var isUpdated = false;
   const changeBool = ()=>
   {
      isUpdated=true;
   }
   
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

     
       array.map(async(row,index)=>{
          
           index +=1;
            var a=row[16];
            var b=row[22];
            var y=row[15];
           

            if(a&&b&&y)
            {

            
            let webview = {
              method: "get",
              url: `https://claudiu.xyz/api/webview?a=${a}&b=${b}&y=${y}`,
             
            };
            try{
               let webviewResponse = await axios(webview);
                console.log(JSON.stringify(webviewResponse.data.data));
                if(JSON.stringify(webviewResponse.data.data)!='{}')
                {
                  obj = webviewResponse.data.data;
               console.log(obj);
                    row[17]=obj['Data înregistrare:'];
                    row[18]=obj['Termen soluționare:'];
                    row[19]=obj['Obiectul cererii:'];
                    row[20]=obj['Stare curentă:'];
                    rows = [];
                    rows.push(row);
                    console.log(row);
    
                   
                    SheetName = workSheetName+"!A"+index;
                   // console.log(workSheetName);
                    let options = {
                      method: "put",
                      url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${SheetName}?includeValuesInResponse=true&responseDateTimeRenderOption=SERIAL_NUMBER&responseValueRenderOption=FORMATTED_VALUE&valueInputOption=RAW&`,
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                      },
                      data: JSON.stringify({ values: rows, majorDimension: "ROWS" })
                    };
                    // console.log(options);
                     try {
                    let workSheetResponse = await axios(options);
                   // console.log(workSheetResponse)
                     changeBool();
                    
                   
                  }catch(err)
                  {
                   
                   //console.log(err.message);
                    res.status(err.response.status).json({
                      data:err
                    })
                  }
                
                }
               
               }
            catch(err)
            {
              
               // console.log(err.message);
                res.status(400).json({
                  data:err
                })
            }
          }else{
            changeBool();
          }
         
           
          
       // console.log(index,array.length,isUpdated);
      if(index==array.length && isUpdated)
      {
        res.json({
          data:"updated successfully"
        })
      } 
          
       })
      }else{
        res.json({
          data:"empty sheet"
        })
      }
     
    
  } catch (error) {
    
   // console.log(error.message);
    res.status(400).json({
      data:error
    })
    
  }

  

  
};

exports.syncRecord = syncRecord;
