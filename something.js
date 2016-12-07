var squel = require("squel");
var mysql = require("mysql");
var express = require("express");

var app = express();

var queryCount = 0;
var count = 0;



/*
con.query('SELECT * FROM hurricane_data where YEAR(YYYYMMDDHH) = 1945' and LATNS < 
,function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
}); 
*/

//con.query(Select CY  from hurricane_data where YEAR(YYYYMMDDHH) = 1945 AND LATNS > -70 AND 
//LATNS < -30 
//AND LONEW > 680 AND LONEW < 700,function(err,rows){
//  if(err) throw err;

 // console.log('Data received from Db:\n');
  //console.log(rows);
//});

//Select YYYYMMDDHH, STORMNAME, LATNS, LONEW from fromhurricane_data where YEAR(YYYYMMDDHH) = 1945 AND CY = ANY (Select CY from hurricane_data where YEAR(YYYYMMDDHH) = 1945 AND LATNS > -80 AND LATNS < -60 AND LONEW > 680 AND LONEW < 700);

//Select t.YYYYMMDDHH, t.STORMNAME, t.LATNS, t.LONEW from (Select * from hurricane_data where YEAR(YYYYMMDDHH) = 1945 AND LATNS > -80 AND LATNS < -60 AND LONEW > 680 AND LONEW < 700) as t;

//Select t2.YYYYMMDDHH, t2.STORMNAME, t2.LATNS, t2.LONEW from(Select t.YYYYMMDDHH, t.STORMNAME, t.LATNS, t.LONEW, t.CY from
var entry = [];
var exit;
var path = []; 
var con = mysql.createConnection({
  host: "146.148.34.167",
  user: "root",
  password: "",
  database: "TyphoonVisual"
  
});
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});
function makequeries(arr, someFun){


   con.connect(function(err){
      if(err){
         console.log('Error connecting to Db');
         return;
      }
      console.log('Connection established');
   });

   con.query('Select Distinct CY  from hurricane_data where YEAR(YYYYMMDDHH) = ? AND LATNS > ? AND LATNS < ? AND LONEW > ? AND LONEW < ?', arr, function(err,rows){
      if(err) throw err;
         console.log("Cy Count successful");
         console.log(rows);
         someFun(rows,arr)
      //console.log(rows);
   });

}
function loopCallBack(cyArr, input, callback){
   arr =input;
   console.log(cyArr[cyArr.length - 1]);
   arr.push();
   queryCount = cyArr.length;
   for(i = 0; i < cyArr.length;i++){
   arr[5] = cyArr[i].CY;
   //console.log("CY is");
   console.log(cyArr[i].CY)
   con.query('Select t2.YYYYMMDDHH, t2.STORMNAME, t2.LATNS, t2.LONEW from(Select t.YYYYMMDDHH, t.STORMNAME, t.LATNS, t.LONEW, t.CY from (Select *  from hurricane_data where YEAR(YYYYMMDDHH) = ? AND LATNS > ? AND LATNS < ? AND LONEW > ? AND LONEW < ?) as t Where t.CY = ?) as t2 order by t2.YYYYMMDDHH asc limit 1',arr ,function(err,rows){
      if(err) throw err;
       //  console.log('Data received from Db:\n');

      console.log(rows);
 
      callback(++count, rows);
   });

}
/*
   con.query('Select t2.YYYYMMDDHH, t2.STORMNAME, t2.LATNS, t2.LONEW from(Select t.YYYYMMDDHH, t.STORMNAME, t.LATNS, t.LONEW, t.CY from (Select * from hurricane_data where YEAR(YYYYMMDDHH) = ? AND LATNS > ? AND LATNS < ? AND LONEW > ? AND LONEW < ?) as t Where t.CY = ?) as t2 order by t2.YYYYMMDDHH desc limit 1',arr ,function(err,rows){
   if(err) throw err;

     console.log('Test Data received from Db:\n');
      console.log(rows);
      exitFun(rows);
   });*/


}


app.get('/get/location/lowLat/:LowLat/HighLat/:HighLat/lowLong/:lowLong/highLong/:highLong/year/:year',function(req,res){
   var lowLat = req.params.LowLat * 10;
   var highLat = req.params.HighLat *10;
   var lowLong = req.params.lowLong * 10;
   var highLong = req.params.highLong * 10;
   var year = req.params.year;
   arr = [year, lowLat, highLat, lowLong,highLong];
   console.log(arr);
   makequeries(arr,function(rows, arr){
      loopCallBack(rows, arr, function(current, result){
         entry.push(result);
         if(queryCount === current){
         console.log(current);
         console.log("complete");
        // con.end();

         console.log(entry)
         res.send(entry);
         }
   })
   });

});

function entryFun(rows){
   entry = rows[0];
   console.log(rows[0]);
   one = true;
   return entry;
}
function exitFun(rows){
   exit = rows[0];
   two = true;
   return exit;
}

app.get('/',function(){
   console.log("GET");
   var html = 
   });

var server = app.listen(process.env.PORT || 5000, function () {
   console.log(process.env.port);
});

/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Apache!\n');
}).listen(8080)
*/

/*
makequeries([2015, -90, -70, 1495, 1695],function(rows, arr){
      loopCallBack(rows, arr, function(current){
         if(queryCount === current){
         console.log(current);
         console.log("complete");
         con.end();
         }
   })
   });*/

/*
Select t2.YYYYMMDDHH, t2.STORMNAME, t2.LATNS, t2.LONEW from(Select t.YYYYMMDDHH, t.STORMNAME, t.LATNS, t.LONEW, t.CY from (Select * from hurricane_data where YEAR(YYYYMMDDHH) = 1945 AND LATNS > -80 AND LATNS < -60 AND LONEW > 680 AND LONEW < 700) as t Where t.CY = 1) as t2 order by t2.YYYYMMDDHH desc limit 1;

*/
