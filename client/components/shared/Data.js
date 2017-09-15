const home = '#e8e5e6'

const ABOUT1 = '#29b6f6'
    , ABOUT2 = '#4fc3f7'
    , ABOUT3 = '#4dd0e1'
    , ABOUT4 = '#26c6da'

const PROJECTS3 = '#ffbcaf'
    , PROJECTS2 = '#ef9a9a'
    , PROJECTS1 = '#ff8a80'

const CONTACT1 = '#ffb74d'
    , CONTACT2 = '#ffcc80'
    , CONTACT3 = '#ffd54f'
    , CONTACT4 = '#ffca28'
    , CONTACT5 = '#ffb300'

export const viewData = {
  home: {
    text: ['Keisuke Kido', 'Developer'],
    path: '/',
    navigationList: ['WELCOME', 'ABOUT', 'PROJECTS', 'CONTACT'],
    children: [],
    backgroundColor: [home, ABOUT1, PROJECTS1, CONTACT1],
    secondaryColor: '#BDBDBD'
  },
  about: {
    text: ['About'],
    path: '/about',
    navigationList: ['WHO', 'WHAT', 'WHERE', 'WHEN'],
    children: ['WHO', 'WHAT', 'WHERE', 'WHEN'],
    backgroundColor: [ABOUT1, ABOUT2, ABOUT3, ABOUT4],
    secondaryColor: '#2196f3'
  },
  projects: {
    text: ['Projects'],
    path: '/projects',
    navigationList: ['AUDIOSPHERE', 'STACKQUEST', 'PORTFOLIO'],
    children: ['AUDIOSPHERE', 'STACKQUEST', 'PORTFOLIO'],
    backgroundColor: [PROJECTS1, PROJECTS2, PROJECTS3],
    secondaryColor: '#e57373'
  },
  contact: {
    text: ['Contact'],
    path: '/contact',
    navigationList: ['NAME', 'EMAIL', 'MESSAGE', 'SUBMIT', 'SOCIAL'],
    children: ['NAME', 'EMAIL', 'MESSAGE', 'SUBMIT', 'SOCIAL'],
    backgroundColor: [CONTACT1, CONTACT2, CONTACT3, CONTACT4, CONTACT5],
    secondaryColor: '#ffa726'
  }
}
