var Person = artifacts.require('Person');
var expect = require('chai').expect;

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
            })
        })
    })
});

