import React, {useEffect, useState} from "react";
import {View, StyleSheet, Image, Dimensions, TouchableOpacity, Modal} from "react-native";
import {Thing} from "../../types/Thing";
import {Text} from "../Text/Default";
import {greenPrimary, yellowPrimaryDarker} from "../../const/Colors";

interface DisplayThingProps {
    thing: Thing
}

export default function DisplayThing({thing}: DisplayThingProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
    const [longPressImage, setLongPressImage] = useState<string | null>(null)

    useEffect(() => {
        if (thing.path_to_images && thing.path_to_images.length > 0)
            setSelectedImageIndex(0)
    }, [thing])

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

    return (
        <View>
            {thing.name && <Text style={styles.borderText}>{thing.name}</Text>}
            <View>
                {selectedImageIndex !== null && thing.path_to_images &&
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {thing.path_to_images[selectedImageIndex-1] ?
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setSelectedImageIndex(selectedImageIndex-1)}>
                                <Image style={styles.image} source={{uri: thing.path_to_images[selectedImageIndex-1].path}}/>
                            </TouchableOpacity> : <View style={[styles.image, {borderWidth: 0}]}></View>
                        }
                        {thing.path_to_images[selectedImageIndex] &&
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onLongPress={() => setLongPressImage(
                                    // @ts-ignore
                                    thing.path_to_images[selectedImageIndex].path
                                )}
                                onPressOut={() => setLongPressImage(null)}
                            >
                                <Image style={[styles.image, {width: screenWidth-160}]} resizeMode="cover" source={{uri: thing.path_to_images[selectedImageIndex].path}}/>
                            </TouchableOpacity>
                        }
                        {thing.path_to_images[selectedImageIndex+1] &&
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setSelectedImageIndex(selectedImageIndex+1)}>
                                <Image style={styles.image} source={{uri: thing.path_to_images[selectedImageIndex+1].path}}/>
                            </TouchableOpacity>
                        }
                    </View>
                }
            </View>
            {thing.snip && <Text style={styles.borderText}>{thing.snip}</Text>}
            {thing.note && <Text style={styles.borderText}>{thing.note}</Text>}

            {longPressImage && (
                <Modal
                    transparent={true}
                    animationType="fade"
                >
                    <Image
                        style={{ width: screenWidth, height: screenHeight, resizeMode: 'contain' }}
                        source={{ uri: longPressImage }}
                    />
                </Modal>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    borderText: {
        borderRadius: 6,
        padding: 8,
        margin: 4,
        borderColor: yellowPrimaryDarker,
        borderWidth: 1,
    },
    image: {
        borderWidth: 1,
        borderColor: yellowPrimaryDarker,
        width: 80,
        aspectRatio: 1,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
})