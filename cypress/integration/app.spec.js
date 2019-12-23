/* eslint-disable jest/expect-expect */
describe("Profile", () => {
    it("should show loader", () => {
        cy.visit("http://127.0.0.1:3000");

        cy.get(".btn-start").click();

        cy.contains("Loading user...");

        cy.get("img").should("have.class", "user-image");
        cy.get("h2").should("have.class", "user-email");
    });

    it("should fail", () => {
        cy.server();

        cy.route({
            method: "GET",
            url: "https://randomuser.me/api/",
            status: 404,
            response: "404 Resource not found"
        });

        cy.get(".btn-start").click();

        cy.contains("Request failed with status code 404");
    });
});
