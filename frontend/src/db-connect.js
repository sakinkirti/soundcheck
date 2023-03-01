const { Pool } = require('pg');

const text = 'SELECT * from app_user'

const pool = new Pool({
    user: 'sc_db',
    host: 'soundcheck-database.czj5eib3wrvz.us-east-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'soundcheckadmin123',
    port: 5432,
})

pool.connect(function(err) {
    if (err) throw err;
    console.log('Connected to db!')
});

pool.query(text, (err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        console.log(res.rows)
    }
})

pool.end()

export default pool