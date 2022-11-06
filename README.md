# -DDoS attacks challenge-




# Task

Cyber attacks are getting more and more in those times. We want to protect ourselves from DDoS attacks. The goal of this challenge is to write a simple DDoS protection proxy for an origin site.

The origin site can be any site which is running on another server that can be proxied by us.

The protection does not have to be super performant, but it should only allow “valid” traffic to the origin site.

Valid traffic is measured with “rps” (requests per second). In a config the threshold for maximum requests per second can be defined. The rps are measured per IP address.

If your requests go above the defined rps limit, we will show a “captcha challenge”. The user then needs to enter the images displayed in the captcha. If his answer is correct, he can continue and will see the content of the origin site. The content will always be proxied by our protection and only valid traffic will reach the origin site.

## **Technologies / Libraries**

JavaScript

You are allowed to use any third-party libraries e.g. for generating the captcha image or for providing the web-server (e.g. Express.JS).

## **How you will be judged**

You will be scored on:

 -  coding standard, comments and style
 -  overall solution design
 - appropriate use of source control
 - unit testing strategy (optional)




# Solution



## Installation
Move to "**DDoSProtection**" Folder and run

    $ npm install

## Requirements

    "dependencies": {
      "body-parser": "^1.20.1",
      "ejs": "^3.1.8",
      "express": "^4.18.2",
      "mongoose": "^6.7.1",
      "node-fetch": "^2.6.7"
    }

##  Usage

Using node:

    $ node app.js

 If you have "**nodemon**" installed, you can run it using:
 

    $ nodemon app.js



# Configuration

Inside "**DDoSProtection/config/database.js**"

|option|description  |
|--|--|
|ALLOWEDR  | maximum requests per *TIME* |
 |TIME | in milliseconds

> Restart the node server again after making any changes
