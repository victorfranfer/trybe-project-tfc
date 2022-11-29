import * as chai from 'chai';
// import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// import User from '../database/models/User'

chai.use(chaiHttp);

const { expect } = chai;

const user = {
    email: 'admin@admin.com',
    password: 'secret_admin'
}


describe('Testando a rota de login', () => {
    describe('Verifique se o login é efeteudo com sucesso', () => {
        it('Verifique se é possível fazer login e retornar um token', async () => {
            const sucess = await chai.request(app).post('/login').send(user);
            expect(sucess.body).to.have.property('token');
            expect(sucess.status).to.be.equal(200);
        })

        it('Verifique não ser possível fazer login sem usuário/senha e se retorna um erro', async () => {
            const failEmpty = await chai.request(app).post('/login').send({ 
                email: '',
                password: '' }); 
            expect(failEmpty.status).to.be.equal(400)
            expect(failEmpty.body).to.have.property('message')
            expect(failEmpty.body.message).to.have.equal('All fields must be filled')
        })

        it('Verifique não ser possível logar com usuário/senha incorretos e se rotona um erro', async () => {
            const wrong = await chai.request(app).post('/login').send({
                email: 'casa@casa.com',
                password: 'secret_casa'
            });
            expect(wrong.status).to.be.equal(401)
            expect(wrong.body).to.have.property('message')
            expect(wrong.body.message).to.have.equal('Incorrect email or password')
        })
    })
})
