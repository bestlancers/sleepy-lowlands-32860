const { google } = require("googleapis");
let OAuth2 = google.auth.OAuth2;

let SHEET_CLIENT_ID = process.env.CLIENT_ID;
let SHEET_CLIENT_SECRET = process.env.CLIENT_SECRET;
let SHEET_REDIRECT_URL = process.env.OLD_SHEET_REDIRECT_URL;
 let oauth2ClientForSheet = new OAuth2(
  SHEET_CLIENT_ID,
  SHEET_CLIENT_SECRET,
  SHEET_REDIRECT_URL
);
const axios = require("axios");
const { omit } = require("lodash");
const sendToken = async (req, res, next) => {
  try {
    let type = "authorization_code";

    let redirectURL = SHEET_REDIRECT_URL;
    let client_id = SHEET_CLIENT_ID;
    let client_secret = SHEET_CLIENT_SECRET;
    let redirect_uri = redirectURL;
    let code = req.body.code;
    console.log(code);
    let codeType = `code=${code}`;
    let grant_type = `grant_type=${type}`;
    let url = `https://oauth2.googleapis.com/token?${codeType}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&${grant_type}`;
    let options = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

   // console.log("options>>>>", options);
    let apiResponse = await axios(options);
   console.log(apiResponse.data);
   const token = apiResponse.data.id_token;
   console.log(token);
   const base64String = token.split(".")[1];
   const decodedValue = JSON.parse(Buffer.from(base64String,    
                        "base64").toString("ascii"));
                
   console.log(decodedValue.email,decodedValue.name);
    apiResponse = omit(apiResponse.data, ["scope", "id_token", "token_type"]);
    apiResponse["name"]=decodedValue.name;
    apiResponse["email"]=decodedValue.email;

     res.json({
      data: apiResponse
      
    });
   
  } catch (error) {
    res.status(400).json({
      data:error
    })
    console.log(error);
  }
};

exports.sendToken = sendToken;
