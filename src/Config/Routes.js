module.exports = (app) => {
  app
    .route('/clients')
    .get(app.src.Controllers.clients.get)
    .post(app.src.Controllers.clients.save);

  app
    .route('/clients/:id')
    .get(app.src.Controllers.clients.getById)
    .put(app.src.Controllers.clients.save)
    .delete(app.src.Controllers.clients.remove);
};
