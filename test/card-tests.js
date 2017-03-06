var expect = require('chai').expect;
var supertest = require('supertest');
var server = require('../server/app-server');
var Card = require('../server/models').card;

describe('Card Test', () => {

  it("/api/card should respond with 81 card objects'", (done) => {
    supertest(server)
      .get('/api/card')
      .end((err, res) => {
        const random = Math.floor(Math.random() * (res.body.length - 1))
        expect(res.body.length).equal(81);
        expect(res.body[random].card).be.a('number')
        expect(res.body[random].number).be.a('number')
        expect(res.body[random].color).be.a('string')
        expect(res.body[random].shade).be.a('string')
        expect(res.body[random].shape).be.a('string')
        
        //done is required in order to execute the test
        done();
      })
  });
});
