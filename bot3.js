//stream
console.log('initiating stream bot');

let Twit = require('twit');
let config = require('./config');
let T = new Twit(config);

//setup a user stream
let stream = T.stream('user');

//anytime someone follows me
stream.on('follow',followed);

function followed(eventMsg){
	console.log('follow event');
	let name = eventMsg.source.name;
	let screenName = eventMsg.source.screen_name;

	tweetIt('hey @' + screenName + ' thanks for following!');
}


function tweetIt(msg) {
	let tweet = {
		status: msg
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		if (err) {
			console.log('something went wwrong!');
		}
		else {
			console.log('it worked!');
			console.log('tweet: '+tweet.status)
		}
	}
}
