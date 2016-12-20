var config = require('./config');
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'express-handlebars');
app.engine('.hbs', exphbs({
	defaultLayout: 'default',
	extname: '.hbs',
	helpers: {
		toJSON: function(object) {
			return JSON.stringify(object, null, 4);
		}
	}
}));
app.set('view engine', '.hbs');

var routes = require('./src/routes');

app.use(routes);

app.use(function (req, res, next) {
	res.status(404).render('404', { user: req.user });
});

function errorHandler (err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
app.use(errorHandler);

app.listen(config.port, function() {
	console.log('App listening on port ' + config.port);
});