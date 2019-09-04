import { svgIcons } from '@/assets/icons.js'
export const apiCards = [
  {
    title: 'Game of Thrones',
    description:
      "An API of Ice And Fire is the world's greatest source for quantified and structured data from the universe of Ice and Fire (and the HBO series Game of Thrones). We give you access to data about all the Books, Characters and Houses in an easy to use JSON format.",
    link: 'https://anapioficeandfire.com/',
    icon: svgIcons.gameOfThrones,
    color: '#9FA8DA',
    requests: [
      'https://www.anapioficeandfire.com/api',
      'https://www.anapioficeandfire.com/api/books',
      'https://www.anapioficeandfire.com/api/books/1'
    ]
  },
  {
    title: 'Star Wars',
    description:
      "The Star Wars API is the world's first quantified and programmatically-accessible data source for all the data from the Star Wars canon universe! We've taken all the rich contextual stuff from the universe and formatted into something easier to consume with software. Then we went and stuck an API on the front so you can access it all!",
    link: 'https://swapi.co/',
    icon: svgIcons.starWars,
    color: '#AAAAAA',
    requests: [
      'https://swapi.co/api/planets/3/',
      'https://swapi.co/api/starships/9/',
      'https://swapi.co/api/someIncorrectUrl',
      'https://swapi.co/api/people/1/'
    ]
  },
  {
    title: 'Work Calendar',
    description:
      'How many holidays in Russia! This is a service that defines a business day or a day off. It use open data from data.gov.ru site.',
    link: 'https://github.com/egno/work-calendar',
    icon: svgIcons.workCalendar,
    color: '#FFEBEE',
    requests: [
      'https://datazen.katren.ru/calendar/day/',
      'https://datazen.katren.ru/calendar/day/2018-06-09/',
      'https://datazen.katren.ru/calendar/day/2018-01-01/'
    ]
  },
  {
    title: 'CoinGecko',
    description:
      'Access CoinGecko data such as live pricing, trading volume, tickers, exchanges, historical data, coin info & images, developer & community stats, events, global markets, and CoinGecko Beam coins & exchanges status updates directly.',
    link: 'https://www.coingecko.com/api/documentations/v3#/',
    icon: svgIcons.coinGecko,
    color: '#AAE7AC',
    requests: [
      'https://api.coingecko.com/api/v3/ping',
      'https://api.coingecko.com/api/v3/coins/list',
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    ]
  },
  {
    title: 'Open Brewery DB',
    description:
      'Open Brewery DB is a free API for public information on breweries, cideries, brewpubs, and bottleshops. Currently it is focused to the United States, but future plans are to import world-wide data.',
    link: 'https://www.openbrewerydb.org/',
    icon: svgIcons.brewery,
    color: '#FDEEB6',
    requests: [
      'https://api.openbrewerydb.org/breweries?by_state=new_york',
      'https://api.openbrewerydb.org/breweries?by_tag=patio',
      'https://api.openbrewerydb.org/breweries/5494',
      'https://api.openbrewerydb.org/breweries/search?query=dog'
    ]
  },
  {
    title: 'Rick and Morty',
    description:
      'The Rick and Morty API (or ShlaAPI) is a RESTful and GraphQL API based on the television show Rick and Morty. You will have access to about hundreds of characters, images, locations and episodes. We are still gathering data, because as you probably know, there are trillions of characters and locations. The Rick and Morty API is filled with canonical information as seen on the TV show.',
    link: 'https://rickandmortyapi.com/',
    icon: svgIcons.rickAndMorty,
    color: '#81D4FA',
    requests: [
      'https://rickandmortyapi.com/api/character/',
      'https://rickandmortyapi.com/api/character/2',
      'https://rickandmortyapi.com/api/location/3,21',
      'https://rickandmortyapi.com/api/episode/28'
    ]
  },
  {
    title: 'Kanye.rest',
    description:
      'A free REST API for random Kanye West quotes (Kanye as a Service)',
    link: 'https://kanye.rest/',
    icon: svgIcons.default,
    color: '#CFD8DC',
    requests: ['https://api.kanye.rest', 'https://api.kanye.rest']
  },
  {
    title: 'Balldontlie',
    description: 'Ballldontlie provides access to stats data from the NBA.',
    link: 'http://www.balldontlie.io/',
    icon: svgIcons.default,
    color: '#CFD8DC',
    requests: [
      'https://www.balldontlie.io/api/v1/players',
      'https://www.balldontlie.io/api/v1/players/237',
      'https://www.balldontlie.io/api/v1/teams',
      'https://www.balldontlie.io/api/v1/teams/14'
    ]
  },
  {
    title: 'Relink',
    description: 'Free and secure URL shortener.',
    link: 'https://rel.ink/',
    icon: svgIcons.default,
    color: '#CFD8DC',
    requests: [
      'https://rel.ink/api/links/Nn8y9p/',
      'https://rel.ink/api/links/kGX2Xn/'
    ]
  }
]
