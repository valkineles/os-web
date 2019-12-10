// <reference types="Cypress" />
const faker = require('faker');

before(() => {
  cy.visit('http://localhost:1234/index.html');
});
describe('a página inicial deve ter o hash "#/home"', () => {
  it('a url deve conter a string "#/home"', () => {
    cy.url().should('contain', '#/home');
  });
  it('deve existir um menu "Usuários"', () => {
    cy.contains('Usuários');
  });
  it('deve existir um menu "Clientes"', () => {
    cy.get('nav').contains('Clientes');
  });
});
describe('o sistema deve cadastrar o cliente', () => {
  it('o usuário deve clicar no menu Clientes', () => {
    cy.get('nav')
      .contains('Clientes')
      .click();
    cy.wait(2000);
  });
  it('o usuário deve clicar no botão ADD', () => {
    cy.get('#btnAdd').click();
  });
  it('ao abrir a página de cadastro de cliente, o campo nome deve receber o foco', () => {
    cy.get('#txtNomeCliente').focused();
  });
  let nome = faker.name.findName();
  let apelido = faker.name.lastName();
  let email = faker.internet.email();
  let telefone = faker.phone.phoneNumber();
  it('os campos do formulário deve ser preenchidos', () => {
    cy.get('#txtNomeCliente').type(nome);
    cy.get('#txtApelido').type(apelido, { force: true });
    cy.get('#txtEmailCliente').type(email, { force: true });
    cy.get('#txtTelefone').type(telefone, { force: true });
  });
  it('o usuário deve clicar no botão Salvar', () => {
    cy.get('#btnSave').click();
    cy.wait(2000);
  });
  it('o novo cliente deve existir no grid', () => {
    cy.contains(nome);
  });
});
