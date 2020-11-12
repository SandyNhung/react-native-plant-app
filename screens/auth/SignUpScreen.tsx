import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import Auth from '@aws-amplify/auth';

export default function SignUpScreen() {
  const [email, onChangeEmail] = React.useState('nhung.sandy@gmail.com');
  const [password, onChangePassword] = React.useState('New123');
  const [errorMessage, onChangeErrorMessage] = React.useState('');
  const [code, onChangeCode] = React.useState('');
  const [signUpState, onChangeSignUpState] = React.useState(true);

  const onPressSignUp = async () => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: { email: email },
      });
      onChangeSignUpState(true);
    } catch (err) {
      onChangeErrorMessage(err.message);
    }
  };

  const onPressVerify = async () => {
    try {
      await Auth.confirmSignUp(email, code);
      await Auth.signIn(email, password);
    } catch (err) {
      onChangeErrorMessage(err.message);
    }
  };
  const verifyCode = () => (
    <View style={styles.container}>
      <TextInput
        label=""
        value={code}
        mode="outlined"
        onChangeText={(text) => onChangeCode(text)}
      />
      <Button onPress={onPressVerify}>Submit</Button>
    </View>
  );

  if (signUpState) return verifyCode();
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
      <Button mode="outlined" onPress={onPressSignUp}>
        Sign Up
      </Button>
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
