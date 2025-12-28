import { loginLocators } from "../locators/login.locators";
export class Login{

   elements = {
    username: () => cy.get(loginLocators.username),
    password: () => cy.get(loginLocators.password),
    loginBtn: () => cy.get(loginLocators.loginBtn)
  }

   login(user, pass) {
    this.elements.username().type(user);
    this.elements.password().type(pass);
    this.elements.loginBtn().click();
  }

}