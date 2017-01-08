'use strict';
const superagent = require('supertest');
const app = require('../app');
const request = superagent(app.listen());

describe('Routes', () => {
  describe('GET /', () => {
    it('should return 200', done => {
      request
        .get('/')
        .expect(200, done);
      });
    });<% if(props.objectMapping != 'None') { %>
  describe('GET /logout', () => {
    it('should return 200', done => {
      request
        .get('/logout')
        .expect(302, done);
    });
  });
  describe('GET /users', () => {
    it('should return 200', done => {
      request
        .get('/users')
        .expect(200, done);
      });
  });
  describe('POST /auth/user', () => {
    it('should return 200', done => {
      request
        .post('/auth/user')
        .expect(302, done);
      });
  });<% } %>
});
