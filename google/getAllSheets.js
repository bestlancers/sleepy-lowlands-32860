const axios = require("axios");

const getAllSheets = async (req, res, next) => {
  let bearer = req.headers.authorization;

  let token = bearer.split(" ")[1];
  try {
    // let token = req.b;

    let searchQuery = "mimeType='application/vnd.google-apps.spreadsheet'";
    let q = encodeURIComponent(searchQuery);
    let fields = encodeURIComponent(
      `files(id, name, trashed, modifiedTime, lastModifyingUser(displayName))`
    );
    let options = {
      method: "get",
      url: `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };
    // console.log(options);
    // try {
    let fileResponse = await axios(options);

    // result = { token: token, files: JSON.parse(fileResponse).files.filter((v) => !v.trashed) };
    fileResponse = fileResponse.data.files.filter(v => !v.trashed);
    res.json({
      data: fileResponse
    });
  } catch (error) {
    res.status(error.response.status).json({
      data:error
    })
    console.log(error);
  }
};

exports.getAllSheets = getAllSheets;
