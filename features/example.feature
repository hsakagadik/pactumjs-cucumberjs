Feature: Something

  Background: Set up base url
    Given that we set the base url as "http://httpbin.org"

  Scenario: Check Tea Pot
    When we do a GET request to "/status/419"
    Then response should have a status 419

  Scenario: Check Tea Pot failed
    When we do a GET request to "/status/418"
    Then response should have a status 418