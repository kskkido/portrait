const grey2 = '#D2CBCB'
    , grey1 = '#e8e5e6'
    , grey3 = '#e3e1dd'
    , grey4 = '#ecf0f1'

const blue1 = '#29b6f6'
    , blue2 = '#4fc3f7'
    , blue3 = '#4dd0e1'
    , blue4 = '#26c6da'

const red3 = '#ffbcaf'
    , red2 = '#ef9a9a'
    , red1 = '#ff8a80'

const purple1 = '#ffb74d'
    , purple2 = '#ffcc80'
    , purple3 = '#ffd54f'
    , purple4 = '#ffca28'

export const viewData = {
  home: {
    text: ['Keisuke Kido', 'Developer'],
    path: '/',
    navigationList: ['WELCOME', 'ABOUT', 'PROJECTS', 'CONTACT'],
    children: [],
    backgroundColor: [grey1, blue1, red1, purple1],
    secondaryColor: '#BDBDBD'
  },
  about: {
    text: ['About'],
    path: '/about',
    navigationList: ['WHO', 'WHAT', 'WHERE', 'WHEN'],
    children: ['WHO', 'WHAT', 'WHERE', 'WHEN'],
    backgroundColor: [blue1, blue2, blue3, blue4],
    secondaryColor: '#2196f3'
  },
  projects: {
    text: ['Projects'],
    path: '/projects',
    navigationList: ['AUDIOSPHERE', 'STACKQUEST', 'PORTFOLIO'],
    children: ['AUDIOSPHERE', 'STACKQUEST', 'PORTFOLIO'],
    backgroundColor: [red1, red2, red3],
    secondaryColor: '#e57373'
  },
  contact: {
    text: ['Contact'],
    path: '/contact',
    navigationList: ['NAME', 'EMAIL', 'MESSAGE', 'SUBMIT'],
    children: ['NAME', 'EMAIL', 'MESSAGE', 'SUBMIT'],
    backgroundColor: [purple1, purple2, purple3, purple4],
    secondaryColor: '#ffa726'
  }
}


// const cyan = '#66D7D1'
//     , orange = '#FC7753'
//     , blue = '#42CAFD'
//     , skyBlue = '#2EC4B6'
//     , rouge = '#FDF5BF'
//     , green = '#C2EFB3'
//     , yellow = '#F7F052'
//     , purple = '#9DACFF'
//     , lightGreen = '#94E8B4'
//     , slimeGreen = '#7DDF64'
//     , red = '#E3170A'
//     , cyanLight = '#A9E5BB'
//     , skin = '#FCF6B1'
//     , yellowLight = '#F7B32B'
//     , cloud = '#e8e5e6'
