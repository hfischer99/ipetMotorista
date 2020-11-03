import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'

import api from '../../Services'
import { deleteUser } from '../../pages/utils'

import { Container, Title, Button, ButtonText, ProductList } from './styles'

export default function Home() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

return(
    <Text>teste</Text>
)

}

Home.navigationOptions = ({ navigation }) => {

  return {
    title: 'Home',
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

Home.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};