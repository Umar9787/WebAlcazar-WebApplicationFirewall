# WebAlcazar (Web Application Firewall)
## Description
A web application firewall (WAF) is a specific form of application firewall that filters, monitors, and blocks HTTP traffic to and from a web service. At current time the application provides security against SQL injection attacks. In the future it will defend against more attacks.
## Tools Used
- Django for backend server.
- Jupyter Notebook for Training Machine Learning MLP model.
- React+Redux for frontend.
## Manual
- In WAC/frontend -> run command "npm install" which will install all the dependencies.
- In WAC/frontend -> run command "npm start" to start the frontend server.
- In WAC/ -> run command "python ./manage.py runserver" to start the backend server.
- Then If you want to access the backend server over the internet run command "ngrok http 8000" but you have to generate your access token first from ngrok website and then run command "ngrok token <your token here>".
- After the token is setup then run command "ngrok http 8000" which will give you an address to access the server over the internet.
