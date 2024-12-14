

//   const user: typeof usersTable.$inferInsert = {
//     name: 'John',
//     age: 30,
//     email: 'john@example.com',
//   };

  const dataUsers = [
    {name: 'Nafa', age: 6, email: "nafa@nextmail.com", password: "123456"},
  ]

  const dataCustomers = [
    {
        id: 1,
      name: 'Evil Rabbit',
      email: 'evil@rabbit.com',
      image_url: '/customers/evil-rabbit.png',
    },
    {
        id: 2,
      name: 'Delba de Oliveira',
      email: 'delba@oliveira.com',
      image_url: '/customers/delba-de-oliveira.png',
    },
    {
        id: 3,
      name: 'Lee Robinson',
      email: 'lee@robinson.com',
      image_url: '/customers/lee-robinson.png',
    },
    {
        id: 4,
      name: 'Michael Novotny',
      email: 'michael@novotny.com',
      image_url: '/customers/michael-novotny.png',
    },
    {
        id: 5,
      name: 'Amy Burns',
      email: 'amy@burns.com',
      image_url: '/customers/amy-burns.png',
    },
    {
        id: 6,
      name: 'Balazs Orban',
      email: 'balazs@orban.com',
      image_url: '/customers/balazs-orban.png',
    },
  ];

  const dataInvoices = [
    {
      // id: 1,
      customer_id: dataCustomers[0].id,
      // customer_id: 3,
      amount: 15795,
      status: 'pending',
      date: '2022-12-06',
    },
    {
      // id: 2,
      customer_id: dataCustomers[1].id,
      // customer_id: 2,
      amount: 20348,
      status: 'pending',
      date: '2022-11-14',
    },
     {
        customer_id: dataCustomers[4].id,
        amount: 3040,
        status: 'paid',
        date: '2022-10-29',
      },
      {
        customer_id: dataCustomers[3].id,
        amount: 44800,
        status: 'paid',
        date: '2023-09-10',
      },
      {
        customer_id: dataCustomers[5].id,
        amount: 34577,
        status: 'pending',
        date: '2023-08-05',
      },
      {
        customer_id: dataCustomers[2].id,
        amount: 54246,
        status: 'pending',
        date: '2023-07-16',
      },
      {
        customer_id: dataCustomers[0].id,
        amount: 666,
        status: 'pending',
        date: '2023-06-27',
      },
      {
        customer_id: dataCustomers[3].id,
        amount: 32545,
        status: 'paid',
        date: '2023-06-09',
      },
      {
        customer_id: dataCustomers[4].id,
        amount: 1250,
        status: 'paid',
        date: '2023-06-17',
      },
      {
        customer_id: dataCustomers[5].id,
        amount: 8546,
        status: 'paid',
        date: '2023-06-07',
      },
      {
        customer_id: dataCustomers[1].id,
        amount: 500,
        status: 'paid',
        date: '2023-08-19',
      },
      {
        customer_id: dataCustomers[5].id,
        amount: 8945,
        status: 'paid',
        date: '2023-06-03',
      },
      {
        customer_id: dataCustomers[2].id,
        amount: 1000,
        status: 'paid',
        date: '2022-06-05',
      },
]

const dataRevenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export {dataUsers, dataCustomers, dataInvoices, dataRevenue};