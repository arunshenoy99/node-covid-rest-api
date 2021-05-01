# covid-resources-api
An API to get details about various resources to tackle covid.


GET
https://desolate-island-79582.herokuapp.com/:service 
returns the required service data in json format.

https://desolate-island-79582.herokuapp.com/:service/form
returns custom forms to add new information to the resources. the forms submit their data to the below POST link specified and also display corresponding error messages.

https://desolate-island-79582.herokuapp.com/data/links
returns all the relavant government links related to COVID-19. The links are classified as
Central Government, State Government and Municipal Corporations.

POST
https://desolate-island-79582.herokuapp.com/:service 
returns error/success indicated via the error messages
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
