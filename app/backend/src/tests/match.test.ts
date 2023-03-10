import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Matches from '../database/models/Match';
import { app } from '../app';
import { Response } from 'superagent';
import { MOCK_MATCHES } from '../utils/mocksUtils';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa Maches', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves(MOCK_MATCHES as any);
  });
  afterEach(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Retorno do array', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/matches')
    .send();

  const result = chaiHttpResponse.body;
  const { status } = chaiHttpResponse;
  expect(result).to.deep.equals(MOCK_MATCHES);
  expect(status).to.equals(200);
  });

  it('Retorno do array in progress', async() => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
      .send();

    const { status } = chaiHttpResponse;
    expect(status).to.equals(200);
  });
});
