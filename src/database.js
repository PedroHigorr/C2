const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port:3306,
        user: 'root',
        password: 'password',
        database: 'calafate'
    }
})

module.exports = knex

// const email = 'pedro.higor92@gmail.com'


//  knex.select( 'senha').from('users').where({ email: email })
//  .then( data => {
//     console.log(data)
//  }).catch(error => {
//     console.log('erro 666')
//  })

// knex.select('*').from('users').timeout(1000)
// .then(data => {
//   console.log(data)
// })
// .catch(error => {
//   console.log('Erro 666')
// })

// var mysql = require('mysql2');

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'password',
//   database : 'calafate'
// });


// connection.connect();


// connection.end();


