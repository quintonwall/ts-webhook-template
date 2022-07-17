const express = require("express");
const app = express();


//json handling for custom action payload
const bodyParser = require("body-parser")
var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({
   extended:true
}));

// enable CORS so Thoughtspot can connect
const cors = require('cors');
app.use(cors());

// HTTP Methods


//WEBHOOK TO HANDLE POST FROM TSE CUSTOM URL ACTION
app.post("/tse", jsonParser, function(req, res) {
  
   //console.log(req.body);

   if(req.body.hasOwnProperty('__typename')) {
       console.log("Received ThoughtSpot payload of type: "+req.body["__typename"]);
       if(req.body["__typename"] == "ChartViz") {
           //parse data to use in your system
       }
       else if (req.body["__typename"] == "TableViz") {
            //parse data to use in your system

       } else {
           res.status(400).send({
               message: 'Didnt understand typename.'
            });
       }
   } else {
       res.status(400).send({
           message: 'Missing typename.'
        });
   }


   res.sendStatus(200);
});

//RUN SERVICE ON P8000
app.listen(8000, function(){
console.log("server is running on port 8000");
})
