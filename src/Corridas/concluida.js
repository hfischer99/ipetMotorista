//This is an example code to get DatePicker// 
import React, { Component } from 'react';
//import react in our code. 
import {View, StyleSheet,ActivityIndicator, Text, Image,FlatList, Alert} from 'react-native';
//import all the components we are going to use.
import DatePicker from 'react-native-datepicker';
//import DatePicker from the package we installed
import HeaderCustom from '../Headers'

import { ListItem } from 'react-native-elements'


export default class Concluida extends Component {
  constructor(props){
    super(props);
    this.state = {
        date: getCurrentDate(),
        concluida: [],
        novo: [],
        isLoading: true,   
    
    }    
  }
  UrlConcluida = 'http://www.ipet.kinghost.net/api/corridas/CorridaConcluida';

  componentDidMount() {
      
    fetch(this.UrlConcluida,{
       method: "GET",
       headers: {
         "Content-Type": "application/json"
       }
     })
      
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          concluida: responseJson,
          } 
        );
      }
      )
      .catch((error) => {console.error(error);});
      
    }
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
    <ListItem
    bottomDivider
    title={item.pet}
    subtitle={<Text>{`Cliente: ${item.cliente}\nEndereco: ${item.endereco}, ${item.numero}`}</Text>}
    
    leftAvatar={{
      
        size: 'medium',
        source: item.foto_pet && { uri: item.foto_pet },
        
        //title: item.pet[0]
      }}
    bottomDivider
    rightSubtitle={'R$ 100,00'}
    //chevron
    
  />
)
   
  render(){
    if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
    return (
        
      
      <View style={styles.titulo}>
      <HeaderCustom  title={'CORRIDAS CONCLUIDAS'} />  
          <View>
          <DatePicker
          style={styles.picker}
          date={this.state.date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01-01-2020"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <View style={styles.container}>
 
    </View>
    <FlatList
      keyExtractor={this.keyExtractor}
      data={this.state.concluida.filter(x => x.data_corrida == this.state.date)}
      renderItem={this.renderItem}
    />

    
          </View>

      
      </View>
      
    )
    
  }
}

const getCurrentDate=()=>{

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
 

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}
  
const styles = StyleSheet.create ({
 titulo: {
    flex: 1,

 },
 picker: {
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingLeft:30,
    width: 200
    
 },
 container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  avatar: {
    width: 50,
    height: 50
  },
})
