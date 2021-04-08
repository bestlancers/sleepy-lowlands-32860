
let SHEET_CLIENT_ID = process.env.CLIENT_ID;
let SHEET_CLIENT_SECRET = process.env.CLIENT_SECRET;

 
const axios = require("axios");
const { omit } = require("lodash");
const sendNewToken = async (req, res, next) => {
  try {

    let type = "refresh_token";
    let client_id = SHEET_CLIENT_ID;
    let client_secret = SHEET_CLIENT_SECRET;
    let refreshToken = req.body.refreshToken;
    let grant_type = `grant_type=${type}`;
    let url = `https://oauth2.googleapis.com/token?client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refreshToken}&${grant_type}`;
    let options = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

   // console.log("options>>>>", options);
    let apiResponse = await axios(options);
   
     apiResponse = omit(apiResponse.data, ["scope","token_type","id_token"]);
     
     
      console.log(apiResponse);
     res.json({
      data: apiResponse,
      
    });
   
  } catch (error) {
    res.status(400).json({
      data:error
    })
    console.log(error);
  }
};

exports.sendNewToken = sendNewToken;
