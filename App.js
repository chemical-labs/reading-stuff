import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/Home/Home'
import Search from './components/Home/Search'
import Profile from './components/Auth/Profile'
import Read from './components/Books/Read'
import Overview from './components/Books/Overview'

export default class Navigasi extends Component{
    render(){
        let Stack = createStackNavigator()
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
                    <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
                    <Stack.Screen name='Search' component={Search} options={{
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0
                        }
                    }}/>
                    <Stack.Screen name='Books' component={Read} options={{
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0
                        }
                    }}/>
                    <Stack.Screen name='Overview' component={Overview} options={{
                        headerTintColor: 'white',
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: 'black'
                        }
                    }}/>
                    <Stack.Screen name='Profile' component={Profile} options={{
                        headerTitle: '',
                        headerStyle: {
                            elevation: 0
                        }
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}


