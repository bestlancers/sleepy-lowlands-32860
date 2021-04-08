const { google } = require("googleapis");
let OAuth2 = google.auth.OAuth2;
let SHEET_CLIENT_ID = process.env.CLIENT_ID;
let SHEET_CLIENT_SECRET = process.env.CLIENT_SECRET;
let SHEET_REDIRECT_URL = process.env.OLD_SHEET_REDIRECT_URL;

let oauth2ClientForSheet = new OAuth2(
  SHEET_CLIENT_ID,
  SHEET_CLIENT_SECRET,
  SHEET_REDIRECT_URL,
  
);

const authPermission = async (req, res, next) => {
  let scopes = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ];

  let url = oauth2ClientForSheet.generateAuthUrl({
    access_type: "offline", // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes ,// If you only need one scope you can pass it as string
    prompt:"select_account"
  });

  // return url;
  res.json({
    data: url
  });
  //res.redirect(url);
};

exports.authPermission = authPermission;
