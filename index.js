require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const googleAction = require("./google");
const thirdParty = require("./thirdParty");
const cors = require("cors");
const sheetIdManger = require("./Routes/sheetIdManager");

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "PUT" , "DELETE"],

  allowedHeaders: ["Content-Type"]
};

app.use(cors());

//mongoose


mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on("error", function(err) { console.error(err) });
db.once("open", function() { console.log("Connected to Mongoose") });


app.use("/api",sheetIdManger);





app.get("/api/lists", (req, res, next) => {
  let apis = [
    {
      endPoint: "/permission",
      method: "GET",
      description:
        "Ask permission to user for accessing his/her drive and sheet file, which return auth code that we need to obtain access token",
      notes: ""
    },
    {
      endPoint: "/token",
      method: "POST",
      description:
        "Pass code in this api which will give you access token , refresh token and expires time. store access token in local storage or some where to use in future",
      notes: ""
    },
    {
      endPoint: "/sheets",
      method: "GET",
      description: "It will give all sheet from your drive",
      notes: "pass token to header as Authorization: Bearer <token>"
    },
    {
      endPoint: "/ocpilist",
      method: "GET",
      description: "It will give you ocpi list",
      notes: ""
    },
    {
      endPoint: "/bcpilist",
      method: "GET",
      description: "It will give you bcpi list",
      notes: "pass oid as query param to get realted data EX: ?oid=10"
    }
  ];
  res.json({
    message: "List of end Points",
    data: apis
  });
});
app.get("/api", (req, res, next) => {
  console.log(req.query);
  res.json({
    message: "first app",
    data: req.query
  });
});

app.get("/api/permission", googleAction.authPermission.authPermission);
app.post("/api/token", googleAction.sendToken.sendToken);
app.post("/api/newtoken",googleAction.sendNewToken.sendNewToken);
app.get("/api/sheets", googleAction.getAllSheets.getAllSheets);
app.post("/api/sheets", googleAction.createSheet.createSheet);
app.get("/api/work/sheets", googleAction.fetchWorkSheets.fetchWorkSheets);
app.post(
  "/api/work/sheets/rowslist",
  googleAction.fetchWorkSheetRows.fetchWorkSheetRows
);
app.post("/api/work/sheets/rows", googleAction.appendRow.appendRow);
app.put("/api/work/sheets/rows", googleAction.updateRecord.updatedRecord);
app.delete("/api/work/sheets/rows",googleAction.deleteRow.deleteRow);
app.post("/api/statistics/count",googleAction.countTrackNumber.countTrackNumber);
app.post("/api/statistics/record",googleAction.fetchStatisticsRecord.fetchStatisticsRecord);

app.get("/api/ocpilist", thirdParty.fetchOcpiList.fetchOcpiList);
app.get("/api/bcpilist", thirdParty.fetchBcpiList.fetchBcpiList);
app.get("/api/webview", thirdParty.fetchWebView.fetchWebView);
app.put("/api/sync",thirdParty.syncRecord.syncRecord);

app.use(express.static('./dist/queryparams'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/queryparams/'}),
);

app.listen(process.env.PORT, () => {
  console.log("server listing at port", process.env.PORT);
});
  