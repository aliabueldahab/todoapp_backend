const express = require('express');
const register = require('../controllers/register'); 
const login = require('../controllers/login');
const regrout = express.Router();

 
regrout.post('/register' , register); 
regrout.post('/login' , login)

module.exports = regrout;