'use strict';
const views = require('co-views');
const parse = require('co-body');
const fs = require('fs');

function read(src) {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
      if(err) return reject(err);
      resolve(data);
    });
  });
};

<% if(koa == 'Koa v1') { %>
module.exports.home = function *home() {
  this.body = yield read('./views/index.html', {
<% } else { %>
module.exports.home = async function home() {
  this.body = await read('./views/index.html', {
<% } %>
  	title: 'Humble koa app'
  });
};