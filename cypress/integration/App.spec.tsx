/// <reference types="cypress" />

describe("App", () => {
  it("should display messages for the default user", () => {
    cy.visit("http://localhost:3000");
  });
});
