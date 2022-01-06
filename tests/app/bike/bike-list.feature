Feature: Create a new bike

  Scenario: Given a data bike try yo create a new bike with a user registered
    Given I send a GET request to "/bike"
    Given I authenticate request with token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVXNlcklkIjoiMTJmMDk3NTEtYTk4OC00OGZlLWIwYWEtYzBjMmU5MWIyNzAwIiwiaWF0IjoxNjQxNDU4MDgzfQ.iLLhNTEvJE-W1H2YDZWHw54mdne_kDDy0VxhoHm0DFc"
    Then the response status code should be 200
    Then the response content should be:
    """
    {
      "data": [
        {
          "id": "bb92ffb6-396a-4a9b-880a-73c789f5198d",
          "userId": "12f09751-a988-48fe-b0aa-c0c2e91b2700",
          "name": "Carretera",
          "brand": "MMR",
          "model": "Adrenaline SLD",
          "year": 2018
        }
      ]
    }
    """

