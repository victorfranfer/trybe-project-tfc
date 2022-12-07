import * as chai from 'chai';
// import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// import User from '../database/models/User'
import { MOCK_TEAMS } from '../utils/mocksUtils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota team', () => {
    describe('Verifique se todos os times são retornados com sucesso', async () => {
        it('Retorna todos os times', async () => {
            const allTeams = await chai.request(app).get('/teams');
            expect(allTeams.body).to.be.deep.equal(MOCK_TEAMS);
            expect(allTeams.status).to.be.equal(200);
        })

        it('Retorna o time pelo id', async () => {
            const idTeam = await chai.request(app).get('/teams/5');
            expect(idTeam.body).to.be.deep.equal(MOCK_TEAMS[4]);
            expect(idTeam.status).to.be.equal(200);
        })
    })
})
