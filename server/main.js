'use strict';
const path = require('path');
const express = require('express');
const app = express();
app.set('view engine','pug');
app.get(/\/$/, function (req, res, next) {
    res.render('../../html'+req.path+'index.pug', function(err, html) {
        if (err) {
            console.log(err);
            next();
        }
        else {
            res.send(html);
        }
    });
});
app.use(express.static('../html'));
app.listen(8080);

