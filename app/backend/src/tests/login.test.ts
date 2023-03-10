import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { STATUS_BAD_REQUEST, STATUS_UNAUTHORIZED } from '../utils/httpStatusUtil';
import { MSG_FIELDS_MISSING, MSG_INVALID_FIELDS } from '../utils/returnedMessagesUtils';

import { MOCK_USER_ADMIN } from '../utils/mocksUtils';

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /login FAILED requisition', () => {
  describe('Bad Request Errors', () => {
    let chaiHttpResponse: Response;

    it('Testa o email', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: '', password: 'secret_admin' });
      const { message } = chaiHttpResponse.body;
      const { status } = chaiHttpResponse;
      expect(message).to.equal(MSG_FIELDS_MISSING);
      expect(status).to.equal(STATUS_BAD_REQUEST);
    });

    it('Testa o password', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: '' });
      const { message } = chaiHttpResponse.body;
      const { status } = chaiHttpResponse;
      expect(message).to.equal(MSG_FIELDS_MISSING);
      expect(status).to.equal(STATUS_BAD_REQUEST);
    })
  });

  describe('Unauthorized Errors', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(MOCK_USER_ADMIN as User);
    });

    afterEach( () => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Email not found in database', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'incorrect_email', password: 'secret_admin' });
      const { message } = chaiHttpResponse.body;
      const { status } = chaiHttpResponse;
      expect(message).to.equal(MSG_INVALID_FIELDS);
      expect(status).to.equal(STATUS_UNAUTHORIZED);
    });

    it('Password is incorrect', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'incorrect_password' });
      const { message } = chaiHttpResponse.body;
      const { status } = chaiHttpResponse;
      expect(message).to.equal(MSG_INVALID_FIELDS);
      expect(status).to.equal(STATUS_UNAUTHORIZED);
    });
    
  });

});
