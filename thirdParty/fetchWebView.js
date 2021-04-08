const axios = require("axios");
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetchWebView = async (req, res, next) => {
  try {
    let { a = "2277", y = "2021", b = "83002" } = req.query;
    let options = {
      method: "get",
      url: `http://www.ancpi.ro/aplicatii/urmarireCerereRGI/apptrack.php?b=${b}&y=${y}&a=${a}`,
      headers: {
        "Content-Type": "application/json"
      }
    };
    // try {
    let response = await axios(options);
    // console.log(response.data);
    dom = new JSDOM(`${response.data}`);
    document = dom.window.document
    element = document.querySelector('table');
     
    
     var json={};
     
    var obj=[];
     x = document.querySelectorAll('td');
     //console.log(x[0].textContent);
    
     for(i=0;i<x.length;i++)
     {
       obj.push(x[i].textContent);
     }
   //console.log(obj[1]);
  
   for(i=0;i<x.length;i+=2)
   {
      json[obj[i]]=obj[i+1];
   }
   console.log(json);

       res.json({
      data: json,htmlEntity:response.data
    });
  } catch (error) {
     res.status(400).json({
       data:error.message
     })
    console.log(error);
  }
};

exports.fetchWebView = fetchWebView;
