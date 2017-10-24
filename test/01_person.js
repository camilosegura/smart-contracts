var Person = artifacts.require('Person');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = chai.expect;

contract("Testing the person contract", function(accounts) {
    describe("Deploy the person contract", function() {
        it("Gen an instance of the person contract", function() {
            return Person.new().then(function(instance) {
                personContract = instance;
            });
        });
    });

    describe("Test the contract variables", function() {
        describe("Variable: name", function() {
            it("Use setName to set a first name", function() {
                return personContract.setName("Maria").then(function(response) {
                    expect(response).to.not.be.an("error");
                })
            });

            it("Chack first name was set properly", function() {
                return personContract.name().then(function(response) {
                    expect(response.toString()).to.be.equal("Maria");
                })
            });

            it("Use setName to reject the call from another account", function() {
                return expect(personContract.setName("Pedro", {"from": accounts[1]})).to.be.eventually.rejected;
            });

            it("Chack first name is still the given name", function() {
                return personContract.name().then(function(response) {
                    expect(response.toString()).to.be.equal("Maria");
                })
            });
        })
    })
});

