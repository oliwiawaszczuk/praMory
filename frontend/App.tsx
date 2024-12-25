import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./screens/Home";
import Layout from "./Layout";
import {yellowPrimary, grayPrimary, greenPrimary, grayPrimaryDarker, black, yellowPrimaryDarker} from "./const/Colors";
import SettingsScreen from "./screens/Settings";
import PalaceDetail from "./screens/PalaceDetail";
import ImageLook from "./screens/ImageLook";
import {TouchableOpacity, Image, View} from "react-native";
import { useFonts } from 'expo-font';
import RoomDetail from "./screens/RoomDetail";
import LinkRoomPinToImage from "./screens/LinkRoomPinToImage";
import ThingDetail from "./screens/ThingDetail";
import LinkThingPinToImage from "./screens/LinkThingPinToImage";
import Palaces from "./screens/Palaces";

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
    const [loaded, error] = useFonts({
        'Engagement-Regular': require('./assets/fonts/Engagement-Regular.ttf'),
        'LeagueScript-Regular': require('./assets/fonts/LeagueScript-Regular.ttf'),
        'MountainsofChristmas-Regular': require('./assets/fonts/MountainsofChristmas-Regular.ttf'),
        'MountainsofChristmas-Bold': require('./assets/fonts/MountainsofChristmas-Bold.ttf'),
        'Rock3D-Regular': require('./assets/fonts/Rock3D-Regular.ttf'),
        'RubikPuddles-Regular': require('./assets/fonts/RubikPuddles-Regular.ttf'),
        'Faustina-Regular': require('./assets/fonts/Faustina-Regular.ttf'),
        'FunnelDisplay-Regular': require('./assets/fonts/FunnelDisplay-Regular.ttf'),
        'LeagueSpartan-Regular': require('./assets/fonts/LeagueSpartan-Regular.ttf'),
        'Lexend-Regular': require('./assets/fonts/Lexend-Regular.ttf'),
        'Mynerve-Regular': require('./assets/fonts/Mynerve-Regular.ttf'),
        'ShadowsIntoLightTwo-Regular': require('./assets/fonts/ShadowsIntoLightTwo-Regular.ttf'),
        'Tomorrow-Regular': require('./assets/fonts/Tomorrow-Regular.ttf'),
    });

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
                <Stack.Screen name="Palaces" component={Palaces} options={{title: 'Palaces' }}/>
                <Stack.Screen name="PalaceDetail" component={PalaceDetail} options={{title: 'Palace Detail' }}/>
                <Stack.Screen name="RoomDetail" component={RoomDetail} options={{title: 'Room Detail' }}/>
                <Stack.Screen name="ThingDetail" component={ThingDetail} options={{title: 'Thing Detail' }}/>
                <Stack.Screen name="LinkRoomPinToImage" component={LinkRoomPinToImage} options={{title: 'Link room pin to image' }}/>
                <Stack.Screen name="LinkThingPinToImage" component={LinkThingPinToImage} options={{title: 'Link thing pin to image' }}/>
                <Stack.Screen name="ImageLook" component={ImageLook} options={{title: 'Image Look' }}/>
                <Stack.Screen name="Settings" component={SettingsScreen} options={{title: 'Settings' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}