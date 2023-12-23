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
  
  const Register = ({navigation}) => {
  
    //to save the api response error
    const [error,setError] = useState();
  
    //user login function
      const loginFunction = async(values,action) =>{
          console.log(values);
          try {
            //sending the request with values
              const response = await fetch('https://form-data-submission-2ew5.onrender.com/register',{
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
                navigation.navigate('Login');
              }else{
                setError(result?.message);
              }
          } catch (err){
              console.log('error  : ',err);
          }

      };
      
    return (
      <View style={styles.loginAppContainer}>
  
        {/* login container  */}
        <View style={styles.loginFiedsContainer}>
          <Text style={{fontSize:30, fontWeight:'bold',marginHorizontal:5,color:'black'}}>Create Account</Text>
  
          {/* form inputs */}
          <Formik
            initialValues={{Email: '',Password : '',firstName:'',lastName:'',Age:'',phoneNumber:'',gender:''}}
            onSubmit={(values, action) => loginFunction(values,action)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (

                // input fields view 
              <View>
                <TextInput
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  placeholder="Enter your firstName"
                  style={styles.textInput}
                />
                <TextInput
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  placeholder="Enter your lastName"
                  style={styles.textInput}
                />
                <TextInput
                  onChangeText={handleChange('Age')}
                  onBlur={handleBlur('Age')}
                  value={values.Age}
                  placeholder="Enter your Age"
                  style={styles.textInput}
                />
                <TextInput
                  onChangeText={handleChange('gender')}
                  onBlur={handleBlur('gender')}
                  value={values.gender}
                  placeholder="Enter your gender"
                  style={styles.textInput}
                />
                <TextInput
                  onChangeText={handleChange('Email')}
                  onBlur={handleBlur('Email')}
                  value={values.Email}
                  placeholder="Enter your Email"
                  style={styles.textInput}
                />
                <TextInput
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  placeholder="Enter your Phone Number"
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
                <Button  onPress={handleSubmit} title="Register" style={styles.buttonStyle}/>
              </View>
            )}
          </Formik>
  
          {/* if any error occurs  */}
          {
            error && <Text style={{fontSize:15, marginHorizontal:5, textAlign:'center',marginTop:10,color:'red'}}>{error}</Text>
          }
        </View>
  
        {/* //footer  */}
        <View style={styles.footer}>
              <Text style={{fontSize:15,color:'grey'}}>Already Have Account ?</Text>
              <TouchableHighlight onPress={() => navigation.navigate('Register')} underlayColor={'white'}>
                  <Text style={{fontSize:15, marginHorizontal:5, textAlign:'center',textDecorationLine:'underline',color:'black'}}>Login</Text>
              </TouchableHighlight>
        </View>
      </View>
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
      padding: 10,
      justifyContent: 'center',
    },
    textInput:{
      borderWidth: 1,
      marginVertical:10,
      borderRadius: 8,
      paddingLeft:10,
    },
    footer: {
      flex: 1,
      flexDirection: 'row',
      gap: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  