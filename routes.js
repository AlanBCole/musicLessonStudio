var StudioCtrl = require('./controllers/studio');


module.exports = (app) => {

  app.get('/', (req, res)=>{
    res.sendFile('index.html', {root : './public/html'});
  });

  app.get('/api/musician', StudioCtrl.get);
  app.get('/api/musician/:id', StudioCtrl.get);
  app.get('/api/me', StudioCtrl.loggedIn);
  app.post('/api/musician', StudioCtrl.create);
  app.post('/api/login', StudioCtrl.login);
  app.put('/api/musician/:id', StudioCtrl.update);
  // app.put('/api/remove/:id', )

}
