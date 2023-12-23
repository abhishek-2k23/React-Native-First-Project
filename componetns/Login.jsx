/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, TextInput, Touchable, Button, ScrollView} from 'react-native';

const Login = () => {
  return (
    <View style={styles.loginAppContainer}>
        <View style={styles.loginFiedsContainer}></View>
        <View style={styles.footer}></View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
    loginAppContainer: {
        borderWidth: 2,
        flex:1,
        padding:5,
        margin: 5,
    },
    loginFiedsContainer: {
        flex: 6,
        padding: 20,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: "#faaedd"
    },
    footer: {
        flex: 1,
        backgroundColor: "#f5f"
    }   
})
