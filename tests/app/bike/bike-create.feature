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
    Given I authenticate request with token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVXNlcklkIjoiMTJmMDk3NTEtYTk4OC00OGZlLWIwYWEtYzBjMmU5MWIyNzAwIiwiaWF0IjoxNjQxNDU4MDgzfQ.iLLhNTEvJE-W1H2YDZWHw54mdne_kDDy0VxhoHm0DFc"
    Then the response status code should be 201
    Then the response should be empty

