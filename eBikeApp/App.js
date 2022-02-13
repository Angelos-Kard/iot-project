import { StatusBar, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { LogBox } from 'react-native';

import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home'
import FindABike from './components/FindABike';
import RentABike from './components/RentABike';
import SecureABike from './components/SecureABike';
import Profile from './components/Profile';
import Rentals from './components/Rentals';
import Transactions from './components/Transactions';
import Settings from './components/Settings';

import Entypo from 'react-native-vector-icons/Entypo';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "./assets/colors/colors";
Entypo.loadFont();
MCI.loadFont();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return(
    <Tab.Navigator
      screenOptions={{
        "tabBarActiveTintColor": colors.purple,
        "tabBarInactiveTintColor": colors.white,
        tabBarShowLabel: false,
        "tabBarStyle": styles.tabBar
      }}
    >
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({color}) => <MCI name='account' size={32} color={color}/>,
        headerShown: false
      }}/>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({color}) => <Entypo name='home' size={32} color={color}/>,
          headerShown: false
        }}
      />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({color}) => <MCI name='account' size={32} color={color}/>,
        headerShown: false
      }}/>
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Welcome' component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name="Sign Up" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}}/>
      </Stack.Navigator>
      <StatusBar barStyle='light-content' backgroundColor={colors.purple}></StatusBar>
    </NavigationContainer>
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