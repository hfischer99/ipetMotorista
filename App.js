
import Mapa from './src/Map';
import Corridas from './src/Corridas'
import Login from './src/pages/Welcome/'
import Registro from './src/pages/Usuario/register'
import Editar from './src/pages/Usuario/edit'
import Concluida from './src/Corridas/concluida'
import AuthLoadingScreen from './src/pages/AuthLoadingScreen'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import CustomDrawerContentComponent from './src/components/Drawer';



const MainStack = createDrawerNavigator({
  Corridas: {
    screen: Corridas,
  },
  Concluida: {
    screen: Concluida
  },
  Registro: {
    screen: Registro
  },
  Editar: {
    screen: Editar
  }
},
{
  initialRouteName: 'Corridas',
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: '#836FFF',
    activeBackgroundColor: '#e6e6e6',
  }
});

const StackNavigatorContainer = createAppContainer(MainStack);

const AuthStack = createStackNavigator(
  {
    SignIn: Login,
    App: StackNavigatorContainer,
    Mapa: Mapa
    // SignUp: RegisterUser
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
    header: null,
  },
);

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: StackNavigatorContainer,
    // Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const RootStackContainer = createAppContainer(RootStack);

export default RootStackContainer;
