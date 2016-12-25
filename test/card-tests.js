var expect = require('chai').expect;
var supertest = require('supertest');
var server = require('../server/app-server');
var Card = require('../server/models').card;

describe('Card Test', () => {

  it("'/api/card' should respond with 81 card objects'", (done) => {
    supertest(server)
      .get('/api/card/')
      .end((err, res) => {
        expect(res.body.length).equal(81);
        expect(res.body[0].card).be.a('number')
        expect(res.body[0].number).be.a('number')
        expect(res.body[0].color).be.a('string')
        expect(res.body[0].shade).be.a('string')
        expect(res.body[0].shape).be.a('string')
        
        //done is required in order to execute the test
        done();
      })
  });
});