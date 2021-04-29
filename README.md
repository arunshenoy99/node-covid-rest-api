# covid-resources-api
An API to get details about various resources to tackle covid.


GET
https://desolate-island-79582.herokuapp.com/:service 
returns the required service data in json format.

POST
https://desolate-island-79582.herokuapp.com/:service 
returns error/success indicated via status codes
The JSON is managed via files for each of the services in the src/data folder. 
Placing a POST request will append your data to the existing information. This can be used to add new information about various resources.

:service is an url paramter and can take on one of the following values given below
1. ambulance
2. food
3. hospitals
4. injection
5. oxygen
6. plasma
Each representing the type of service information required.
