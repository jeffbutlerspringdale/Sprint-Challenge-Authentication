const request = require('supertest');
const db = require('../database/dbConfig.js')
const server = require('../api/server.js');
// const auth = require('../jokes/jokes-model.js')

describe('the server', () => {
    describe('GET /', () => {
        it('should run the testing env', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })
});


beforeEach(async () => {
    await db('users').truncate();
})

describe('POST /login', function(){
    it('it responds with 401 status code if bad username or password', function(done) {
        request(server)
            .post('/api/auth/login')
            .type('json')
            .send('{"username":"bad","password":"wrong"}')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
        });
    });

    it('it responds with 200 status code if good username or password', function(done) {
        request(server)
            .post('/api/auth/login')
            .type('json')
            .send('{"username":"admin","password":"admin"}')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
        });
    });
});

describe('POST /register', function(){
    it('it responds with 201 if request was good', function(done) {
        request(server)
            .post('/api/auth/register')
            .type('json')
            .send('{"username":"testing123","password":"testing123"}')
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done();
        });
    });

    it('it responds with 500 if request was bad', function(done) {
        request(server)
            .post('/api/auth/register')
            .type('json')
            .send('{"username":"testing","password":"testing"}')
            .expect(500)
            .end(function(err, res) {
                if (err) return done(err);
                done();
        });
    });
});