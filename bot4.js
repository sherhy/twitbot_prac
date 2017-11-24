//post generated picture
console.log('initiating bot');

//imports
let Twit = require('twit');
let config = require('./config');
let T = new Twit(config);

let exec = require('child_process').exec;
let fs = require('fs');


function tweetIt() {
	//run processing-java
	let cmd = 'processing-java --sketch=`pwd`/sketch_js --run'
	exec(cmd, function(){
		//read the file made by processing
		let filename = './sketch_js/output.png';
		let params = {
			encoding: 'base64'
		}
		let b64 = fs.readFileSync(filename, params);
		//upload the file
		T.post('media/upload', {media_data: b64}, uploaded);

		function uploaded(err, data, resopnse){
			//actually tweet
			let id = data.media_id_string;
			let r = Math.floor(Math.random()*100);
			let tweet = {
				status: 'random number: ' +r + ' #codingRainbow from node.js',
				media_ids: [id]
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
	});		
}

tweetIt();
// setInterval(tweetIt,1000*20)
