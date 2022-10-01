const routes = {
    'users': [
        {p: '/register', m: 'POST', a: 'userRegister'},
        {p: '/login', m: 'POST', a: 'userLogin'},
    ]
}

module.exports = routes;