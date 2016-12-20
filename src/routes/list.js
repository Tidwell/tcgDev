var config = require('../../config');
var express = require('express');
var router = express.Router();

const snoowrap = require('snoowrap');
const cheerio = require('cheerio')

var r = new snoowrap(config.reddit);

router.get('/digital-games-list', function(req, res) {
	var listContent = '';

	r.getSubreddit('digitalccg').getWikiPage('dccg_master_list').fetch().then(content => {
		let $ = cheerio.load(content.content_html);

		$('h1, .toc').remove();
		$('table').addClass('table table-striped table-bordered');
		$('tr td:nth-child(2) a').each((i, item) => {
			$(item).attr('href', 'http://www.reddit.com' + $(item).attr('href'));
		});
		$('a').attr('target', '_new');
		listContent = $.html();

		res.render('list', {
			listContent: listContent,
			listActive: true,
			pageTitle: 'Digital CCG List'
		});
	});
});

module.exports = router;