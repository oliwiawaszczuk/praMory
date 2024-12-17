import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./screens/Home";

const Stack = createNativeStackNavigator();

const linking = {
    prefix: ["pra://"],
    config: {
        screens: {
            Home: 'home',
        },
    },
}

export default function App() {
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator screenOptions={{headerShown: true}}>
                <Stack.Screen name="Home" component={HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}