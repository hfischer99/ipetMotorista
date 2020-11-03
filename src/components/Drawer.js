import React, { Component } from 'react';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer'
import { Avatar, Divider, Icon, Overlay } from 'react-native-elements';
import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { deleteUser } from '../pages/utils';



export default class CustomDrawerContentComponent extends Component {


    
  constructor(props) {
    super(props);
    this.state = { 
        
        info: this.props.navigation.getParam('credentials'),

    }
}


    render() {
      //console.log(this.state.info)
      const { navigation } = this.props;
      const ripple = TouchableNativeFeedback.Ripple('#adacac', false);     
          return (

            this.state.info ?
(
<View style={{ flex: 1 }}>
            
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View style={[ styles.containHeader, { backgroundColor: '#FFFFFF'}]}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80,  color: '#836FFF'}} />
          
            <Text style={{ color: '#836FFF', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>{`Olá ${this.state.info.email},`}</Text>

          
          <Text style={{ color: '#836FFF', fontFamily: 'sans-serif-condensed' }}>{`Seja bem-vindo(a)`}</Text>
          
        </View>
      </View>

      <DrawerItems {...this.props} />
      <View>
        <View style={{ marginTop: '2%' }}>
          <Divider style={{ backgroundColor: '#836FFF' }} />
        </View>
        <View style={{ marginTop: '3%' }}>
          
        </View>
        <View style={{ marginTop: '5%' }}>
          
        </View>
      </View>
    </SafeAreaView>
  </ScrollView>

  <View elevation={6} style={{ backgroundColor: '#836FFF' }}>
    
    <TouchableNativeFeedback background={ripple} onPress={() => (
    deleteUser(), this.props.navigation.navigate('AuthLoading')
  )}>
      <View style={styles.containDrawerOption}>
        <Icon
          name='logout'
          type='simple-line-icon'
          size={20}
          color={'#836FFF'}
          containerStyle={{ marginRight: '10%' }}
        />
        <Text style={{ color: '#836FFF', fontFamily: 'sans-serif-medium' }}>Logout</Text>
        
      </View>
      
    </TouchableNativeFeedback>
    


  </View>

</View>)           
            : (
              deleteUser(), this.props.navigation.navigate('AuthLoading')
          ));
        
        


      
      
      
    
  }
}
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containHeader: {
      paddingTop: '4%',
      paddingBottom: '4%'
    },
    containDrawerOption: {
      paddingLeft: '10%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: '1%',
      paddingBottom: '10%',
      backgroundColor: '#e6e6e6',
      
      
    },
    headerText: {
      textAlign: 'center',
      fontFamily: 'sans-serif-medium',
      fontWeight: '600',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 50
    },
    actionText: {
      textAlign: 'center',
      fontFamily: 'sans-serif-medium',
      fontWeight: '600',
      marginRight: '3%',
      marginLeft: '3%',
    },
    closeBtn: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 17,
    },
    closeText: {
      fontFamily: 'sans-serif-medium',
      fontWeight: '600',
      marginRight: '3%',
      marginLeft: '3%',
    }
  });

    

  