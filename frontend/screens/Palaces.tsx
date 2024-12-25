import React, {useEffect, useState} from "react";
import {Button, TextInput, FlatList, View, ScrollView} from "react-native";
import {storage} from "../store/storage";
import PrimaryButton from "../components/Buttons/Primary";
import PalaceCard from "../components/PalaceCard";
import AddNewPalace from "../components/AddNewPalace";

export default function Palaces({navigation}: {navigation: any}) {
    const palaces = storage((state) => state.palaces)

    return (
        <View style={{flex: 1, margin: 15}}>
            <ScrollView style={{flex:1}}>
                {palaces.map((item, index) => (<PalaceCard key={index} palace={item} navigation={navigation}/>))}
            </ScrollView>

            <AddNewPalace/>
        </View>
    )
}