'use strict';
const path = require('path');
const express = require('express');
const app = express();
const argv = require('yargs').argv;
const port = argv.port || 8080;
app.set('view engine','pug');
app.get(/\/$/, function (req, res, next) {
    res.render(path.resolve(__dirname,'../html'+req.path+'index.pug'), function(err, html) {
        if (err) {
            console.log(err);
            next();
        }
        else {
            res.send(html);
        }
    });
});
app.use(express.static(path.resolve(__dirname,'../html')));
app.listen(port);

