Feature: Search a fix

  Scenario: Given a search retrieve a fix with this name
    Given I send a GET request to "/fix?search=cadena"
    Given I authenticate request with token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVXNlcklkIjoiMTJmMDk3NTEtYTk4OC00OGZlLWIwYWEtYzBjMmU5MWIyNzAwIiwiaWF0IjoxNjQxNDU4MDgzfQ.iLLhNTEvJE-W1H2YDZWHw54mdne_kDDy0VxhoHm0DFc"
    Then the response status code should be 200
    Then the response content should be:
    """
    {
      "data": [
        {
          "id": "fa9737d3-7dfa-4eec-97f8-37d19fb122ea",
          "name": "Sustitucion de cadena"
        }
      ]
    }
    """

