const fieldMLIsMock = [
  { firstName: 'Kalan', lastName: 'Jasny', route: 'MetroBoston' },
  { firstName: 'Alexi', lastName: 'Rebello', route: 'Boston' },
  { firstName: 'Justin', lastName: 'Breault', route: 'South Shore' },
]

const singleFieldMLIWithIdMock = [
  {
    id: 1,
    firstName: 'Kalan',
    lastName: 'Jasny',
    route: 'MetroBoston',
    createdAt: '2023-07-04T12:04:00.000Z',
    updatedAt: '2023-07-04T12:04:00.000Z',
    deletedAt: null,
    crematories: [
      {
        id: 1,
        name: 'Mt. Auburn Crematory',
        location: 'Cambridge',
        fieldMLIId: 1,
        createdAt: '2023-07-04T12:04:00.000Z',
        updatedAt: '2023-07-04T12:04:00.000Z',
        deletedAt: null,
      },
    ],
  },
]

const singleFieldMLIWithoutIdMock = {
  firstName: 'Kalan',
  lastName: 'Jasny',
  route: 'MetroBoston',
}

module.exports = {
  fieldMLIsMock,
  singleFieldMLIWithIdMock,
  singleFieldMLIWithoutIdMock,
}
