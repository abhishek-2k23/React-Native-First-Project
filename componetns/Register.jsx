/* eslint-disable prettier/prettier */
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
  useColorScheme,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {useState} from 'react';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

//main function ->>>>>>>>>>>>>>>
const Register = ({navigation}) => {
  //to save the api response error
  const [error, setError] = useState();
  const [wait,setWait] = useState(false);

  //color scheme
  const isDark = useColorScheme() === 'dark';

  //new user data validation
  const userSchema = Yup.object().shape({
    firstName : Yup.string('only characters acceptable').min(2).required('first name required'),
    lastName : Yup.string('only characters acceptable').required('last name required'),
    Age : Yup.number('only positive numbers acceptable').min(0).required('Age required'),
    gender : Yup.string('only letters acceptable').required('gender required'),
    Email : Yup.string('Enter email').email('must be a valid email'
    ).required(),
    Password : Yup.string().required('Password required'),
    phoneNumber : Yup.number().required().min(10,'min 10 digits').max(10, 'max 10 digits')
  });

  //user login function
  const loginFunction = async (values, action) => {
    console.log(values);
    try {
      //set wait true
      setWait(true);

      //sending the request with values
      const response = await fetch(
        'https://form-data-submission-2ew5.onrender.com/register',
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
        navigation.navigate('Login');
        Toast.show({
          type : 'success',
          text1 : 'Data Submitted',
          text2 : 'You are registered Successfully',
          topOffset : 60,
        });
      } else {
        setError(result?.message);
        Toast.show({
          type : 'error',
          text1 : 'Not registered',
          text2 : result?.message,
          topOffset : 60,
        });
      }
      setWait(false);
    } catch (err) {
      console.log('error  : ', err);
      setWait(false);
      Toast.show({
        type : 'error',
        text1 : 'Not registered',
        text2 : err?.message,
        topOffset : 60,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.loginAppContainer}>
        {/* login container  */}
        <View style={styles.loginFiedsContainer}>
          <Text
            style={[{
              fontSize: 24,
              fontWeight: 'bold',
              marginHorizontal: 5,
              color: 'black',
            }, isDark && styles.WhiteText]}>
            Create Account
          </Text>

          {/* form inputs */}
          <Formik
            initialValues={{
              Email: '',
              Password: '',
              firstName: '',
              lastName: '',
              Age: '',
              phoneNumber: '',
              gender: '',
            }}
            validationSchema={userSchema}
            onSubmit={(values, action) => loginFunction(values, action)}>
            {
              //arrow unnamed function which take input and handle errors
              ({handleChange, handleBlur, handleSubmit, values,errors}) => (
                // input fields view
                <View>
                  <TextInput
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    placeholder="Enter your firstName"
                    style={[styles.textInput, isDark && styles.WhiteText]}
                    placeholderTextColor={isDark ? '#fff' : '#000'}
                  />
                  {
                  errors.firstName && (
                    <Text style = {styles.errorStyle}> {errors?.firstName}</Text>
                  )
                }
                  <TextInput
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    placeholder="Enter your lastName"
                    style={[styles.textInput, isDark && styles.WhiteText]}
                    placeholderTextColor={isDark ? '#fff' : '#000'}
                  />
                  {
                  errors.lastName && (
                    <Text style = {styles.errorStyle}> {errors?.lastName}</Text>
                  )
                }
                  <TextInput
                    onChangeText={handleChange('Age')}
                    onBlur={handleBlur('Age')}
                    value={values.Age}
                    placeholder="Enter your Age"
                    style={[styles.textInput, isDark && styles.WhiteText]}
                    placeholderTextColor={isDark ? '#fff' : '#000'}
                  />
                  {
                  errors.Age && (
                    <Text style = {styles.errorStyle}> {errors?.Age}</Text>
                  )
                }
                  <TextInput
                    onChangeText={handleChange('gender')}
                    onBlur={handleBlur('gender')}
                    value={values.gender}
                    placeholder="Enter your gender"
                    style={[styles.textInput, isDark && styles.WhiteText]}
                    placeholderTextColor={isDark ? '#fff' : '#000'}
                  />
                  {
                  errors.gender && (
                    <Text style = {styles.errorStyle}> {errors?.gender}</Text>
                  )
                }
                  <TextInput
                    onChangeText={handleChange('Email')}
                    onBlur={handleBlur('Email')}
                    value={values.Email}
                    placeholder="Enter your Email"
                    style={[styles.textInput, isDark && styles.WhiteText]}
                    placeholderTextColor={isDark ? '#fff' : '#000'}
                  />
                  {
                  errors.Email && (
                    <Text style = {styles.errorStyle}> {errors?.Email}</Text>
                  )
                }
                  <TextInput
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    placeholder="Enter your Phone Number"
                    style={[styles.textInput, isDark && styles.WhiteText]}
                    placeholderTextColor={isDark ? '#fff' : '#000'}
                  />
                  {
                  errors.phoneNumber && (
                    <Text style = {styles.errorStyle}> {errors?.phoneNumber}</Text>
                  )
                }
                  <TextInput
                    onChangeText={handleChange('Password')}
                    onBlur={handleBlur('Password')}
                    value={values.Password}
                    placeholder="Enter your password"
                    secureTextEntry
                    style={[styles.textInput, isDark && styles.WhiteText]}
                    placeholderTextColor={isDark ? '#fff' : '#000'}
                  />
                  {
                  errors.Password && (
                    <Text style = {[styles.errorStyle,{marginBottom: 10}]}></Text>
                  )
                }

                  {/* login button  */}
                  <Button
                    onPress={handleSubmit}
                    title="Register"
                    style={styles.buttonStyle}
                    disabled={wait}
                  />
                </View>
              )
            }
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
        </View>

        {/* //footer  */}
        <View style={styles.footer}>
          <Text style={[{fontSize: 15, color: 'grey'},isDark && styles.WhiteText]}>
            Already Have Account ?
          </Text>
          <TouchableHighlight
            onPress={() => navigation.navigate('Login')}
            underlayColor={'white'}>
            <Text
              style={[{
                fontSize: 15,
                marginHorizontal: 5,
                textAlign: 'center',
                textDecorationLine: 'underline',
                color: 'black',
              }, isDark && styles.WhiteText]}>
              Login
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};
export default Register;

const styles = StyleSheet.create({
  loginAppContainer: {
    flex: 1,
    margin: 5,
  },
  loginFiedsContainer: {
    flex: 10,
    padding: 5,
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    marginVertical: 7,
    borderRadius: 8,
    paddingLeft: 10,
    height: 45,
  },
  footer: {
    flex: 1,
    marginTop:5,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle :{
    marginTop: 10,
  },
  WhiteText : {
    color : '#fff',
    borderColor : '#fff',
  },
  errorStyle : {
    color : 'red',
    marginTop: -5
  }
});
