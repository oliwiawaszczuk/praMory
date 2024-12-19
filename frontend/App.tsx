import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./screens/Home";
import Layout from "./Layout";
import {yellowPrimary, grayPrimary, greenPrimary, grayPrimaryDarker, black, yellowPrimaryDarker} from "./const/Colors";
import PrimaryButton from "./components/Buttons/Primary";
import {log} from "expo/build/devtools/logger";
import SettingsScreen from "./screens/Settings";
import PalaceDetail from "./screens/PalaceDetail";
import ImageLook from "./screens/ImageLook";

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
    const [currentRoute, setCurrentRoute] = useState('');

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
                    headerRight: () => (<PrimaryButton text="home" onPressFunc={() => navigation.navigate('Home')}
                />)})}
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