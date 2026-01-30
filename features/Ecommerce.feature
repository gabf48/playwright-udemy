
Feature: Feature name
@Regression
   Scenario: Placing the Order
    Given a login to Ecommerce application with "anunturi.user@gmail.com" and "Parola1993!"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is display in the Cart
    When Enter valid details and Place the Order
    Then Verify order in present in the OrderHistory

   @Validation
   Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is display
   
    Examples:
        | username | password | 
        | rahulshetty  | learning  | 
        | hello@1123 | Iamhello@12 |

# to run both scenarios in parallel run:  npx cucumber-js features/Ecommerce.feature --parallel 2--exit 