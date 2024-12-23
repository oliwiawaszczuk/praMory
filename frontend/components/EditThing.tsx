import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {Thing} from "../types/Thing";
import EditNameSnipNote from "./EditNameSnipNote";
import {useThingDetails} from "../hooks/useThingDetails";
import {Loading} from "./Loading";
import LineToOpen from "./LineToOpen";
import PrimaryButton from "./Buttons/Primary";

interface EditThingProps {
    thing_prop: Thing
    navigation: any
}

export default function EditThing({thing_prop, navigation}: EditThingProps) {
    const [isImageVisible, setIsImageVisible] = useState<boolean>(false)
    const [isTextEditVisible, setIsTextEditVisible] = useState<boolean>(false)

    const {thing, saveName, saveSnip, saveNote } = useThingDetails(thing_prop.id)

    if (!thing) return <Loading/>

    const handleLinkThingToImage = () => {
        navigation.navigate("LinkThingPinToImage", {thing_id: thing.id})
    }

    return (
        <View style={{marginHorizontal: 10}}>
            <LineToOpen visible={isImageVisible} setVisible={setIsImageVisible} label="Images"/>
            {isImageVisible && (<View></View>)}

            <LineToOpen visible={isTextEditVisible} setVisible={setIsTextEditVisible} label="Other"/>
            {isTextEditVisible && <View>
                <EditNameSnipNote name={thing.name} note={thing.note} snip={thing.snip} saveNote={saveNote} saveName={saveName} saveSnip={saveSnip}/>
                <PrimaryButton text="Link room to palace image" onPressFunc={handleLinkThingToImage}/>
            </View>}
        </View>
    )
}


