import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Check if user data is stored in AsyncStorage
        const checkUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    // Navigate to HomePage if user data is found
                    navigation.navigate("BottomTabs");
                }
            } catch (error) {
                console.log(error);
            }
        };

        checkUser();
    }, []);

    const saveData = () => {
        firestore()
            .collection('Users')
            .where('email', '==', email)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.docs.length > 0) {
                    const userData = querySnapshot.docs[0]._data;
                    if (userData.email === email && userData.password === password) {
                        // Save user data in AsyncStorage
                        AsyncStorage.setItem('user', JSON.stringify(userData))
                            .then(() => {
                                Alert.alert("Success", "User successfully logged in");
                                navigation.navigate("BottomTabs");
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    } else {
                        Alert.alert("Error", "Email and password do not match");
                    }
                } else {
                    Alert.alert("Error", "Account not found");
                }
            })
            .catch(error => {
                Alert.alert("Error", "Something went wrong. Please try again later.");
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Firebase</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder='Enter Email Id'
                style={styles.input}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                style={styles.input}
                secureTextEntry
            />
            <TouchableOpacity onPress={saveData} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.link}>
                <Text style={styles.linkText}>Create New Account</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 100,
        fontWeight: '800',
    },
    input: {
        alignSelf: 'center',
        marginTop: 20,
        height: 50,
        width: '84%',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
    },
    button: {
        alignSelf: 'center',
        marginTop: 20,
        height: 50,
        width: '84%',
        borderWidth: 0.5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    buttonText: {
        fontSize: 20,
        color: '#000',
    },
    link: {
        alignSelf: 'center',
        marginTop: 20,
        height: 50,
        width: '84%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 20,
        color: '#000',
        textDecorationLine: 'underline',
    },
});
