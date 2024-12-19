import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./screens/Home";
import Layout from "./Layout";
import {yellowPrimary, grayPrimary, greenPrimary, grayPrimaryDarker, black, yellowPrimaryDarker} from "./const/Colors";
import SettingsScreen from "./screens/Settings";
import PalaceDetail from "./screens/PalaceDetail";
import ImageLook from "./screens/ImageLook";
import {TouchableOpacity, Image} from "react-native";

const Stack = createNativeStackNavigator();

const linking = {
    prefixes: ["pra://"],
    config: {
        screens: {
            Home: 'home',
        },
    },
}

const headerBackgroundColor = yellowPrimary
const headerTextColor = black

export default function App() {

    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator
                screenOptions={({navigation}) => ({
                    animation: 'none',
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerStyle: {backgroundColor: headerBackgroundColor},
                    headerTintColor: headerTextColor,
                    headerTitleStyle: {fontWeight: 'bold'},
                    headerRight: () => (
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Home')}>
                            <Image source={require("./assets/icon_green.png")} style={{ height: 36, aspectRatio: 1, marginVertical: 10 }}/>
                        </TouchableOpacity>
                    )
                })}
                screenLayout={Layout}
            >
                <Stack.Screen name="Home" component={HomeScreen} options={{title: 'praMory' }}/>
                <Stack.Screen name="PalaceDetail" component={PalaceDetail} options={{title: 'Palace Detail' }}/>
                <Stack.Screen name="ImageLook" component={ImageLook} options={{title: 'Image Look' }}/>
                <Stack.Screen name="Settings" component={SettingsScreen} options={{title: 'Settings' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}