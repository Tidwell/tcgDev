##tcgdev.info

Repo for www.tcgdev.info

##Install
npm install

##Setup
create ``config/index.js`` and fill out

```javascript
module.exports = {
	port: xxxx,
	reddit: {
		userAgent: 'xxx',
		clientId: 'xxx',
		clientSecret: 'xxx',
		username: 'xxx',
		password: 'xxx'
		// refreshToken: 'dont-need-this'
	}
};
```

##Run

``node index.js``