'use strict';
const assert = require('assert');
const path = require('path');
const express = require('express');
const app = express();
const argv = require('yargs').argv;
const port = argv.port || 8080;
const debug = argv.debug;
if (debug) {
    assert(typeof(debug) == 'string','Debug passcode has to be of type string.');
}
app.set('view engine','pug');
app.get(/\/$/, function (req, res, next) {
    res.render(path.resolve(__dirname, '../html'+req.path+'index.pug'), function(err, html) {
        if (err) {
            console.log(err);
            next();
        }
        else {
            res.send(html);
        }
    });
});
const hasDebugPrivilege = (function () {
    var whiteList = {};
    var f = function (req) {
        var ip = req.ip;
        if (whiteList[ip]) {
            return true;
        }
        if (debug === req.query.EPF_DEBUG) {
            whiteList[ip] = true;
        }
        return whiteList[ip];
    };
    if (debug) {
        return f;
    }
    else {
        return function () {
            return false;
        }
    }
        return debug == req.query.EPF_DEBUG;
})();
app.get(/\.pug$/, function (req, res, next) {
    if (hasDebugPrivilege(req)) {
        next();
    }
    else {
        res.status(403);
        res.end();
    }
});
app.get(/\/[\w\d-]+\.js/, function (req, res, next) {
    console.log(req.query.EPF_DEBUG);
        next();
    if (hasDebugPrivilege(req)) {
    }
    else {
    }
});
app.use(express.static(path.resolve(__dirname,'../html')));
app.listen(port);

