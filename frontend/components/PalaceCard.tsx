import {TouchableOpacity, View, Image, StyleSheet, Modal} from "react-native";
import React, {useState} from "react";
import {Palace} from "../types/Palace";
import {Text} from "./Text/Default";
import {grayPrimary, greenPrimary, greenPrimaryDarker, yellowPrimary} from "../const/Colors";
import {storage} from "../store/storage";
import TextEditAndDeleteModal from "./Modals/TextEditAndDeleteModal";

export default function PalaceCard({palace, navigation}: { palace: Palace, navigation: any }) {
    const [visibleEditPalaceCardModal, setVisibleEditPalaceCardModal] = useState(false)
    const [newTitle, setNewTitle] = useState(palace.title)
    const removePalace = storage((state) => state.removePalace)
    const updatePalace = storage((state) => state.updatePalace)

    function redirectToPalaceDetail(id: number) {
        navigation.navigate('PalaceDetail', { id })
    }

    function handleSaveChanges() {
        const updatedPalace: Palace = {...palace, title: newTitle} as Palace

        updatePalace(updatedPalace)
        setVisibleEditPalaceCardModal(false)
    }

    function handleRemovePalace() {
        removePalace(palace.id)
        setVisibleEditPalaceCardModal(false)
    }

    return (
        <View>
            <TextEditAndDeleteModal newTitle={newTitle} setNewTitle={setNewTitle} handleSave={handleSaveChanges} visibleEditModal={visibleEditPalaceCardModal} setVisibleEditModal={setVisibleEditPalaceCardModal} handleRemove={handleRemovePalace}/>

            <TouchableOpacity
                activeOpacity={0.9} style={styles.container}
                onPress={() => redirectToPalaceDetail(palace.id)}
                onLongPress={() => setVisibleEditPalaceCardModal(true)}
            >
                <View style={styles.imageContainer}>
                    {palace.path_to_image && <Image
                        source={{uri: palace.path_to_image}}
                        style={styles.image}
                        resizeMode="cover"
                    />}
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{palace.title}</Text>
                </View>

                <View style={styles.iconContainer}>
                    <View style={styles.circleIcon}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: greenPrimaryDarker,
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,
        position: 'relative',
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: greenPrimary,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        flex: 1,
        marginLeft: 15,
    },
    title: {
        color: yellowPrimary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    circleIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.3,
        borderColor: greenPrimary,
        backgroundColor: grayPrimary,
    },
})