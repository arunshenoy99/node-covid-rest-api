# covid-resources-api
### The project implements a RESTful API that stores and provides contacts for various resources required during the Covid 19 pandemic. ###

### Installation ###

* Download the zip of the project or clone the project using
  `git clone https://github.com/arunshenoy99/covid-resources-api.git`
* **Installing the dependencies** 
  * `npm init`.
  * Then type in 
  `npm install`.
  This should install all the dependencies for you.

* **Setting up the environment**
  * In the root of the project create a directory called `config`.
  * Create a file `dev.env`. This file should store key=value pairs for each of PORT, EMAIL_API_TOKEN, SESSION_TOKEN
  * ```
    PORT is the port number on which you want the server running.
    EMAIL_API_TOKEN is the API token from sendgrid a free email service.
    SESSION_TOKEN is your session secret key and must contain a secure string.
    ```
  * An example entry in `dev.env` would be `PORT=3000`.

### The REST Api ###

Every contact for a resource on the server must belong to one the services listed below
* ambulance
* food
* hospitals
* injection
* oxygen
* plasma

**Quick Links**
  ```
  REQUEST_METHOD: GET
  PATH: /data/links
  RETURN TYPE: CONTENTS OF /src/data/quickLinks.json
  DESCRIPTION: JSON ARRAY CONTAINS ALL THE ESSENTIAL WEBSITES FROM THE CENTRAL/STATE GOVERNMENTS AND FROM LOCAL MUNICIPAL AUTHORITIES.
  ```
**Getting the contacts**
  ```
  REQUEST_METHOD: GET
  PATH: /data/:service
  :service belongs to one of the services listed above at the beginning of the section.
  Ex. /data/ambulance returns all the contacts for the ambulance
  RETURN TYPE: CONTENTS OF /src/data/$service.json. $service represents the :service of the path. Ex. For /data/ambulance the file read would be ambulance.json
  DESCRIPTION: JSON ARRAY CONTAINS CONTACTS FOR AMBULANCES.
  ```
 **Adding new contacts**
 * To add a new contact the user will have to authenticate himself with his email address.
 * In order to authenticate the user place a request to the endpoint given below
  ```
  REQUEST_METHOD: GET
  PATH: /:service
  :service belongs to one of the services listed above at the beginning of the section.
  RETURN TYPE: html form to fill in the email address
  DESCRIPTION: This page contains a form which will allow the user to enter his email and request a One Time Password.
  ```
 * On submitting the above form you will get sent to a page which contains the form to enter the One Time Password from the email.
 * Verify your One Time Password.
 * After verification the respective form for adding a new contact will be visible to you.
 * Fill in the form and submit the details.
 * To verify goto `/data/:service` and check if the contact has been added to the json returned.
### Other Relevant Information ###
* The server uses memory store to temporarily store OTP and other user related information from the session. The store wipes garbage session data once every 24 hours.
* Each endpoint (**excluding** the `POST /otp and POST /otp/resend`) have a request limit of about 100 requests every 24hrs.
  * On exceeding this limit the server will return STATUS 429.
* The `POST /otp` has a limit of 3 requests every 60 seconds and `POST /otp/resend` has a limit of 1 request every 25 seconds.
