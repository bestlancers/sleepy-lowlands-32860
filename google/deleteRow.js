const axios = require("axios");


const deleteRow = async (req, res, next) => {
  let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  let { sheetId, workSheetName,lucrare} = req.body;
  
 
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
   //console.log(workSheetResponse.data.values)
      let array =  workSheetResponse.data.values;
     
     // console.log(len);
     if(array && array.length)
     {
      var index = array.findIndex((row)=>{return row[0]==lucrare});
      // console.log(index);

         if(index==-1)
         {
             res.json({
               data:"not found"
           })
          }
         else{
         
      
          
            let requests=[];
            requests.push( {
              deleteDimension: {
                range: {
                  dimension: "ROWS",
                  sheetId: 0,
                  startIndex: index,
                  endIndex: index+1
                }
              }
            })
           // console.log(workSheetName);
            let options = {
              method: "POST",
              url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              },
              data: JSON.stringify({requests:requests})
                
              
            };
            // console.log(options);
             try {
            let workSheetResponse = await axios(options);
           
          //console.log(workSheetResponse)
             
           
          return res.json({
                data: workSheetResponse.data
              });
              
          }catch(err)
          {
           // console.log("error"+err);
            res.status(400).json({
              data: err
            });
          }
          }
         
       
      
      }else{
        res.json({
          data:"empty sheet"
        })
      }
      
      
    
  } catch (error) {
    //console.log(error);
   res.status(400).json({
      data: error
    });
  }
};

exports.deleteRow = deleteRow;
