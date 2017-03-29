var StudioCtrl = require('./controllers/studio');

// This is where we define all of the routes for our application
// We export a function so that when we require this file in server.js, it can pass the express app object into routes.js
module.exports = (app) => {

  app.get('/', (req, res)=>{
    res.sendFile('index.html', {root : './public/html'});
  });

  app.get('/api/musician', StudioCtrl.get);
  app.get('/api/studio/:id', StudioCtrl.get);
  app.post('/api/musician', StudioCtrl.create);
  app.put('/api/ballots/:id', StudioCtrl.update);

}
