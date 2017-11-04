'use strict'
const models = require('../models/models.js');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const session = require('koa-generic-session');
const passport = require('koa-passport');
const crypto = require('crypto');
const localStrategy = require('passport-local').Strategy;

function md5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
};

passport.use('user', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, done) => {<% if(objectMapping == 'Mongoose') { %>
    models.user.findOne({
      username: username,
    }).then((user) => {
      if(!user) {
        return done(null, false, {message: "The user does not exist!"});
      } else if(md5(password) != user.password) {
        return done(null, false, {message: "Wrong password!"});
      } else {
        return done(null, {id: user._id, type: 'user'});
      }
    }).error((err) => {
      return done(err);
    });<% } %><% if(objectMapping == 'Sequelize') { %>
      models.users.findOne({
        where: {
          username: username,
        }
      }).then((user) => {
        if(!user) {
          return done(null, false, {message: "The user does not exist!"});
        } else if(md5(password) != user.password) {
          return done(null, false, {message: "Wrong password!"});
        } else {
          return done(null, {id: user.id, type: 'user'});
        }
      }).error((err) => {
        return done(err);
      });<% } %>
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
	if(user.type == 'user') {<% if(objectMapping == 'Mongoose') { %>
    models.user.findById(user.id).then((user) => {
      done(null, {id: user._id, type: 'user'});
    }).error((err) => {
      done(new Error('User ' + user.id + ' does not exist'));
    });<% } %><% if(objectMapping == 'Sequelize') { %>
      models.user.find({
        where: {
          id: user.id
        }
      }).then((user) => {
        done(null, {id: user.id, type: 'user'});
      }).error((err) => {
        done(new Error('User ' + user.id + ' does not exist'));
      });
      <% } %>
  } else {
    done(new Error('Unknown strategy.'));
  }
});

module.exports.routes = {
  logout: async function logout() {
    this.logout();
    this.redirect('/');
  },
  users: async function users() {
    this.body = await models.user.<% if(objectMapping == 'Mongoose') { %>find({})<% } else { %>findAll()<% } %>.then((users) => {
      return users;
    });
  },
  authenticatedUser: async function authenticatedUser(next) {
    if(this.req.isAuthenticated() && this.req.user.type == 'user') {
      await next;
    } else {
      this.redirect('/');
    }
  }
};

module.exports.passport = passport;
module.exports.session = session;
module.exports.convert = convert;
module.exports.bodyParser = bodyParser;
