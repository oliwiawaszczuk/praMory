import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, View} from "react-native";
import {Thing} from "../types/Thing";
import EditNameSnipNote from "./EditNameSnipNote";
import {useThingDetails} from "../hooks/useThingDetails";
import {Loading} from "./Loading";
import LineToOpen from "./LineToOpen";
import PrimaryButton from "./Buttons/Primary";
import {ImageSection} from "./ImageSection";
import {yellowPrimary} from "../const/Colors";

interface EditThingProps {
    thing_prop: Thing
    navigation: any
}

export default function EditThing({thing_prop, navigation}: EditThingProps) {
    const [isImageVisible, setIsImageVisible] = useState<boolean>(false)
    const [isTextEditVisible, setIsTextEditVisible] = useState<boolean>(false)

    const {thing, saveName, saveSnip, saveNote, AddImage } = useThingDetails(thing_prop.id)

    if (!thing) return <Loading/>

    const handleLinkThingToImage = () => {
        navigation.navigate("LinkThingPinToImage", {thing_id: thing.id})
    }

    return (
        <View style={{marginHorizontal: 10}}>
            <LineToOpen visible={isImageVisible} setVisible={setIsImageVisible} label="Images"/>
            {isImageVisible && (
                <View>
                    <ImageSection saveImage={AddImage}/>
                    {thing.path_to_images &&
                        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", borderWidth: 2, borderColor: yellowPrimary, borderRadius: 12, flexWrap: "wrap",}}>
                            {thing.path_to_images.map((pathAndOrder) =>
                                <View key={pathAndOrder.order} style={{width: 100, height: 100, margin: 8}}>
                                    <Image style={{width: "100%", height: "100%"}} source={{uri: pathAndOrder.path}}/>
                                </View>
                            )}
                        </View>
                    }
                </View>
            )}

            <LineToOpen visible={isTextEditVisible} setVisible={setIsTextEditVisible} label="Other"/>
            {isTextEditVisible && <View>
                <EditNameSnipNote name={thing.name} note={thing.note} snip={thing.snip} saveNote={saveNote} saveName={saveName} saveSnip={saveSnip}/>
                <PrimaryButton text="Link room to palace image" onPressFunc={handleLinkThingToImage}/>
            </View>}
        </View>
    )
}


