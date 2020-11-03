import React, {Component} from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator, Button,Alert, RefreshControl, AsyncStorage} from "react-native";
import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from 'prop-types';
import { deleteUser } from '../pages/utils';
import HeaderCustom from '../Headers'
import axios from 'axios'

var token = '';
export default class Corridas extends Component{

    constructor(props) {
        super(props);
        this.state = { 
            
            isLoading: true,
            CorridaParticular: [],
            expandedParticular : false,
            novaListaParticular: [],
            marcado: false,
            showAlert: false,
            token: '',

        
        }
    }
    UrlParticular = 'http://www.ipet.kinghost.net/api/corridas/CorridaParticular';
    

    _retrieveData = async () => {
        const value = '';
        
        await AsyncStorage.getItem('id_token').then((keyValue) => {
          token = keyValue;
           //console.log(token);
          }, (error) => {
          //console.log(error) //Display error
        });
        //console.log(await AsyncStorage.getItem())
        //console.log(value)
        
      
    };

   async componentDidMount() {
     await this._retrieveData();
      var bearer = 'Bearer ' + token;
      //console.log("token",token);
      
       
        fetch(this.UrlParticular,{
           method: "GET",
           credentials: 'include',
           headers: {           
            'Authorization': bearer
          }
         })
          
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("responsejson",responseJson)
            this.setState({
              isLoading: false,
              CorridaParticular: responseJson,
              } 
            );
          }
          )
          .catch((error) => {console.log("erro fetch",error)});
    
      
        };

      
  
  render() {
    
    console.disableYellowBox = true;

    if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
    
        return (
          

          
            <View style={styles.container}>     
                 <HeaderCustom  title={'CORRIDAS'} />  
            <View>
                        
       </View>  

       <View>
            <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpandParticular()}>
                <Text style={[styles.title]}>Corridas Pendentes</Text>
                
                <Icon name={this.state.expandedParticular ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.SLATEBLUE} />
            </TouchableOpacity>

            
            <View style={styles.parentHr}/>
            {
                this.state.expandedParticular &&
                <View style={{}}>
                    
                    <FlatList
                    data={this.state.CorridaParticular}
                    //numColumns={1}
                    extraData={this.state}
                    scrollEnabled={true}
                    keyExtractor={({item, index}) => index} 
                    renderItem={({item, index}) => 
                        <View>
                            <TouchableOpacity style={[styles.childRow, styles.button, item.controleValor ? styles.btnInActive : styles.btnActive]} onPress={()=>this.onClickParticular(index)}>
                                <Text style={[styles.font, styles.itemInActive]} >{item.endereco}, {item.numero}</Text>
                                <Icon name={'check-circle'} size={24} color={ item.controleValor ? Colors.LIGHTGRAY : Colors.SLATEBLUE} />
                            </TouchableOpacity>
                            
                            <View style={styles.childHr}/>
                        </View>
                    }

                    />
                </View>
            }

          
            
       </View> 

       <View style={styles.button}>
       
      {this.state.novaListaParticular.length > 0 &&
       
       
       <Button
       title="Iniciar Corrida"
       color='#836FFF'
       onPress={()=> this.props.navigation.navigate('Mapa',{resultado: this.state.novaListaParticular})}
       />



      }



  </View>
               
       </View>
    )
      
    
  }


 _addToArrayParticular = (corrida) => {
  let tmp = this.state.novaListaParticular
  tmp.push(corrida)
  this.setState({ novaListaParticular: tmp })
  //console.log("add",this.state.novaListaParticular)
}

_removeFromArrayParticular = (corrida) => {
  let tmp = this.state.novaListaParticular
  let index = tmp.indexOf(corrida);
  //console.log(index)
  if (index>-1){
      tmp.splice(index, 1);
      this.setState({ novaListaParticular: tmp })
  }

}

_removerMarcacoes = () =>{
  this.setState({novaListaParticular: []})
  this.setState({marcado: false})
  const temp = this.state.CorridaParticular;  
  temp.forEach(function(item) {
    item.controleValor = true;   
  })
  this.setState({CorridaParticular: this.state.CorridaParticular})
  this.setState({ 
    refreshing: !this.state.refreshing
})
}

  onClickParticular=(index)=>{

    const temp = this.state.CorridaParticular.slice();
    const marc = this.state.marcado;

    if(marc == false){
      if(temp[index].controleValor == false){
        temp[index].controleValor = !temp[index].controleValor
        this._removeFromArrayParticular(temp[index])  
        this.setState({CorridaParticular: temp})
        //console.log(temp[index].controleValor)
        }
        else {
          temp[index].controleValor = !temp[index].controleValor
          this._addToArrayParticular(temp[index])  
          this.setState({CorridaParticular: temp, marcado: true})
        }
    } else{
      Alert.alert(
        'Corridas',
        'Você deve selecionar apenas uma corrida.',
        [
          {text: 'Cancelar todas', onPress: () => this._removerMarcacoes()},                
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }

    
    }
    
  

  toggleExpandParticular=()=>{
    this.setState({expandedParticular : !this.state.expandedParticular})
  }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:Colors.PRIMARY,   
       },
    font:{
       // fontFamily: Fonts.bold,
    },
    button:{
        width:'100%',
        height:54,
        alignItems:'center',
        paddingLeft:35,
        paddingRight:35,
        fontSize: 12,
    },
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: Colors.SLATEBLUE,
    },
    itemActive:{
        fontSize: 12,
        color: Colors.GREEN,
    },
    itemInActive:{
        fontSize: 12,
        color: Colors.SLATEBLUE,
    },
    btnActive:{
        borderColor: Colors.GREEN,
    },
    btnInActive:{
        borderColor: Colors.SLATEBLUE,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: Colors.CGRAY,
    },
    childRow:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: Colors.GRAY,
    },
    parentHr:{
        height:1,
        color: Colors.WHITE,
        width:'100%'
    },
    childHr:{
        height:1,
        backgroundColor: Colors.LIGHTGRAY,
        width:'100%',
    },
    colorActive:{
        borderColor: Colors.SLATEBLUE,
    },
    colorInActive:{
        borderColor: Colors.SLATEBLUE,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
    
});

Corridas.navigationOptions = ({ navigation }) => {

  return {
    title: 'Corridas',
    headerBackTitleVisible: true,
    headerRight: () => (
      <TouchableOpacity
        onPress={() => (
          deleteUser().then(() => {
            navigation.navigate('AuthLoading')
          })
        )}
        style={{ marginRight: 10 }}
      >
        <Text>Sair</Text>
      </TouchableOpacity>
    ),
  };
  
};

Corridas.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};
