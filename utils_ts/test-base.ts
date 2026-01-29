import { test as baseTest} from '@playwright/test';
interface TestDataForOrder{
  username: string;
  password: string;
  productName: string;
};

export const customtest = baseTest.extend<{testDataForOrder:TestDataForOrder}>
({
  testDataForOrder: {
    username: "anunturi.user@gmail.com",
    password: "Parola1993!",
    productName: "ZARA COAT 3",
  }
});
