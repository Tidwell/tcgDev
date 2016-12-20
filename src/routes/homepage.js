var config = require('../../config');
var express = require('express');
var router = express.Router();

const snoowrap = require('snoowrap');
const cheerio = require('cheerio');
const moment = require('moment');
const pluralize = require('pluralize');

var defaultThumb = 'https://b.thumbs.redditmedia.com/Lyn50YX0hUbIoHFkN5ctDy3y4lQNZXoNvuJlwVuMIbY.jpg';
var r = new snoowrap(config.reddit);

var NOW = moment();

router.get('/', function(req, res) {
	var newsItems = [];

	r.getHot('digitalccg').then(content => {
		content.forEach((item) => {
			if (item.stickied) { return; }
			const img = (item.thumbnail === 'default' || item.thumbnail === 'self') ? defaultThumb : item.thumbnail;
			const comments = item.num_comments ? pluralize('comment', item.num_comments, true) : null;
			newsItems.push({
				img: img,
				title: item.title,
				url: item.url,
				created: moment(new Date(0).setUTCSeconds(item.created_utc)).fromNow(),
				comments: comments,
				commentLink: 'http://www.reddit.com/' + item.permalink
			});
		});
		
		res.render('index', {
			newsItems: newsItems,
			homeActive: true
		});
	});
});

module.exports = router;