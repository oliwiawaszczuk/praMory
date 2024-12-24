import {TouchableOpacity, View, Image, Text, StyleSheet, Modal} from "react-native";
import React, {useState} from "react";
import {grayPrimary, greenPrimary, greenPrimaryDarker, yellowPrimary} from "../const/Colors";
import {storage} from "../store/storage";
import TextEditAndDeleteModal from "./Modals/TextEditAndDeleteModal";
import {Thing} from "../types/Thing";
import {useThingDetails} from "../hooks/useThingDetails";

export default function ThingCard({thing, navigation}: { thing: Thing, navigation: any }) {
    const [visibleEditThingCardModal, setVisibleEditThingCardModal] = useState(false)
    const [newName, setNewName] = useState(thing.name)

    const removeThing = storage((state) => state.removeThing)
    const updateThing = storage((state) => state.updateThing)

    function redirectToThingDetail(id: number) {
        navigation.navigate('ThingDetail', { id })
    }

    function handleSaveChanges() {
        updateThing({...thing, name: newName})
        setVisibleEditThingCardModal(false)
    }

    function handleRemovePalace() {
        removeThing(thing.id)
        setVisibleEditThingCardModal(false)
    }

    return (
        <View>
            <TextEditAndDeleteModal newTitle={newName} setNewTitle={setNewName} handleSave={handleSaveChanges} visibleEditModal={visibleEditThingCardModal} setVisibleEditModal={setVisibleEditThingCardModal} handleRemove={handleRemovePalace}/>

            <TouchableOpacity
                activeOpacity={0.9} style={styles.container}
                onPress={() => redirectToThingDetail(thing.id)}
                onLongPress={() => setVisibleEditThingCardModal(true)}
            >
                <View style={styles.imageContainer}>
                    {thing.path_to_images && thing.path_to_images[0] && <Image
                        source={{uri: thing.path_to_images[0].path}}
                        style={styles.image}
                        resizeMode="cover"
                    />}
                </View>


                <View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{thing.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles= StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: greenPrimaryDarker,
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,
        width: 110,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: greenPrimary,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    title: {
        color: yellowPrimary,
        marginTop: 5,
        fontSize: 18,
        fontFamily: "LeagueSpartan-Regular",
    },
})