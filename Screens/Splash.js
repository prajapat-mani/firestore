import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
  const navigation=useNavigation()

  useEffect(()=>{
setTimeout(() => {
  navigation.navigate("Login")
}, 3000);
  },[])
  return (
    <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
      <Text style={{fontSize:30,fontWeight:"900",color:"#000"}}>Firebase</Text>
      <Text style={{fontSize:14,fontWeight:"900", color:"red"}}>The Social App</Text>

    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})