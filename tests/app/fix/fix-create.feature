Feature: Create a new fix

  Scenario: Given a fix data try yo create a new fix with a user registered
    Given I send a POST request to "/fix/784a28b4-a777-47b8-b4ed-9fdc591d0d7d" with body:
    """
    {
      "name": "Cambio de cadena"
    }
    """
    Given I authenticate request with token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVXNlcklkIjoiMTJmMDk3NTEtYTk4OC00OGZlLWIwYWEtYzBjMmU5MWIyNzAwIiwiaWF0IjoxNjQxNDU4MDgzfQ.iLLhNTEvJE-W1H2YDZWHw54mdne_kDDy0VxhoHm0DFc"
    Then the response status code should be 201
    Then the response should be empty

