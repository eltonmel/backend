exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('payment_methods')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('payment_methods').insert([
        { description: 'Boleto', created_at: knex.fn.now() },
        { description: 'Dinheiro', created_at: knex.fn.now() },
        { description: 'Cartão', created_at: knex.fn.now() },
      ]);
    });
};
