exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('clients')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('clients').insert([
        {
          cpf_cnpj: '02596526500',
          name: 'Nome Teste',
          address: 'Rua Avenida Nº 0',
          phone: '44999887766',
          email: 'email@provedor.com',
          created_at: knex.fn.now(),
        },
        {
          cpf_cnpj: '87465925866',
          name: 'Nome Teste 2',
          address: 'Rua Avenida Nº 1000',
          phone: '44999223344',
          email: 'email@provedor.com',
          created_at: knex.fn.now(),
        },
        {
          cpf_cnpj: '12345678900',
          name: 'Nome Teste 3',
          address: 'Rua Avenida Nº 2000',
          phone: '44999446655',
          email: 'email@provedor.com',
          created_at: knex.fn.now(),
        },
      ]);
    });
};
