import React, {useEffect, useState} from "react";
import {Button, TextInput, FlatList, View, ScrollView} from "react-native";
import {storage} from "../store/storage";
import {Text} from "../components/Text/Default"
import PrimaryButton from "../components/Buttons/Primary";
import PalaceCard from "../components/PalaceCard";
import AddNewPalace from "../components/AddNewPalace";

export default function HomeScreen({navigation}: {navigation: any}) {
    const palaces = storage((state) => state.palaces);

    return (
        <View style={{flex: 1}}>
            <ScrollView style={{flex:1}}>
                {palaces.map((item, index) => (<PalaceCard key={index} palace={item} onclick={() => navigation.navigate('PalaceDetail', { id: item.id })}/>))}
                <PrimaryButton text="Settings" onPressFunc={() => navigation.navigate("Settings")}/>
            </ScrollView>

            <AddNewPalace/>
        </View>
    )
}