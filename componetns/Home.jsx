/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';

const Home = ({route}) => {
  const {user} = route.params;
  console.log(user);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Hi,{user?.firstName}</Text>
      <Text style={styles.textStyle}>Welcome to Home</Text>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize:15,
    fontWeight:'bold',
    color: 'black',
    margin:1,
  }
});