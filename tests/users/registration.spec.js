var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var User = require('../../models').User;

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

  describe('Test POST /api/v1/users', () => {
    test('should return a 201 status', () => {
      return request(app).post('/api/v1/users').then(response => {
        expect(response.status).toBe(201)
      })
    });
    test('should return an api key', () => {
      return request(app).post('/api/v1/users').then(response => {
        expect(Object.keys(response.body)).toContain('api_key')
        // console.log('response.body', response.body)
        // console.log('response.bodyFirstKey', typeof Object.values(response.body)[0])
        // expect(Object.values(response.body)).toBeInstanceOf(Array)
      })
    })
  });
});
