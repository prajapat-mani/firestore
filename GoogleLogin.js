import React, {useRef, useEffect, useState} from 'react';
import { StyleSheet, View, Text, Dimensions, ImageBackground, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Login = ({navigation}) => {

    const webClientId = "286803464575-uh2ji3cmnigt21ems9308lsp4hhb46n8.apps.googleusercontent.com"; 

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: webClientId,
        })
    },[])

    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();


            const userInfo = await GoogleSignin.signIn();

            console.log("userinfo", userInfo);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error)
            } else {
            console.log(JSON.stringify(error),"error")

            }
        }
      };
    return(
      <View style={{margin:20}}>
          <Pressable onPress={googleLogin}>
              <View style={styles.loginButton}>
                <View style={{marginLeft:5}}>
                    <Text style={{color: '#222222',fontWeight:'400',fontSize:18}}>
                        Login with Google
                    </Text>
                </View>
              </View>
          </Pressable>
      </View>
    );
}

const styles= StyleSheet.create({
    loginButton: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFFFFF",
        width:screenWidth-50,
        height:48,
        borderRadius:10
    }
});

export default Login;