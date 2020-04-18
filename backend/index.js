const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const redis = require('redis');
const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000 
});

const { Pool } = require('pg');
const pgClient = new Pool({
	user: keys.pgUser,
	host: keys.pgHost,
	database: keys.pgDatabase,
	password: keys.pgPassword,
	port: keys.pgPort
});

pgClient.on('error', () => console.log('No connection to PG DB'));

pgClient.query('CREATE TABLE IF NOT EXISTS result(number INT)').catch(err => console.log(err));

console.log(keys);

function calculate(req, resp) {
	const {num1, num2, num3} = req.params
	arr = [num1, num2, num3]
	var n = 3;
	var sum = 0;

	arr.map(function(data) {
		sum+=data;
		    
	});

	var mean = sum / n;

	var variance = 0.0;
	var v1 = 0.0;
	var v2 = 0.0;

	if (n != 1) {
		for (var i = 0; i<n; i++) {
			v1 = v1 + (arr[i] - mean) * (arr[i] - mean);
			v2 = v2 + (arr[i] - mean);
		}
		v2 = v2 * v2 / n;
		variance = (v1 - v2) / (n-1);
		if (variance < 0) { variance = 0;  }
		stddev = Math.sqrt(variance);
	}

	redisClient.set(`${num1}+${num2}+${num3}`, stddev)
	resp.send(`std dev = ${stddev}`);
}

function cache(req, resp, next) {
	const {num1, num2, num3} = req.params;
	redisClient.get(`${num1}+${num2}+${num3}`, (err, data) => {
		if(data !== null){
			resp.send(`Cached standard deviation = ${data}`)
		} else {
			next();
		}
	});
}

app.get('/calculate/:num1/:num2/:num3',cache, calculate);

app.get('/', (req, resp) => {
	resp.send('Hello World!!!');
});

app.listen(4000, err => {
	console.log('Server listening on port 4000');
});
