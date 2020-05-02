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

  app
    .route('/products')
    .get(app.src.Controllers.Products.get)
    .post(app.src.Controllers.Products.save);

  app
    .route('/products/:id')
    .get(app.src.Controllers.Products.getById)
    .put(app.src.Controllers.Products.save)
    .delete(app.src.Controllers.Products.remove);

  app
    .route('/products/:id/update-stock')
    .put(app.src.Controllers.Products.updateStock);
};
