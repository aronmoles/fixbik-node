Feature: Login
  To allow autenticate users its necessary logged user
  I want to check the api status and result

  Scenario: Check login return jwt token
    Given I send a POST request to "/auth/login" with body:
    """
    {
      "email": "aron.moles@gmail.com",
      "password": "cachibache"
    }
    """
    Then the response status code should be 200
    Then the response content should be:
    """
    {
      "token": "abcdefghai"
    }
    """
