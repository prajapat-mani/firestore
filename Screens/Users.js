import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Firestore } from '@react-native-firebase/firestore'
import firestore from "@react-native-firebase/firestore"
import Icon from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native'

const Users = () => {
    Id=""
    const navigation=useNavigation()
    const [users, setUsers] = useState([])
    const [ids,setIds]=useState('')

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        let tempData = []
        const data = await AsyncStorage.getItem("user")
        const res = JSON.parse(data)
        Id=res?.UserId
        setIds(Id)
        const email = res.email
        firestore()
            .collection("Users")
            .where("email", "!=", email)
            .get()
            .then(res => {
                if (res.docs != []) {
                    res.docs.map((item, index) => {
                        tempData.push(item.data())
                    })
                    setUsers(tempData)
                }
            })
    }
  
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ elevation: 5, width: "100%", height: 50, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>

                <Text style={{ fontWeight: "600", color: "purple", fontSize: 20 }}>Chat App</Text>
            </View>

            <FlatList data={users} renderItem={({ item,index }) =>
{
    return(
        <TouchableOpacity 
        onPress={()=>{
            navigation.navigate("Message",{data:item,Id:ids})
        }}
        style={{width:"90%",alignSelf:"center",borderWidth:.5,borderRadius:10,height:50,marginTop:10,padding:10,flexDirection:"row",alignItems:'center'}}>
            <Icon name="user" size={30}/>
<Text style={{marginLeft:20,fontSize:20}}>{item.name}</Text>

        </TouchableOpacity>
    )
}
            }
            />
        </View>
    )
}

export default Users

const styles = StyleSheet.create({})