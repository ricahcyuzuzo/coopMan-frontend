import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Sold from './screens/Sold';
import Waste from './screens/Waste';
import AddNew from './screens/AddNew';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import AppContext from './screens/Context';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    getAppState();
  }, []);

  const getAppState = async () => {
    const isLoggedIn = await SecureStore.getItemAsync('isLoggedIn');
    setLoaded(isLoggedIn === 'true' ? true : false )
  }

  return (
    <AppContext.Provider value={{ loaded, setLoaded }}>
    <NavigationContainer>
          {
            !loaded ?
            <Stack.Navigator>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
            </Stack.Navigator>

            : 
            <Stack.Navigator>
              <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
              <Stack.Screen name='Sold' component={Sold} options={{ headerShown: false }} />
              <Stack.Screen name='Waste' component={Waste} options={{ headerShown: false }} />
              <Stack.Screen name='AddNew' component={AddNew} options={{ headerShown: false }} />
            </Stack.Navigator>
          }
    </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
