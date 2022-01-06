Feature: Remove a bike

  Scenario: Given a data bike try yo remove a bike
    Given I send a DELETE request to "/bike/bb92ffb6-396a-4a9b-880a-73c789f5198d"
    Given I authenticate request with token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVXNlcklkIjoiMTJmMDk3NTEtYTk4OC00OGZlLWIwYWEtYzBjMmU5MWIyNzAwIiwiaWF0IjoxNjQxNDU4MDgzfQ.iLLhNTEvJE-W1H2YDZWHw54mdne_kDDy0VxhoHm0DFc"
    Then the response status code should be 200
    Then the response should be empty

