import { Login } from "../../../pages/page"
describe('Login', () => {

    let logindata;

    before(() => {

        cy.fixture('userdata').then((userdata) => {

            logindata = userdata


        })
    })

    const login = new Login()

    it('login', () => {
        cy.visit('/login')
        login.login(logindata.username, logindata.password)
        cy.url().should("include", "/dashboard");
    })
})