'use strict';
const views = require('co-views');
const parse = require('co-body');

const render = views(__dirname + '/../views'<% if(props.templateEngine == 'Swig') { %>, {map: { html: 'swig' }} <% } %>);

module.exports.home = function *home() {
  this.body = yield render('index<% if(props.templateEngine == "Jade") { %>.jade<% } %>', {title: 'Humble koa generator'});
};