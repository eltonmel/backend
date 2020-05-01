module.exports = (app) => {
  app
    .route('/clients')
    .get(app.src.Controllers.Clients.get)
    .post(app.src.Controllers.Clients.save);

  app
    .route('/clients/:id')
    .get(app.src.Controllers.Clients.getById)
    .put(app.src.Controllers.Clients.save)
    .delete(app.src.Controllers.Clients.remove);
};
