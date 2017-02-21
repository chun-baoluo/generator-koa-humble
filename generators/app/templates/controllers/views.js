'use strict';
const views = require('co-views');
const parse = require('co-body');
const nunjucks = require('nunjucks');
nunjucks.configure(__dirname + '/../views', {
  tags: {
    variableStart: '{$',
    variableEnd: '$}',
  }
});

const render = views(__dirname + '/../views', {map: { html: 'nunjucks' }});

module.exports.home = function *home() {
  this.body = yield render('index.html', {
  	title: 'Humble koa app'
  });
};