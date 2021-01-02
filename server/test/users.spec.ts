import * as chai from 'chai';
import { after, before, describe, it } from 'mocha';
import chaiHttp = require('chai-http');

import * as server from '../server';

import { User } from '../models/user';
import { testUser, testUserWrongPass } from '../config/seed';

process.env.NODE_ENV = 'test';

const expect = chai.expect;
chai.use(chaiHttp);


describe("POST /register", () => {

  before(function (done) {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  after(function (done) {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  it('should register a new user with valid parameters', (done) => {
    chai
      .request(server)
      .post('/api/v1/users/register')
      .send(testUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should return some defined error message with valid parameters', (done) => {
    chai
      .request(server)
      .post('/api/v1/users/register')
      .send(testUser)
      .end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

});

describe("POST /login", () => {

  before(function (done) {
    chai
      .request(server)
      .post('/api/v1/users/register')
      .send(testUser)
      .end((err, res) => {
        done();
      });
  });

  it('should get a log in user', (done) => {
    chai
      .request(server)
      .post('/api/v1/users/login')
      .send(testUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should return error with error message ', (done) => {
    chai
      .request(server)
      .post('/api/v1/users/login')
      .send(testUserWrongPass)
      .end(function (err, res) {
        expect(res.status).to.equal(401);
        done();
      });
  });

});
