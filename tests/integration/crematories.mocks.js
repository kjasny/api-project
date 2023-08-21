const crematoriesMock = [
  {
    name: 'Mt. Auburn Crematory',
    location: 'Cambridge',
    fieldMLIId: 1
  },
  {
    name: 'Blue Hill Crematory',
    location: 'Braintree',
    fieldMLIId: 1
  },
  {
    name: 'St. Michaels Cremaotry',
    location: 'Boston',
    fieldMLIId: 2
  },
  {
    name: 'Forest Hills Crematory',
    location: 'Boston',
    fieldMLIId: 2
  }
]

const singleWithIdCrematoryMock = {
  id: 8,
  name: 'Newton Crematory',
  location: 'Newton',
  fieldMLIId: 1
}

const singleWithoutIdCrematoryMock = {
  name: 'Newton Crematory',
  location: 'Newton',
  fieldMLIId: 1
}

const invalidCrematory = {
  name: 'Fake Crematory',
  location: 'Fakesville'
}

module.exports = { crematoriesMock, singleWithIdCrematoryMock, singleWithoutIdCrematoryMock, invalidCrematory }
