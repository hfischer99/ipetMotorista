import { Navigation } from 'react-native-navigation'


export const goMap = () => Navigation.setRoot({
    root: {
      stack: {
        id: 'App',
        children: [
          {
            component: {
              name: 'Map',
            }
          }
      ],
      }
    }
  })