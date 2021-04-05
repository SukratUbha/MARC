# M. A. R. C.
# Marker Allocation Reconciliation Configurator 
A web-based tool for organizing markers (by Team 6) for Compsci 399.

## Built using
+ Node.js
+ Express web application server + framework

+ Squelize ORM
+ SQLite in file-back-end mode

+ Mocha testing framework

+ React
+ HTML/CSS/Javascript

## Backend Installation Instructions:

`git clone https://github.com/uoa-compsci-399/MARC.git`

`cd MARC/dist` *(changes directory to /dist. This is important. Our Nodejs program lives there, not the root of the repo)* 

`npm install` *This will install dependencies.  (express sequelize sqlite3 body-parser cors)*

![image](https://user-images.githubusercontent.com/80251770/113613893-efb02200-96a5-11eb-84a1-e9af5a4a9db8.png)

## To start the server

`npm start` will load the Express web application server. Then visit http://localhost:8080/

![image](https://user-images.githubusercontent.com/80251770/113612930-91cf0a80-96a4-11eb-9be5-8dd564c60d33.png)
![image](https://user-images.githubusercontent.com/69673783/113281683-65cd2580-9342-11eb-8ccf-88ad27b1777f.png)

## Directory contents
+ Our app actually lives in /dist so we can throw in unrelated files elsewhere.
+ .github/workflows contains a config file that instructs GitHub to do our CI/CD tests.
+ Check the readme.txt in /dist

## Dependencies
Npm knows which dependencies to install because the *package.json* file already has the dependencies registered. They were registered by doing the following:

`npm install express sequelize sqlite3 body-parser cors --save
npm install --save-dev mocha`

