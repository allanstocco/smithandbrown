# Smith and Brown - Inventory Managment System | Capstone CS50W
### HarvardX CS50W: Web Programming with Python and JavaScript

</br>

# Overview

This project contains a Django Rest API with a plain and pure JavaScript with Express.js. 
I call this the S&B Inventory System.  
Users will be able to signup an account once allowed throught Django Admin System. 

Particularly, taking advantage of this last project as a free theme, I joined my needs, as I work in a Carpentry Workshop and one of my responsibilities is to receive and order products, in addition to controlling and organizing the stock, keeping it up to date. My first thought was to make a tool that could help me with these tasks on a daily basis.  

So with that said, the purpose of the app is actually a daily tool for my personal use in controlling these tasks. 
However, I will continue to implement and update this app as the main objective will be to deploy the application and be able to register the products with photos, their respective codes and reference numbers by mobile.

</br>

# Distinctiveness and Complexity

I consider that this project meets all the expectations raised in the assignment of the CS50W final project, as it is a web platform that implements most of the concepts and techniques taught in the course.
The whole application is based on the Django framework, which allowed managing user login and authentication, database models, http requests, static files.  

Apart from this, user interface was designed based on pure JavaScript, including routing, databinding and JavaScript's native module. The web application is mobile responsive. With Express.js help I could handle responses and routes. It is also part of the application that listens to a socket to handle incoming responses.  

I consider that what differentiates this app from the previous ones is its single page system, its dynamic forms and the DRF which was something new for me that required a lot of reading and learning.


</br>

# Structure

The web platform is structured as follows

- **frontend:** This folder contains the front end part that displays the landing page that allows the users to interact with the application.
- **API:** This folder contains the API funtions and models which can be called from the front end. This API folder contains the funtions and models for users-profile, products, pictures, comments, orders. This folder also have all serializers to validate the incoming data.
- **Inventory:** The Inventory folder handles the models and funtions relating to the main Django app.
- **user:** This folder app handles the models and funtions relating to users.

</br>


# Files and directories

### Front End:

- `frontend/` - front-end directory.
  - `login.html` - Login Page.
  - `index.html` - Base Template, this file renders all js modules. This file is the main layout of the UI web application.
    - `static/` - contains all static content.
      - `css/` - contains compiled CSS files.
      - `fonts/` - contains customs fonts files. 
      - `js/` - all JavaScript modules.
        - `views/` - Modules.  
          - `AbstractView.js` - Abstract class from which all other classes derive.  
          - `Dashboard.js` - this file renders the Dashboard, shows charts of product quantity by category and accepted/not accepted orders.  
          - `Details.js` - this file renders products/details, handles the notation form and allows you to make notes on the products.  
          - `Editem.js` - this file renders the product/edition and allows you to submit changes to the product.  
          - `Orders.js` - this file renders the Orders page, where the user can order orders.  
          - `Products.js` - this file renders all products as a list, handles the product addition form, where you can choose multiple images and register a new product. There is also a datepicker to filter and search for products by registration date.  
          - `SearchBar.js` - this file handles top fixed search bar functionality where user can query from anywhere in the app.
        - `index.js` - The main JS file, included in index.html. Responsible for routing all modules below. 
- `server.js` - serve front on port - 3000.    
### Back End:
- `API/` - back-end directory.
  - `Inventory/` - app.
    - `admin` - This file is used for registering the models into the django administration.
    - `models` - This file contains the models of our web application. Resposible for holding informations of UserProfile, Products, Comments, Orders, Pictures.
    - `serializers` - Serializers to deal with model instances and querysets.
    - `urls` - This file contains the lists of all the endpoints that we will have for our web application.
    - `views` - Contains the funtions for the web application. These view functions sends and receives http request and response.
  - `user/` - app.
    - `admin` - This file is used for registering the models into the django administration.
    - `models` - This file contains the models of our web application. Responsible for User database modeling.
    - `serializers` - Serializers to deal with model instances and querysets.
    - `urls` -  This file contains endpoints related to login.
    - `views` - Contains the funtions for the web application. These view functions sends and receives http request and response.
  - `media/` - This directory contains images, here will be saved all products and user photos.
  - `sbim/` - Project directory.
  - `manage.py` - This file is used as a command-line utility and for deploying, debugging, or running the web application.This file contains code for runserver, makemigrations or migrations.

<br>

# Installation & Running Application

### Back End:

#### Firstly
```json
pip install -r requirements.txt
```
##### Then

```json
python manage.py makemigrations user
python manage.py migrate user
python manage.py makemigrations Inventory
python manage.py migrate Inventory
```

##### Then

```json
python manage.py createsuperuser
```

#### Finally

```json
python manage.py runserver
```

* * *

### Front End:

#### Express.js
```json
npm install express
```

### Running Front

```json
node server.js
```

<br>


![Dash](API/media/dash.png)
![Orders](API/media/Orders.jpg)
![Prod_Details](API/media/prod_detail.png)

<br>

#### Allan Stocco



