import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Setting = () => {
  const navigation = useNavigation();
const Logout=()=>{
  AsyncStorage.removeItem("user")

  
  navigation.navigate("Login")
}

  return (
    <View>
      <Text>Setting</Text>

      <Button title='Logout' onPress={Logout}/>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({})