// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

//heroku redis:cli -a dan-home-app -c dan-home-app

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type');
    next();
});

var port = process.env.PORT || 80;        // set our port

var router = express.Router();
router.get('/', function(req, res) {
       res.send(dothing(req));
});

app.use('/api', router);

app.use('/static', express.static("public"));

app.listen(port);




//from https://leccy.net/

function blah(a, t) {
		return a < t ? a : t
}    
function blah2(a) {
    var t = Math.floor(a), //hours
        e = blah3(60 * a % 60, 0); //minutes
    return ((t*60)+e)+" minutes";
}    
function blah3(a, t) {
    var e = Math.pow(10, t);
    return Math.round(a * e) / e
}
function dothing(req) {
	var resultStartPercentage = req.query.start; //50;
	var resultEndPercentage = req.query.end; //100;

	var resultBatterySize = 75;
	var resultOutletCurrentType = 'ac';
	var resultCarChargeRateDc  = 200;
	var resultCarChargeRateAc = 11.5;
	var resultOutletRate = 9.6;
	var resultOutletEfficiency = 0.95;
	
	var e = parseFloat(resultBatterySize) * ((parseFloat(resultEndPercentage) - parseFloat(resultStartPercentage)) / 100);
	var t = "dc" == resultOutletCurrentType ? parseFloat(resultCarChargeRateDc) : parseFloat(resultCarChargeRateAc);
	var a = blah(t, parseFloat(resultOutletRate));
  var r = e / a;
  
  var l = parseFloat(resultOutletRate) * parseFloat(resultOutletEfficiency);
  a = blah(t, l);
  
  var o = -.1836 * (a > 50 ? 50 : a) + 10.1836,
      c = -.31 * Math.log10(1 - parseFloat(resultStartPercentage) / 100),
      n = -.31 * Math.log10(1 - (100 == parseFloat(resultEndPercentage) ? 99 : parseFloat(resultEndPercentage)) / 100),
      i = -.31 * Math.log10(1 - .99),
      v = c / i,
      $ = n / i,
      g = parseFloat(resultBatterySize) / a,
      m = g / 100 * parseFloat(resultStartPercentage),
      C = g / 100 * parseFloat(resultEndPercentage),
      f = m + m * (v / o * 2),
      b = C + C * ($ / o * 2),
      y = b - f;
      
	return blah2(y);
}