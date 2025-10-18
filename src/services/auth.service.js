const user = require("../models/user.model");
const bcrypt = require("bcrypt");

checkuser = async(email , password) => {
    const User = await user.findOne({email}); 
    if(!User){
        return false; 
    }
    if(User.email !== email){
        return false; 
    }

    const isMatch = await bcrypt.compare(password , User.password); 
    if(!isMatch){
        return false;
    }

    return User;
    

}; 
module.exports = checkuser;