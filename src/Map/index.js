import React, { Component } from "react";
import { Dimensions, StyleSheet, View, ActivityIndicator,TouchableOpacity, Text, Alert } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Permission from 'expo-permissions';
import { Header } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyDvLB0-wwWF4Y97bf7E-nfI_ZJNE4fTJ6Y";

class Example extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      corridas: this.props.navigation.state.params.resultado,
      coordinates: [

      ],
      guardaposicao: [


      ]
    
      
    };
    this.mapView = null;
  }


  componentDidUpdate(){
    
    if(this.props.navigation.state.params.resultado != this.state.corridas){
      //this.setState({corridas: this.props.navigation.state.params.resultado})
      const corridax = this.props.navigation.state.params.resultado;
      const trajetox = corridax[0];
      var latitude = parseFloat(trajetox.latitude);
      var longitude = parseFloat(trajetox.longitude);
      var nome = trajetox.cliente;
      var pet = trajetox.pet; 
      var novoTrajeto = {latitude,longitude,nome,pet}
      this.setState({coordinates: [...this.state.guardaposicao, novoTrajeto],corridas: this.props.navigation.state.params.resultado})  
      
    }
    
  }


_teste(){
  const pegaid = this.props.navigation.state.params.resultado;
  const idpega = pegaid[0];
  var id = parseInt(idpega.Id);

  fetch('http://www.ipet.kinghost.net/api/corridas/EncerraCorrida',{
    method: "POST",
    credentials: 'include',
    headers: {           
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id)
  })
   
   .then((response) => response.json())
   .then((responseJson) => {
     console.log("responsejson",responseJson)
     Alert.alert(
      "Encerrando corrida",
      "Deseja encerrar essa corrida?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.props.navigation.goBack() }
      ],
      { cancelable: false }
    );

   }
   )
   .catch((error) => {console.log("erro fetch",error)});

  

}

   async componentDidMount() {

        await Permission.askAsync(Permission.LOCATION);
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
              var x = {latitude,longitude}
                this.setState({
                  isLoading: false,
                    coordinates: [...this.state.coordinates, x],
                    guardaposicao: [x]                  

                    
                });

            }, 
            () => { }, //erro
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
        const corridas = this.state.corridas;
        const trajeto = corridas[0];
        var latitude = parseFloat(trajeto.latitude);
        var longitude = parseFloat(trajeto.longitude);
        var nome = trajeto.cliente;
        var pet = trajeto.pet; 
        var teste = {latitude,longitude,nome,pet}
        this.setState({coordinates: [...this.state.coordinates, teste]})   


        //console.log("montei2", this.state.coordinates)


    }
	
  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate]
    });

  };
  



  render() {
    console.log(this.state.coordinates);
    const mapStyles = {
      width: '100%',
      height: '80%'
    };
    
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
  
  
    return (
         
      
      
      
      <View style={styles.container}>   
      <Header style={styles.headerContainer}
    placement="center"
    statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
    containerStyle={{ width: '100%', backgroundColor: '#836FFF'}}
    centerComponent={{ text: 'TRAJETO', style: { color: '#fff' } }}
    leftComponent={<Ionicons name="md-arrow-round-back" size={25} color="white" onPress={() => this.props.navigation.goBack()}/>}
    rightComponent={<Ionicons name="md-checkmark-circle" size={25} color="white"onPress={() => this._teste()}/>}

    />

        <MapView
          showsUserLocation={true}
          style={StyleSheet.absoluteFill}
          ref={c => this.mapView = c}
          //onPress={this.onMapPress}
          style={mapStyles}
          loading={true}
          followUserLocation={true}
          //onUserLocationChange={event => console.log(event.nativeEvent)}
        >
          
          {this.state.coordinates.map((coordinate, index) =>
          
            <MapView.Marker key={`coordinate_${index}`}
            coordinate={coordinate} 
            icon={require('../Assets/petpata.png')}
            title={coordinate.nome}
            description={coordinate.pet} />
          )}
          {(this.state.coordinates.length >= 2) && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={this.state.coordinates}
              destination={this.state.coordinates[this.state.coordinates.length-1]}
              params={
                [
                    {
                        key: "travelmode",
                        value: "driving"        
                      },
                      {
                        key: "dir_action",
                        value: "navigate"       
                      }
                ]
            }
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="#222"
              timePrecision="now"
              //precision="high"
              optimizeWaypoints={true}
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={result => {
                this.setState({distancia:`: ${Math.floor(result.distance)} Km`});
                this.setState({tempo:`: ${Math.floor(result.duration)} Minutos.`});
  
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20),
                  }
                });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
		
		<View style={styles.buttonContainer}>

          <TouchableOpacity style={[styles.bubble, styles.button]}>
			<Text>Distância total{this.state.distancia}</Text>
            <Text>Duração de viagem{this.state.tempo}</Text>
          </TouchableOpacity>
        </View>
      </View>

        
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      ...StyleSheet.absoluteFillObject,
      justifyContent: "flex-end",
      alignItems: "center"
     },     
     headerContainer: {
      height: Platform.select({
          android: 56,
          default: 44,
        }),
    },
    bubble: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,0.7)",
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20
    },
    latlng: {
      width: 200,
      alignItems: "stretch"
    },
    button: {
      width: 80,
      paddingTop:1,
      paddingHorizontal: 12,
      alignItems: "center",
      marginHorizontal: 10
    },
    buttonContainer: {
      flexDirection: "row",
      marginVertical: 15,
      backgroundColor: "transparent",
      height: 40
    }

  
});

export default Example;