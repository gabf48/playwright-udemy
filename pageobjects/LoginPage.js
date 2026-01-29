class LoginPage {

  constructor(page) {
    this.page = page;
    this.signInButton = page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.dashboardProductTitle = page.locator(".card-body b");
  }

  async goTo(){
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(username, password) {
    await this.userName.type(username);
    await this.password.type(password);
    await this.signInButton.click();
    await this.page.locator(".card-body b").first().waitFor({ state: 'visible' });
  }
}

module.exports = {LoginPage};