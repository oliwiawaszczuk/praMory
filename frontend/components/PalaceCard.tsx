import {TouchableOpacity, View, Image, StyleSheet, Modal} from "react-native";
import React, {useState} from "react";
import {Palace} from "../types/Palace";
import {Text} from "./Text/Default";
import {grayPrimary, greenPrimary, greenPrimaryDarker, yellowPrimary} from "../const/Colors";
import {storage} from "../store/storage";
import {Pressable} from "react-native-gesture-handler";
import {InputText} from "./Input/InputText";
import PrimaryButton from "./Buttons/Primary";

export default function PalaceCard({palace, navigation}: { palace: Palace, navigation: any }) {
    const [visibleEditPalaceCardModal, setVisibleEditPalaceCardModal] = useState(false);
    const [visibleConfirmDeleteModal, setVisibleConfirmDeleteModal] = useState(false);
    const [newTitle, setNewTitle] = useState(palace.title)
    const removePalace = storage((state) => state.removePalace)
    const updatePalace = storage((state) => state.updatePalace)

    function redirectToPalaceDetail(id: number) {
        navigation.navigate('PalaceDetail', { id })
    }

    function handleSaveChanges() {
        updatePalace(palace.id, newTitle)
        setVisibleEditPalaceCardModal(false)
    }

    function handleRemovePalace() {
        removePalace(palace.id)
        setVisibleEditPalaceCardModal(false)
        setVisibleConfirmDeleteModal(false)
    }

    return (
        <View>
            <Modal
                transparent={true}
                visible={visibleEditPalaceCardModal}
                onRequestClose={() => setVisibleEditPalaceCardModal(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <InputText label="Enter new title" get={newTitle} set={setNewTitle}/>
                        <View style={styles.modalActions}>
                            <PrimaryButton text="Save Changes" onPressFunc={handleSaveChanges} />
                            <PrimaryButton style={{backgroundColor: "#dd3737", borderColor: "#9f1616"}} text="Delete" onPressFunc={() => setVisibleConfirmDeleteModal(true)} />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={visibleConfirmDeleteModal}
                onRequestClose={() => setVisibleConfirmDeleteModal(false)}
            >
                <TouchableOpacity activeOpacity={1} style={styles.modalBackground} onPress={() => setVisibleConfirmDeleteModal(false)}>
                    <View style={styles.modalContent}>
                        <Text>Are you sure you want to delete this palace?</Text>
                        <View style={styles.modalActions}>
                            <PrimaryButton text="Cancel" onPressFunc={() => {
                                setVisibleConfirmDeleteModal(false)
                                setVisibleEditPalaceCardModal(false)
                            }} />
                            <PrimaryButton text="Confirm" onPressFunc={handleRemovePalace} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

            <TouchableOpacity
                activeOpacity={0.9} style={styles.container}
                onPress={() => redirectToPalaceDetail(palace.id)}
                onLongPress={() => setVisibleEditPalaceCardModal(true)}
            >
                <View style={styles.imageContainer}>
                    (palace.path_to_image && <Image
                        source={{uri: palace.path_to_image}}
                        style={styles.image}
                        resizeMode="cover"
                    />)
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{palace.id} - {palace.title}</Text>
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
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: 300,
        backgroundColor: grayPrimary,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
})