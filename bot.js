//get
console.log('initiating bot');

let Twit = require('twit');

let config = require('./config');
// console.log(config);
let T = new Twit(config);

let params = {
	q: 'rainbow',
	count: 10
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
	let tweets = data.statuses;
	for (let i = 0; i< tweets.length; i++) {
		console.log(tweets[i].text)
	};
	console.log(data)
};