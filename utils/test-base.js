const base = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataForOrder: {
    username: "anunturi.user@gmail.com",
    password: "Parola1993!",
    productName: "ZARA COAT 3",
  },
});
