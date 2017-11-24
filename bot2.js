//post
console.log('initiating bot');

let Twit = require('twit');

let config = require('./config');
// console.log(config);
let T = new Twit(config);

function tweetIt() {
	let r = Math.floor(Math.random()*100);
	let tweet = {
		status: 'random number: ' +r + ' #codingRainbow from node.js'
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

tweetIt();
setInterval(tweetIt,1000*20)
