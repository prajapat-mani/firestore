import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
  webClientId:
    '286803464575-31k6ooem1ojb6laope2itj69v3odkvtk.apps.googleusercontent.com',
    
});
const GoogleLogin = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '286803464575-31k6ooem1ojb6laope2itj69v3odkvtk.apps.googleusercontent.com',
    });
  }, []);
  const onSignOut = async () => {
    try {
      await auth().signOut();
      // Sign out from Google
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('User signed out!');
    } catch (error) {
      console.error(error);
    }
  };
  const onGoogleButtonPress = async () => {
    // Get the user's ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };
  return (
    <View>
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress()
            .then(response => console.log('Signed in with Google!', response))
            .catch(err =>
              console.log('THIS WAS THE ERROR IN LOGGING IN USING GOOGLE', err),
            )
        }
      />
      <Button
        title="Google Sign-Out"
        onPress={() =>
          onSignOut()
            .then(response => console.log('Signed out with Google!', response))
            .catch(err =>
              console.log(
                'THIS WAS THE ERROR IN LOGGING  UOUTSING GOOGLE',
                err,
              ),
            )
        }
      />
    </View>
  );
};
export default GoogleLogin;