import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import Auth from '@aws-amplify/auth';
import * as Google from 'expo-google-app-auth';
import { config } from '../../config';

export default function SignInScreen({
  navigation,
  signIn,
}: {
  navigation: any;
  signIn: (id: string) => void;
}) {
  const [email, onChangeEmail] = React.useState('nhung.sandy@gmail.com');
  const [password, onChangePassword] = React.useState('New1234@');
  const [errorMessage, setErrorMessage] = React.useState('');

  const onPressSignIn = async () => {
    await Auth.signIn(email, password).then((res) => {
      signIn(res.getUsername());
    });
  };

  const onPressSignUp = () => {
    navigation.navigate('SignUp');
  };

  const googleSignIn = async () => {
    try {
      console.log('signin');
      const result = await Google.logInAsync(config);
      console.log(result);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sciar</Text>
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={(text) => onChangeEmail(text)}
      />
      <TextInput
        label="Password"
        value={password}
        mode="outlined"
        onChangeText={(text) => onChangePassword(text)}
      />
      <Button mode="outlined" onPress={onPressSignIn}>
        Sign in
      </Button>
      <Button onPress={googleSignIn}>Signin Google</Button>
      <Button onPress={onPressSignUp}>Register new user</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    padding: 4,
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
