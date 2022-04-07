import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import Create from './components/Create';
import Details from './components/Details';
import Home from './components/Home';
import Update from './components/Update';




const Stack = createNativeStackNavigator();



function App() {

  // const name = 'Flask & React Native';

  return (
    <View style={styles.container}>

      <Stack.Navigator>

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Update" component={Update} />


      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
