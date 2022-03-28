# Smith and Brown - Inventory Managment System | Capstone CS50W
### HarvardX CS50W: Web Programming with Python and JavaScript

</br>

# Overview

This project contains a Django Rest API with a plain and pure JavaScript with Express.js. 
I call this the S&B Inventory System.  
Users will be able to signup an account once allowed throught Django Admin System. 

Particularly, taking advantage of this last project as a free theme, I joined my needs, as I work in a Carpentry Workshop and one of my responsibilities is to receive and order products, in addition to controlling and organizing the stock, keeping it up to date.  

So with that said, the purpose of the app is actually a daily tool for my personal use in controlling these tasks. 
However, I will continue to implement and update this app as the main objective will be to deploy the application and be able to register the products with photos, their respective codes and reference numbers by mobile.

</br>

# Distinctiveness and Complexity

I consider that this project meets all the expectations raised in the assignment of the CS50W final project, as it is a web platform that implements most of the concepts and techniques taught in the course.
The whole application is based on the Django framework, which allowed managing user login and authentication, database models, http requests, static files.  

Apart from this, user interface was designed based on pure JavaScript, including routing, databinding and JavaScript's native module. The web application is mobile responsive. With Express.js help I could handle responses and routes. It is also part of the application that listens to a socket to handle incoming requests.  

I consider that what differentiates this app from the previous ones is its single page system, its dynamic forms and the DRF which was something new for me that required a lot of reading and learning.


</br>

# Structure

The web platform is structured as follows

- **frontend:** This folder contains the front end part that displays the landing page that allows the users to interact with the application.
- **API:** This folder contains the API funtions and models which can be called from the front end. This API folder contains the funtions and models for products, files, comments, orders. This folder also have all serializers to validate the incoming data.
- **Inventory:** The Inventory folder handles the models and funtions relating to the main Django app.
- **user:** This folder app handles the models and funtions relating to users.

</br>
