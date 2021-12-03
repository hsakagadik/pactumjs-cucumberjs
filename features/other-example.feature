Feature: Petstore API test

  Scenario: Pet should be successfully created
    When we do a POST request to "/pet" with the body as "{}"
    Then response should have a status 200
    And the json of the response should be like in "features/response.json"

  Scenario: Pet with name completed should be successfully created
    When we do a POST request to "/pet" with the body as '{"id": 1, "name": "Nico"}'
    Then response should have a status 200
    And the body of the response should be as '{"id": 1, "name": "Nico", "photoUrls": [], "tags": []}'

  Scenario: Pet with name completed should be successfully updated
    When we do a PUT request to "/pet" with the json as in "features/updatePet.json"
    Then response should have a status 200
    And the json of the response should be like in "features/response.json"

  Scenario: Search by Pet by sold status should be successfully updated
    When we do a GET request to "/pet/findByStatus" with the "status" query param with "sold" value
    Then response should have a status 200
    And the json of the response should match with the "features/schema.json" schema