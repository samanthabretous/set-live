var expect = require('chai').expect;
var supertest = require('supertest');
var server = require('../server/app-server');
var Game = require('../server/models').game;

describe('Game Test', () => {

  it("'/api/game' should respond with game objects'", (done) => {
    supertest(server)
      .get('/api/game')
      .end((err, res) => {
        expect(res.body[0].room).be.a('string')
        expect(res.body[0].board).be.a('object')

        //done is required in order to execute the test
        done();
      })
  });


  it("'/api/game/:id' should respond with game objects'", (done) => {
    supertest(server)
      .get('/api/game/:id')
      .end((err, res) => {
        expect(res.body.id).to.eql(1)
        expect(res.body.card.length).to.eql(81)

        //done is required in order to execute the test
        done();
      })
  });
});