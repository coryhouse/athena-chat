/// <reference types="cypress" />

describe("App", () => {
  it("should display messages for the default user", () => {
    cy.visit("http://localhost:3000");
    cy.findByText("Hi jeffsalinas");
  });

  it("should support changing the user via DevTools", () => {
    cy.visit("http://localhost:3000");

    // First, the default user should display
    cy.findByText("Hi jeffsalinas");

    // Now, let's change the user
    cy.findByLabelText("Select user").select("coryhouse");

    // Now only Cory's messages should display
    cy.findByText("Hi Cory, it's Jeff");
  });
});
