Feature: Feature name
   @Validation
   @foo
   Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is display
   
    Examples:
        | username | password | 
        | rahulshetty  | learning  | 
        | hello@1123 | Iamhello@12 |