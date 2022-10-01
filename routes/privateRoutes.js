const {ROLE} = require('../const/index');
const routes = {
    'users': [
        {p: '/user/private', m:'GET', a: 'getPrivateUserData', r: [ROLE.CUSTOMER]}
    ]
}

module.exports = routes;