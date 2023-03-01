const {Pool} = require('pg')

const port = 3000

const pool = new Pool({
  user: 'sc_db',
  host: 'soundcheck-database.czj5eib3wrvz.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'soundcheckadmin123',
  port: 5432,
})

pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Soundcheck! database!");
});

const text = 'SELECT * from app_user'

// callback
pool.query(text, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows)
    }
  })

  pool.listen(port, () => {
    console.log(`listening on port: ${port}`)
  })

pool.end()