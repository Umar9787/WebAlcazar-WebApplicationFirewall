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
- For pushing the backend server on Internet, we are going to use ngrok.
- Visit ngrok.com and create your account to have access to your own authorization token.
- Download ngrok from ngrok.com and place the ngrok.exe in the WAC folder.
- Open terminal and navigate to where the ngrok.exe is placed.
- Type these commands in the terminal.
      
      ./ngrok authtoken [YOUR_AUTH_TOKEN]
      ngrok http 8000
  
Note: Token is not a must, but it can help you maintain unlimited sessions.
