/// <reference types="cypress" />

describe("App", () => {
  it("should display default user and support changing the user via DevTools", () => {
    cy.visit("http://localhost:3000");

    // First, the default user should display
    cy.findByText("Hi jeffsalinas");

    // Now, let's change the user
    cy.findByLabelText("Select user").select("coryhouse");

    // Now only Cory's messages should display
    cy.findByText("Hi Cory, it's Jeff");
  });

  it.only("should support posting a new message", () => {
    cy.visit("http://localhost:3000");
    cy.findByLabelText("Message").type("Example message");
    cy.findByRole("button", { name: "Send" }).click();
    cy.findByText("Example message");
  });
});
