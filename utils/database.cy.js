describe("Database Validation", () => {
  it("should fetch employees from DB", () => {
    cy.task("queryDb", {
      query: "select id, salary, deaprtment from employee where id='101'",
      values: ["Active"]
    }).then((rows) => {
      expect(rows.length).to.be.greaterThan(0)
      cy.log(JSON.stringify(rows))
    })
  })
})
