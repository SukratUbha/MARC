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
1. `cd dist` *(changes directory to /dist. This is important. Our Nodejs program lives here, not the root of the repo)* 


2. `npm install express sequelize sqlite3 body-parser cors --save`
3. `npm install --save-dev mocha`
4. `node server.js`
![image](https://user-images.githubusercontent.com/69673783/113281638-5221bf00-9342-11eb-8d0d-4f2883ee5fb3.png)
5. Visit http://localhost:8080/
![image](https://user-images.githubusercontent.com/69673783/113281683-65cd2580-9342-11eb-8ccf-88ad27b1777f.png)


## Directory contents
+ Our app actually lives in /dist so we can throw in unrelated files elsewhere.
+ .github/workflows contains a config file that instructs GitHub to do our CI/CD tests.
+ Check the readme.txt in /dist
