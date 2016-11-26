// Integration testing for the REST service restaurants.

var chai = require('chai')
  , chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);


chai.request('http://localhost:3000/restaurants/v1/burgers/Bern')
  .get('/')
  .end(function (err, res) {
       res.should.be.json;
       res.should.have.status(200);
       res.body.should.be.a('array');
       res.body[0].should.have.property('_id');
       res.body[0].should.have.property('name');
       res.body[0].should.have.property('website');
       res.body[0].name.should.equal('Kung Fu Burger');
    });

  