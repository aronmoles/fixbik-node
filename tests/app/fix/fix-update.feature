Feature: Update a fix

  Scenario: Given a fix data try yo update a fix with a user registered
    Given I send a PUT request to "/fix/fa9737d3-7dfa-4eec-97f8-37d19fb122ea" with body:
    """
    {
      "name": "Cambio de cadena 2"
    }
    """
    Given I authenticate request with token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVXNlcklkIjoiMTJmMDk3NTEtYTk4OC00OGZlLWIwYWEtYzBjMmU5MWIyNzAwIiwiaWF0IjoxNjQxNDU4MDgzfQ.iLLhNTEvJE-W1H2YDZWHw54mdne_kDDy0VxhoHm0DFc"
    Then the response status code should be 200
    Then the response should be empty

