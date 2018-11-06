let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let Book = require('../../models/books');
let students = require('../../models/students');
let borrow_record = require('../../models/borrow_record');

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));
describe('Library',  () => {
    beforeEach(function(){
        var book1 = new Book();
        book1.book_name = "Time Book";
        book1.author = "One Interesting Person";
        book1.publishing = "Time Press";
        var book2 = new Book();
        book2.book_name = "Space Book";
        book2.author = "One Sleeping Person";
        book2.publishing = "Space Press";
        var book3 = new Book();
        book3.book_name = "World Book";
        book3.author = "One Walking Person";
        book3.publishing = "World Press";
        book1.save();
        book2.save();
        book3.save();
    });
    describe.only('GET /books',  () => {
        it('should return all the books of library', function(done) {
            chai.request(server)
                .get('/books')
                .end((err, res) => {
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(3);
                    expect(res.body[0].book_name).to.equal("Time Book");
                    expect(res.body[0].author).to.equal("One Interesting Person");
                    expect(res.body[0].publishing).to.equal("Time Press");
                    done();
                });
        });
    });

    describe.only('GET /books',  () => {
        it('should return the books with correct id', function(done) {
            chai.request(server)
                .get('/books')
                .end((err, res) => {
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(3);
                    expect(res.body[0].book_name).to.equal("Time Book");
                    expect(res.body[0].author).to.equal("One Interesting Person");
                    expect(res.body[0].publishing).to.equal("Time Press");
                    done();
                });
        });
    });

    describe('POST /donations', function () {
        it('should return confirmation message and update datastore', function(done) {
            let donation = {
                paymenttype: 'Visa' ,
                amount: 1200,
                upvotes: 0
            };
            chai.request(server)
                .post('/donations')
                .send(donation)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Donation Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/donations')
                .end(function(err, res) {
                    let result = _.map(res.body, (donation) => {
                        return { paymenttype: donation.paymenttype,
                            amount: donation.amount };
                    }  );
                    expect(result).to.include( { paymenttype: 'Visa', amount: 1200  } );
                    done();
                });
        });  // end-after
    }); // end-describe

    describe('PUT /donations/:id/votes', function () {
        it('should return a message and the donation upvoted by 1', function(done) {
            chai.request(server)
                .put('/donations/1000001/vote')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let donation = res.body.data ;
                    expect(donation).to.include( { id: 1000001, upvotes: 3  } );
                    done();
                });
        });
        it('should return a 404 and a message for invalid donation id', function(done) {
            chai.request(server)
                .put('/donations/1100001/vote')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','Invalid Donation Id!' ) ;
                    done();
                });
        });
    });

    describe('DELETE /donations/:id/votes', function () {
        it('should return a message that deleting successfully and the deleted donation', function(done){
           chai.request(server)
               .delete('/donations/1000001')
               .end(function(err, res) {
                   let donation = res.body.data ;
                   expect(res.body).to.have.property('message','Donation Successfully Deleted!' );
                   expect(donation).to.include( { id: 1000001} );
                   done();
               });
        });
        it('should return a message that deleting false for invalid donation id', function(done){
            chai.request(server)
                .delete('/donations/1100001')
                .end(function(err,res){
                    expect(res.body).to.have.property('message','Donation NOT DELETED!' ) ;
                    done();
                });
        });
    });
    afterEach(function(done){
        Book.collection.deleteMany();
        done();
    });


});
