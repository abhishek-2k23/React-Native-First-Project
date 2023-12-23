/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import { useState,useEffect } from 'react';

//for form data handle
import {Formik} from 'formik';

const Login = ({navigation}) => {

  //to save the api response error
  const [error,setError] = useState(null);

  //user login function
    const loginFunction = async(values,action) =>{
        console.log(values);
        try {
          //sending the request with values
            const response = await fetch('https://form-data-submission-2ew5.onrender.com/login',{
                method:'POST',
                headers:{
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(values),
            });

            //response converted to json
            const result = await response.json();
            console.log('response : ',result);

            //if user matches credentials
            if (response.status === 200){

              //navigate to home page
              navigation.navigate('Home',{user: result?.user});
            }else{
              setError(result?.message);
            }
        } catch (err){
            console.log('error  : ',err);
        }
    };
    
    useEffect(() => {
      setError(null);
    },[]);
  return (
    <View style={styles.loginAppContainer}>

      {/* login container  */}
      <View style={styles.loginFiedsContainer}>
        <Text style={{fontSize:30, fontWeight:'bold',marginHorizontal:5,color:'black'}}>Login</Text>
        <Text style={{fontSize:20, fontWeight:'bold',marginHorizontal:5}}>Please Sign in to continue.</Text>

        {/* form inputs */}
        <Formik
          initialValues={{Email: '',Password : ''}}
          onSubmit={(values, action) => loginFunction(values,action)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <TextInput
                onChangeText={handleChange('Email')}
                onBlur={handleBlur('Email')}
                value={values.Email}
                placeholder="Enter your Email"
                style={styles.textInput}
              />
              <TextInput
                onChangeText={handleChange('Password')}
                onBlur={handleBlur('Password')}
                value={values.Password}
                placeholder="Enter your password"
                secureTextEntry
                style={styles.textInput}
                />

                {/* login button  */}
              <Button  onPress={handleSubmit} title="Login" style={styles.buttonStyle}/>
            </View>
          )}
        </Formik>

        {/* if any error occurs  */}
        {
          error && <Text style={{fontSize:15, marginHorizontal:5, textAlign:'center',marginTop:10,color:'red'}}>{error}</Text>
        }

        {/* forgot password button  */}
        <Text style={{fontSize:15, marginHorizontal:5, textAlign:'center',marginTop:10,textDecorationLine:'underline'}}>Fogot Password</Text>
      </View>

      {/* //footer  */}
      <View style={styles.footer}>
            <Text style={{fontSize:15,color:'grey'}}>New User ?</Text>
            <TouchableHighlight onPress={() => navigation.navigate('Register')} underlayColor={'white'}>
                <Text style={{fontSize:15, marginHorizontal:5, textAlign:'center',textDecorationLine:'underline',color:'black'}}>Register</Text>
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
  },
  loginFiedsContainer: {
    flex: 10,
    padding: 10,
    justifyContent: 'center',
  },
  textInput:{
    borderWidth: 1,
    marginVertical:10,
    borderRadius: 8,
    paddingLeft:4,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
