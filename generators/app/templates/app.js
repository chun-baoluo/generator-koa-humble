'use strict';
const views = require('./controllers/views');
const users = require('./controllers/users');
const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const router = new (require('koa-router'))();
const Koa = require('koa');
const path = require('path');
const app = module.exports = <% if(props.koa == 'Koa v2') { %> new <% } %> Koa();

app.keys = ['here-will-be-your-keys-and-nothing-else'];

// Logger
app.use(logger());

// Body parse & Session
app.use(users.bodyParser());
app.use(users.session());

// Passport
app.use(users.passport.initialize());
app.use(users.passport.session());

// Routes
router.get('/', views.home);
router.get('/users', users.routes.users);
router.get('/logout', users.routes.logout);
router.post('/auth/user', users.passport.authenticate('user', { successRedirect: '/success', failureRedirect: '/fail'}));

// Serve files
app.use(serve(path.join(__dirname, 'public')));

app.use(router.middleware());

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(7777);
  console.log('Listening on port 7777');
}
