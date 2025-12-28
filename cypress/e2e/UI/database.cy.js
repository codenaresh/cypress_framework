describe("Use DB Fixture Anywhere", () => {
  it("reads DB data from fixture", () => {
    cy.fixture("employees").then((employees) => {
      expect(employees.length).to.be.greaterThan(0)

      const emp = employees[0]
      cy.log(emp.id)
      cy.log(emp.salary)
      cy.log(emp.department)
    })
  })
})
