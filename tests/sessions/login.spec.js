var shell = require('shelljs');
var request = require('supertest');
var app = require('../../app');
var User = require('../../models').User;
// var bcrypt = require('bcrypt');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test POST /api/v1/sessions', () => {
    test('should return an api key', () => {
      let email = 'login@example.com'
      let password = 'password'
      let apiKey = '123456789'

      User.create({
        email: email,
        password: password,
        apiKey: apiKey
      })
      .then(user => {
        return request(app).post('/api/v1/sessions').send(JSON.stringify({
          'email': email,
          'password': password
        }))
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(Object.keys(response.body)).toContain('apiKey');
        expect(response.body.api_key).toEqual(apiKey)
      })
    });

    test('should return an error message when missing required fields - email', () => {
      let email = 'login@example.com'
      let password = 'password'
      let apiKey = '123456789'

      User.create({
        email: email,
        password: password,
        apiKey: apiKey
      })
      .then(user => {
        return request(app).post('/api/v1/sessions').send(JSON.stringify({
          'email': email
        }))
      })
      .then(response => {
        expect(response.status).toBe(400);
        expect(Object.keys(response.body)).toContain('error');
        expect(response.body.error).toEqual('Invalid login.')
      })
    })
  })
});
