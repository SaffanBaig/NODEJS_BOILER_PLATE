const h = require('../helper');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwtAuth = require('../middlewares/jwtAuth');

const userModel = db.model('users');

const userRegister = async (params) => {
    if(h.isEmpty(params)) throw "Required Params error! Email and Password are required";
    if (!params.email) throw "Email is required"
    if (!params.password) throw "Password is required"
    if (!params.confirmPassword) throw "Confirm Password is required"
    if (!params.role) throw "User role is not defined"
    let {email, password, confirmPassword, role} = params;
    try {
        // Check if user already exists
        let user = await userModel.findOne({where: {email}})
        if (user) throw "User already exists"
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return await userModel.create({email, password, role});

    } catch (err) {
        throw err
    }
}

const userLogin = async (params) => {
    if(h.isEmpty(params)) throw "Required Params error! Email and Password are required";
    if (!params.email) throw "Email is required"
    if (!params.password) throw "Password is required"
    const {email, password} = params
    let user = await userModel.findOne({where: {email}})
    if (!user) {
        throw "Incorrect Email or Password"
    }
    // Check password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        throw "Incorrect Email or Password"
    }
    const accessToken = jwtAuth.sign({
        email: user.email,
        role: user.role,
        id: user.userId
    })
    return {
        email,
        token: accessToken,
        id: user.userId
    }
}
const getPrivateUserData = async (params) => {
    return "Private Data Successfull"
}

module.exports = {
    userRegister,
    userLogin,
    getPrivateUserData
}