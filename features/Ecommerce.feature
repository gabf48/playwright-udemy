@Regression
Feature: Feature name
   Scenario: Placing the Order
    Given a login to Ecommerce application with "anunturi.user@gmail.com" and "Parola1993!"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is display in the Cart
    When Enter valid details and Place the Order
    Then Verify order in present in the OrderHistory

