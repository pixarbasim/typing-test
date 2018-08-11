
function getRandomFeed(feedItems) {
	const min = 0, max = feedItems.length-1
	const randomFeedIndex = Math.round(Math.random() * (max - min) + min);

    return feedItems[randomFeedIndex]
}

$(document).ready(function() {

	var feed = 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms';

	$.ajax({
	  type: 'GET',
	  url: "https://api.rss2json.com/v1/api.json?rss_url=" + feed,
	  dataType: 'jsonp',
	  success: function(data) {

		const textToType = getRandomFeed(data.items).description;
		root.textToType = textToType
	  }
	});
});


const keys = {
	row0: [
		{ key: '`', 'shift-key': '~' },
		{ key: '1', 'shift-key': '!' },
		{ key: '2', 'shift-key': '@' },
		{ key: '3', 'shift-key': '#' },
		{ key: '4', 'shift-key': '$' },
		{ key: '5', 'shift-key': '%' },
		{ key: '6', 'shift-key': '^' },
		{ key: '7', 'shift-key': '&' },
		{ key: '8', 'shift-key': '*' },
		{ key: '9', 'shift-key': '(' },
		{ key: '0', 'shift-key': ')' },
		{ key: '-', 'shift-key': '_' },
		{ key: '=', 'shift-key': '+' },
		{ key: 'Backspace' }
	],
	row1: [
		{ key: 'Q' },
		{ key: 'W' },
		{ key: 'E' },
		{ key: 'R' },
		{ key: 'T' },
		{ key: 'Y' },
		{ key: 'U' },
		{ key: 'I' },
		{ key: 'O' },
		{ key: 'P' },
		{ key: '[', 'shift-key': '{' },
		{ key: ']', 'shift-key': '}' },
		{ key: '\\', 'shift-key': '|' }
	],
	row2: [
		{ key: 'A' },
		{ key: 'S' },
		{ key: 'D' },
		{ key: 'F' },
		{ key: 'G' },
		{ key: 'H' },
		{ key: 'J' },
		{ key: 'K' },
		{ key: 'L' },
		{ key: ';', 'shift-key': ':' },
		{ key: "'", 'shift-key': '"' },
		{ key: 'Enter' }
	],
	row3: [
		{ key: 'Z' },
		{ key: 'X' },
		{ key: 'C' },
		{ key: 'V' },
		{ key: 'B' },
		{ key: 'N' },
		{ key: 'M' },
		{ key: ',', 'shift-key': '<' },
		{ key: '.', 'shift-key': '>' },
		{ key: '/', 'shift-key': '?' },
		{ key: 'Shift' }
	]
}

Vue.component('keyboard-key', {
	props: ['key_value', 'keyboardClass'],
	template:
		'<button :key="key_value" :id="key_value" :class="keyboardClass"> <div class="main-key">{{key_value}}</div> </button>'
})

var root = new Vue({
	el: '#root',
	data: {
		textToType:
			'Loading text to type...',
		userInput: '',
		currentWordIndex : 0,
		lastPressedKey: null,
		timer : null
	},
	computed: {
		keyId: function(key) {
			return 'key-' + key.key
		}
	},
	keys: keys,
	result : {
		totalWords : 0,
		correct : 0,
		wrong : 0,
		totalStrokes : 0
	},
	watch: {
		userInput: 'onUserInputChange',
		lastPressedKey: 'setLastPressedKeyNull'
	},
	methods: {
		onUserInputChange: function() {
			// console.log(this.userInput)
		},
		getCurrentWord : function() {
			let words = this.textToType.split(' ');
			return words[currentWordIndex];
		},
		onKeyUp: function(e) {
			const key = e.key.toUpperCase()
			this.lastPressedKey = key

			if(this.$options.result.totalStrokes){
				//start timer

			}
			if(key === ' '){
				const currentWord = this.textToType.split(' ')[this.currentWordIndex]
				const userWord = this.userInput.split(' ')[this.currentWordIndex]
				if(!!currentWord && currentWord == userWord){
					this.$options.result.correct++;
				} else {
					this.$options.result.wrong++;
				}
				this.$options.result.totalWords++;
				this.currentWordIndex++;
				console.log(this.$options.result)
			}
			this.$options.result.totalStrokes++;
		},
		keyClass: function(key) {
			let classNames = 'keyboard-key'
			if (this.lastPressedKey === key.key) {
				classNames += ' pressed'
			}
			return classNames
		},
		setLastPressedKeyNull: function() {
			if (this.timer) {
				clearTimeout(this.timer)
			}
			this.timer = setTimeout(() => {
				this.lastPressedKey = null
			}, 400)
		}
	}
})

window.root = root
