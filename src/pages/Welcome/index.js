import React, { useState } from 'react'
import { StackActions, NavigationActions } from 'react-navigation'
import { StatusBar, ActivityIndicator, AsyncStorage, Image, Alert} from 'react-native'
import PropTypes from 'prop-types'

import api from '../../Services'

import {
  Container,
  Title,
  TextInformation,
  Error,
  Form,
  Input,
  Button,
  ButtonText,
} from './styles'

export default function Welcome(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  var STORAGE_KEY = 'id_token';

  async function saveUser(user) {
    await AsyncStorage.setItem('@ListApp:userToken', JSON.stringify(user))
  }




   async function onValueChange(item, selectedValue) {
      try {
        await AsyncStorage.setItem(item, selectedValue);
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
    }


  async function signIn() {
    if (username.length === 0) return

    setLoading(true)

    try {

      const credentials = {
        email: username,
        password: password
      }

      const credential = {
        email: username,
        password: password
      }

      //const response = await api.post('/api/usuario/login', credentials)
      const response = await api.post('/v1/account/login', credential)
      //console.log("response:",response);
      

      const user = response.data
      await onValueChange('id_token',user.token)
      //await saveUser('id_token',user.token)
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'App', params: {credentials}})],
      })

      setLoading(false)
     // props.navigation.dispatch(setParamsAction)
      props.navigation.dispatch(resetAction)
    } catch (err) {
      //console.log(err)

      setLoading(false)
      setErrorMessage('Usuário ou Senha incorreta.')
    }




    

  }

  return (
    
    <Container>

      
<Image source={require('../../Assets/pngwing.com.png')}
       style={{
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        left:17
        

      }} />
      
      <StatusBar barStyle="light-content" />

      <Title>Bem-vindo</Title>
   

      <TextInformation>
        Para continuar, precisamos que você informe seu E-mail e Senha.
      </TextInformation>

      {!!errorMessage && <Error>{errorMessage}</Error>}

      <Form>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu CPF"
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          value={username}
          onChangeText={username => setUsername(username)}
        />

        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite sua senha"
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          secureTextEntry={true}
          value={password}
          onChangeText={password => setPassword(password)}
        />

        <Button onPress={signIn}>
          {loading ? (
            <ActivityIndicator size="small" color="#836FFF" />
          ) : (
            <ButtonText>Prosseguir</ButtonText>
          )}
        </Button>
      </Form>
    </Container>
   )
}

Welcome.navigationOptions = () => {
  return {
    headerShown: false,
  }
}

Welcome.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
}


