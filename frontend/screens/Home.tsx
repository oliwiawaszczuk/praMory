import React, {useEffect, useState} from "react";
import {Button, TextInput, FlatList, View, ScrollView} from "react-native";
import {storage} from "../store/storage";
import {Text} from "../components/Text/Default"
import PrimaryButton from "../components/Buttons/Primary";
import PalaceCard from "../components/Palace/PalaceCard";
import AddNewPalace from "../components/Palace/AddNewPalace";

export default function HomeScreen({navigation}: {navigation: any}) {

    return (
        <View style={{margin: 15}}>
            <PrimaryButton text="Palaces" onPressFunc={() => navigation.navigate("Palaces")}/>
            <PrimaryButton text="Settings" onPressFunc={() => navigation.navigate("Settings")}/>
        </View>
    )
}