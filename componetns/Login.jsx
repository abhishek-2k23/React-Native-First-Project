/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  useColorScheme,
  ScrollView,
} from 'react-native';

import {useState, useEffect} from 'react';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';

const Login = ({navigation}) => {
  //to save the api response error
  const [error, setError] = useState(null);
  const [wait, setWait] = useState(false);

  //get the colorScheme
  const isDark = useColorScheme() === 'dark';

  //user login function
  const loginFunction = async (values, action) => {
    console.log(values);
    try {
      //set the button disable
      setWait(true);

      //sending the request with values
      const response = await fetch(
        'https://form-data-submission-2ew5.onrender.com/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );

      //response converted to json
      const result = await response.json();
      console.log('response : ', result);

      //if user matches credentials
      if (response.status === 200) {
        //navigate to home page
        Toast.show({
          type:'success',
          text1: 'success',
          text2: 'Login success full',
          topOffset: 60,
        });
        navigation.navigate('Home', {user: result?.user});
      } else {
        setError(result?.message);
        Toast.show({
          type:'error',
          text1: 'Error',
          text2: result?.message,
          topOffset: 60,

        });
      }

      setWait(false);
    } catch (err) {
      console.log('error  : ', err);
      setWait(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, []);
  return (
    <View style={styles.loginAppContainer}>
      <ScrollView>
        {/* login container  */}
        <View style={styles.loginFiedsContainer}>
          <Text
            style={[
              {fontSize: 30, fontWeight: 'bold', marginHorizontal: 5},
              isDark ? styles.WhiteText : styles.DarkText,
            ]}>
            Login
          </Text>
          <Text
            style={[
              {fontSize: 20, fontWeight: 'bold', marginHorizontal: 5},
              isDark ? styles.WhiteText : styles.DarkText,
            ]}>
            Please Sign in to continue.
          </Text>

          {/* form inputs */}
          <Formik
            initialValues={{Email: '', Password: ''}}
            onSubmit={(values, action) => loginFunction(values, action)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                <TextInput
                  onChangeText={handleChange('Email')}
                  onBlur={handleBlur('Email')}
                  value={values.Email}
                  placeholder="Enter your Email"
                  style={[styles.textInput, isDark && styles.WhiteText]}
                  placeholderTextColor={isDark ? '#fff' : '#000'}
                />
                <TextInput
                  onChangeText={handleChange('Password')}
                  onBlur={handleBlur('Password')}
                  value={values.Password}
                  placeholder="Enter your password"
                  secureTextEntry
                  style={[styles.textInput, isDark && styles.WhiteText]}
                  placeholderTextColor={isDark ? '#fff' : '#000'}
                />

                {/* login button  */}
                <Button
                  onPress={handleSubmit}
                  title="Login"
                  style={styles.buttonStyle}
                  disabled = {wait}
                />
              </View>
            )}
          </Formik>

          {/* if any error occurs  */}
          {error && (
            <Text
              style={{
                fontSize: 15,
                marginHorizontal: 5,
                textAlign: 'center',
                marginTop: 10,
                color: 'red',
              }}>
              {error}
            </Text>
          )}

          {/* forgot password button  */}
          <TouchableHighlight
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={[
                {
                  fontSize: 15,
                  marginHorizontal: 5,
                  textAlign: 'center',
                  marginTop: 10,
                  textDecorationLine: 'underline',
                },
                isDark && styles.WhiteText,
              ]}>
              Fogot Password
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>

      {/* //footer  */}
      <View style={styles.footer}>
        <Text
          style={[{fontSize: 15, color: 'grey'}, isDark && styles.WhiteText]}>
          New User ?
        </Text>
        <TouchableHighlight
          onPress={() => navigation.navigate('Register')}
          underlayColor={'white'}>
          <Text
            style={[
              {
                fontSize: 15,
                marginHorizontal: 5,
                textAlign: 'center',
                textDecorationLine: 'underline',
                color: 'black',
              },
              isDark && styles.WhiteText,
            ]}>
            Register
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  loginAppContainer: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
  },
  loginFiedsContainer: {
    flex: 10,
    padding: 8,
    marginTop: '20%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
    paddingLeft: 4,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  WhiteText: {
    color: '#fff',
    borderColor: '#fff',
  },
  DarkText: {
    color: '#000',
  },
});
