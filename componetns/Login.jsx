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
import {Formik} from 'formik';
const Login = ({navigation}) => {
    const loginFunction = async(values,action) =>{
        console.log(values);
        try{
            const response = await fetch("https://form-data-submission-2ew5.onrender.com/login",{
                method:'POST',
                headers:{
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(values),
            })
            const result = await response.json();
            console.log("response : ",result);
            
            if(response.status == 200){
                navigation.navigate("Home");
            }
        }catch(err){
            console.log("error  : ",err);
        }
    }
  return (
    <View style={styles.loginAppContainer}>
      <View style={styles.loginFiedsContainer}>
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
              <Button  onPress={handleSubmit} title="Login" />
            </View>
          )}
        </Formik>
      </View>
      <View style={styles.footer}>
            <Text>New User ?</Text>
            <TouchableHighlight onPress={() => navigation.navigate('Register')} underlayColor={'white'}>
                <Text>Register</Text>
            </TouchableHighlight>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  loginAppContainer: {
    borderWidth: 2,
    flex: 1,
    padding: 5,
    margin: 5,
  },
  loginFiedsContainer: {
    flex: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  textInput:{
    flex: 0,
    borderWidth: 1,
    width: 200,
    padding:5,
    margin: 5,
    borderRadius: 4,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
