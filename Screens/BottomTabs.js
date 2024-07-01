import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/AntDesign"
import Users from './Users'
import Setting from './Setting'

const BottomTabs = () => {

const [selectedTab,setSelectedTab]=useState(0)

  return (
    <View style={{flex:1}}>
{selectedTab==0?<Users/>:<Setting/>}

<View style={styles.BottomTabs}>
<TouchableOpacity style={styles.tab}
onPress={()=>setSelectedTab(0)

}
>
    <Icon name="user" size={30} style={{color:selectedTab==0?"white":"grey"}} />
</TouchableOpacity>
<TouchableOpacity style={styles.tab}
onPress={()=>setSelectedTab(1)}

>

    <Icon name="setting" size={30} style={{color:selectedTab==1?"white":"grey"}}/>
</TouchableOpacity>

    </View>  
      </View>
  )
}

export default BottomTabs

const styles = StyleSheet.create({
BottomTabs:{
    position:'absolute',
    backgroundColor:"purple",
    bottom:0,
    width:"100%",
    height:70,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-evenly"
},
tab:{
    alignItems:"center",
    height:"100%",
    width:"50%",
    justifyContent:"center"
}

})