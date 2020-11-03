
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Header } from "react-native-elements";


const Headerx = ({ title }) => {
  return (
      
    <Header style={styles.headerContainer}
    placement="center"
    statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
    containerStyle={{ width: '100%', backgroundColor: '#836FFF'}}
    centerComponent={{ text: title, style: { color: '#fff' } }}
    rightComponent={{ icon: 'pets', color: '#fff'}}
  />
  );
 
}

const styles = StyleSheet.create({
    headerContainer: {
      height: Platform.select({
          android: 56,
          default: 44,
        }),
    },
  });
export default Headerx