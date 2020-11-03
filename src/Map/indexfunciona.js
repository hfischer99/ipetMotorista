import React, { Component } from "react";
import { Dimensions, StyleSheet, View, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Permission from 'expo-permissions';

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyAgE5ecY7pwRzmzTk4cVg4RDWQ-PslNY0c";

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      corridas: this.props.navigation.state.params.resultado,
      coordinates: [
      ]
      
    };
    this.mapView = null;
  }
  
   async componentDidMount() {
      //console.log("vamos ver", this.state.coordinat)
        await Permission.askAsync(Permission.LOCATION);
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
              var x = {latitude,longitude}
                this.setState({
                  isLoading: false,
                    coordinates: [...this.state.coordinates, x]
                    

                        //latitudeDelta: 0.0143,
                        //longitudeDelta: 0.0134
                    
                });
                //console.log("agora vai",this.state.coordinates)
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
        var teste = {latitude,longitude}
        //console.log("opa",teste)
        this.setState({coordinates: [...this.state.coordinates, teste]})
        //console.log("segundo",this.state.coordinates)     



    }
	
  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate]
    });

  };


  
  render() {

    const { region} = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

        <MapView
          style={StyleSheet.absoluteFill}
          ref={c => this.mapView = c}
          onPress={this.onMapPress}
        >
          
          {this.state.coordinates.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
          )}
          {(this.state.coordinates.length >= 2) && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={this.state.coordinates}
              destination={this.state.coordinates[this.state.coordinates.length-1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)
  
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
    );
  }
}


export default Example;