import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import HomePage from './Screens/HomePage';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import GoogleLogin from './GoogleLogin';
import BottomTabs from './Screens/BottomTabs';
import Message from './Screens/Message';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>

        <Stack.Screen
          name="splash"
          component={Splash}
          options={{title: 'Welcome'}}
        />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />

        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Message" component={Message} options={{headerShown:true}}/>



      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App