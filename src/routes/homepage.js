var config = require('../../config');
var express = require('express');
var router = express.Router();

const snoowrap = require('snoowrap');
const cheerio = require('cheerio')

var defaultThumb = 'https://b.thumbs.redditmedia.com/Lyn50YX0hUbIoHFkN5ctDy3y4lQNZXoNvuJlwVuMIbY.jpg';
var r = new snoowrap(config.reddit);

router.get('/', function(req, res) {
	var newsItems = [];

	r.getTop('digitalccg').then(content => {
		content.forEach((item) => {
			var img = (item.thumbnail === 'default' || item.thumbnail === 'self') ? defaultThumb : item.thumbnail;
			newsItems.push({
				img: img,
				title: item.title,
				url: item.url
			});
		});
		
		res.render('index', {
			newsItems: newsItems,
			homeActive: true
		});
	});
});

module.exports = router;