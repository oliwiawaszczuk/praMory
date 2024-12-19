import {Platform, View} from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import {grayPrimary, grayPrimaryMoreGray, yellowPrimary} from "./const/Colors";
import React from "react";
import {Text} from "./components/Text/Default"

const backgroundColor = grayPrimaryMoreGray
const textColor = yellowPrimary

export default function Layout({ children }: { children: React.ReactNode }) {
    // const routes = useNavigationState((state) => state.routes);
    // const currentRoute = routes[routes.length - 1].name;

    return (
        <View style={{padding: 0, backgroundColor: backgroundColor, flex: 1}}>

            {children}

        </View>
    )
}
