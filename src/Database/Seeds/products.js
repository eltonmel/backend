exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('products').insert([
        {
          description: 'Product 1',
          brand: 'Brand 1',
          created_at: knex.fn.now(),
        },
        {
          description: 'Product 2',
          brand: 'Brand 1',
          created_at: knex.fn.now(),
        },
        {
          description: 'Product 3',
          brand: 'Brand 2',
          created_at: knex.fn.now(),
        },
        {
          description: 'Product 4',
          brand: 'Brand 2',
          created_at: knex.fn.now(),
        },
      ]);
    });
};
