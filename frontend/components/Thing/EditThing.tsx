import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Thing} from "../../types/Thing";
import EditNameSnipNote from "../EditNameSnipNote";
import {useThingDetails} from "../../hooks/useThingDetails";
import {Loading} from "../Loading";
import LineToOpen from "../LineToOpen";
import PrimaryButton from "../Buttons/Primary";
import {ImageSection} from "../ImageSection";
import {greenPrimary, yellowPrimary} from "../../const/Colors";
import SecondaryButton from "../Buttons/Secondary";
import {Text} from "../Text/Default";
import TaxiDeco from "../Decorations/Taxi";
import {ImagesSection} from "../ImagesSection";

interface EditThingProps {
    thing_prop: Thing
    navigation: any
}

export default function EditThing({thing_prop, navigation}: EditThingProps) {
    const [isImageVisible, setIsImageVisible] = useState<boolean>(false)
    const [isTextEditVisible, setIsTextEditVisible] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<{path: string, order: number} | null>(null)

    const {thing, sortedImages, saveName, saveSnip, saveNote, AddImage, changeImageOrder, removeImage } = useThingDetails(thing_prop.id)

    if (!thing) return <Loading/>

    const handleLinkThingToImage = () => {
        navigation.navigate("LinkThingPinToImage", {thing_id: thing.id})
    }

    return (
        <View style={{marginHorizontal: 10}}>
            <LineToOpen visible={isImageVisible} setVisible={setIsImageVisible} label="Images"/>
            {isImageVisible && (
                <View>
                    <ImagesSection saveImage={AddImage}/>
                    {thing.path_to_images &&
                        <>
                            <ScrollView
                                style={styles.scrollView}
                                contentContainerStyle={styles.imageContainer}
                            >
                                {sortedImages().map((pathAndOrder, index) => (
                                    <TouchableOpacity onPress={() => setSelectedImage(pathAndOrder)} key={index} style={styles.imageWrapper} activeOpacity={0.7}>
                                        <Image style={[styles.image, selectedImage?.order === pathAndOrder.order ? styles.selectedImage : {}]} source={{ uri: pathAndOrder.path }} />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            {selectedImage &&
                                <>
                                    <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around"}}>
                                        <SecondaryButton text="<-" onPressFunc={() => { changeImageOrder(selectedImage?.order, -1) }}/>
                                        <PrimaryButton text="Remove imaage" onPressFunc={() => {
                                            removeImage(selectedImage?.order)
                                            setSelectedImage(null)
                                        }}/>
                                        <SecondaryButton text="->" onPressFunc={() => { changeImageOrder(selectedImage?.order, 1) }}/>
                                    </View>
                                    <TouchableOpacity  activeOpacity={0.8} onPress={() => setSelectedImage(null)} style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                                        <TaxiDeco howManyLines={5}/>
                                    </TouchableOpacity>
                                </>
                            }
                        </>
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

const styles = StyleSheet.create({
    scrollView: {
        maxHeight: 400,
        width: "100%",
        borderWidth: 2,
        borderColor: yellowPrimary,
        borderRadius: 12,
        marginBottom: 4,
    },
    imageWrapper: {
        width: 100,
        height: 100,
        margin: 8,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    selectedImage: {
        borderWidth: 3,
        borderColor: greenPrimary,
    },
    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
})

