const server = require('./app-server');
const db = require('./models').sequelize;

db
.authenticate()
.then(db.sync())
.then(() => {
  /* prevent our express server
  *  and test server (using supertest)
  *  from trying to access the same port at the same time
  */
  if (!module.parent) {
    server.listen(process.env.PORT || 4000, () => console.log('Listening on port 4000'));
  }
})
.catch(err => console.log('Unable to connect to the database:', err));
