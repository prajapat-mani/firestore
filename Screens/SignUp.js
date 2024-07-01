import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useId, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import uuid from "react-native-uuid"


const SignUp = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const navigation=useNavigation()



    const saveData=()=>{
      const UserId=uuid.v4()
        firestore()
  .collection('Users').doc(UserId)
  .set({
    name: name,
    email: email,
    password: password,
    UserId:UserId
  })
  .then(() => {
    console.log('User added!');
    navigation.goBack()
  });

    }
  return (
    <View style={{flex:1}}>

      <Text style={{alignSelf:"center",fontSize:20,marginTop:100,fontWeight:"800"}}>Firebase</Text>
      <TextInput value={name} onChangeText={txt=> setName(txt)} placeholder='Name' style={{alignSelf:'center',marginTop:100,height:50,width:"84%",borderWidth:.5,borderRadius:10,padding:10}} />

      <TextInput value={email} onChangeText={txt=> setEmail(txt)} placeholder='Enter Email Id' style={{alignSelf:'center',marginTop:20,height:50,width:"84%",borderWidth:.5,borderRadius:10,padding:10}} />
      <TextInput value={password} o
    
      nChangeText={txt=> setPassword(txt)} placeholder='Password' style={{alignSelf:'center',marginTop:20,height:50,width:"84%",borderWidth:.5,borderRadius:10,padding:10}} />
      
      <TouchableOpacity onPress={()=>{
        saveData()
        }} style={{alignSelf:'center',marginTop:20,height:50,width:"84%",borderWidth:.5,borderRadius:10,justifyContent:"center",alignItems:"center",backgroundColor:"orange"}}>
    <Text style={{fontSize:20,color:"#000"}}>SignUp</Text>
      </TouchableOpacity>

    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({})