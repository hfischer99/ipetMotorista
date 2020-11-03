import React, { useEffect } from 'react';
import moment from 'moment';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';

export default function AuthLoadingScreen(props) {

  useEffect(() => {
    async function handleUserNextScreen() {
    
      const userToken = await AsyncStorage.getItem('@ListApp:userToken');
      //console.log(String(userToken))
      var obj = JSON.parse(userToken);
      if(obj == null){
        props.navigation.navigate('Auth'); 
      }else{
        let valorconvertidohoras = moment.utc(obj.expiration, "YYYY-MM-DDTHH:mm:ss").format('HH:mm');
        let valorconvertidodata = moment.utc(obj.expiration, "YYYY-MM-DDTHH:mm:ss").format('DD');
        let datatoken = parseInt(valorconvertidodata);
        var data = new Date();
        var dataatual = parseInt(data)

        if(valorconvertidohoras <= getCurrentDate() && datatoken < dataatual ){
          console.log("expirado vai para tela de login")
          props.navigation.navigate('Auth');  
        } else{
          console.log("token valido fica na tela do app")
          props.navigation.navigate('App');  
        }
      }
      
     

      //console.log(getCurrentDate())
      
      //console.log(a);
      
    }

    handleUserNextScreen();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}


const getCurrentDate=()=>{

  var hours = new Date().getHours();
  var minutes = new Date().getMinutes();
  return hours + ':' + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes();//format: dd-mm-yyyy;
}

AuthLoadingScreen.navigationOptions = () => {
  return {
    header: null,
  };
};