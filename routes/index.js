const express = require('express');
const publicRoutes = require('./publicRoutes');
const privateRoutes = require('./privateRoutes');
const jwtAuth = require('../middlewares/jwtAuth');
const apiRoutes = express.Router();


// Api Payload Output Format
const payload = (data, success, message) => {
    if (success) {
        return {success: true, data: data, message: message}
    } else {
        return {success: false, message: message}
    }
}

const bindRoute = (routes) => {
    console.log("IN BIND ROUTES")
    for (let cname in routes) {
        routes[cname].forEach((route) => {
            let method = route.m.toLowerCase().trim();

            const jwtAuthentication = (route?.r && route?.r?.length) ? jwtAuth.withAuth(route.r): jwtAuth.withOutAuth;
            try {
                apiRoutes[method](route.p, jwtAuthentication, async(req, res) => {
                    try {
                        // Loading model
                        let controller = require(`../controllers/${cname}`)
    
                        // JWT Param
                        let authUser = (req?.user || null)
                        console.log(req)
                        // Appending JWT Params
                        let params = {}
                        if (method === 'get') params = {...req.query, authUser: authUser}
                        else if (method === 'post') params = {...req.body, authUser: authUser}
                        else if (method === 'put') params = {...req, authUser: authUser}
                        else if (method === 'delete') params = {...req.body, authUser: authUser}
                        
                        console.log("In run")
                        // call action
                        let result = await controller[route.a](params);
    
                        res.send(payload(result, true, ''));
    
                    } catch(error) {
                        res.send(payload('', false, error.toString()))
                    }
                })
            } catch (err) {
                console.log("ERR")
            }
            
        })
    }
}

bindRoute(publicRoutes)
bindRoute(privateRoutes)

module.exports = apiRoutes
