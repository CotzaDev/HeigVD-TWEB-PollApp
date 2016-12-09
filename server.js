var express = require('express');
var app = express();

/* Serve static content and set port */
app.use('/', express.static('dist'));
app.set('port', (process.env.PORT || 5000));

/* Start server and bind port */
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
