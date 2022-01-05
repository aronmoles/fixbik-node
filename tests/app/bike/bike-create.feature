Feature: Create a new bike

  Scenario: Given a data bike try yo create a new bike with a user registered
    Given I send a PUT request to "/bike/784a28b4-a777-47b8-b4ed-9fdc591d0d7d" with body:
    """
    {
      "id": "784a28b4-a777-47b8-b4ed-9fdc591d0d7d",
      "user_id": "12f09751-a988-48fe-b0aa-c0c2e91b2700",
      "name": "Carretera",
      "brand": "MMR",
      "model": "Adrenaline SLD",
      "year": "2018"
    }
    """
    Then the response status code should be 201

