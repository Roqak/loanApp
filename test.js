let users = [];
let loans = [
    {
        id: 0,
        name: "Ren money",
        Description: "Salary Earners Discounted loan",
        intrestRate: 3,
        amount: 50000,
        tenure: 18
    },
    {
        id: 1,
        name: "Kia Kia",
        Description: "Easy Small Loan",
        intrestRate: 5,
        amount: 5000,
        tenure: 3
    }
];

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./index');
let should = chai.should();

let token = "";

chai.use(chaiHttp);
//Our parent block
describe('LOAN', () => {
    beforeEach((done) => { //Before each test we empty the database
        users = [];
        done();
    });


  describe('/POST user', () => {
    it('it should POST the details of a user and return it', (done) => {
        let newUser = {
            id: 10,
            name: "Akinkunmi",
            password: "akinkunmi",
            email: "akin@gmail.com"
        };
      chai.request(server)
          .post('/user')
          .send(newUser)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                
            done();
          });
    });

   
});
describe('/POST login', () => {
    it('it should POST the details of a user and login', (done) => {
        let newUser = {
            name: "Akinkunmi",
            password: "akinkunmi",
        };
      chai.request(server)
          .post('/login')
          .send(newUser)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                token = res.body.token;
                // console.log(res.body.token)
            done();
          });
    });


});

/*
  * Test the /GET route
  */
 describe('/GET loan', () => {
    it('it should GET all the loans available', (done) => {
      chai.request(server)
          .get('/loan')
          .set('Authorization', token)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
          });
    });


    

    
});
describe('/POST apply', () => {
    it('it should apply for new loan', (done) => {
        let newApplication = {
            id: 4,
            userId: 1,
            loan: 0
        };
      chai.request(server)
          .post('/apply/0')
          .set('Authorization', token)
          .set('Cookie', 'user='+newApplication)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('loan');
            done();

          });
    });


});
});
