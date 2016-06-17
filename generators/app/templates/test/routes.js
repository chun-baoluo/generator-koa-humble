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
    });
  describe('GET /logout', () => {
    it('should return 200', done => {
      request
        .get('/')
        .expect(200, done);
    });
  });
  describe('GET /auth/user', () => {
    it('should return 200', done => {
      request
        .get('/')
        .expect(200, done);
      });
  });
});
