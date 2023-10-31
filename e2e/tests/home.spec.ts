describe("Home", () => {
  it("render", () => {
    cy.visit("/");
    cy.findByRole("heading", {
      name: /Home Page/i,
    }).should("exist");
  });
});
