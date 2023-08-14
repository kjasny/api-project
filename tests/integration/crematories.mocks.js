const crematoriesMock = [
  {
    name: 'Mt. Auburn Crematory',
    location: 'Cambridge',
    fieldMLIId: 1,
    logo: '/Images/Mt Auburn Crematory.png'
  },
  {
    name: 'Blue Hill Crematory',
    location: 'Braintree',
    fieldMLIId: 1,
    logo: '/Images/Blue Hill Crematory.jpeg'
  },
  {
    name: 'St. Michaels Cremaotry',
    location: 'Boston',
    fieldMLIId: 2,
    logo: '/Images/St. Michaels Crematory.png'
  },
  {
    name: 'Forest Hills Crematory',
    location: 'Boston',
    fieldMLIId: 2,
    logo: '/Images/Forest Hills Crematory.png'
  }
]

const singleWithIdCrematoryMock = {
  id: 8,
  name: 'Newton Crematory',
  location: 'Newton',
  fieldMLIId: 1,
  logo: '/Images/NewtonCrematory.jpeg'
}

const singleWithoutIdCrematoryMock = {
  name: 'Newton Crematory',
  location: 'Newton',
  fieldMLIId: 1,
  logo: '/Images/NewtonCrematory.jpeg'
}

const invalidCrematory = {
  name: 'Fake Crematory',
  location: 'Fakesville'
}

module.exports = { crematoriesMock, singleWithIdCrematoryMock, singleWithoutIdCrematoryMock, invalidCrematory }
