import {TouchableOpacity, View, Image, Text, StyleSheet, Modal} from "react-native";
import React, {useState} from "react";
import {grayPrimary, greenPrimary, greenPrimaryDarker, yellowPrimary} from "../../const/Colors";
import {storage} from "../../store/storage";
import {Room} from "../../types/Room";
import TextEditAndDeleteModal from "../Modals/TextEditAndDeleteModal";

export default function RoomCard({room, navigation}: { room: Room, navigation: any }) {
    const [visibleEditRoomCardModal, setVisibleEditRoomCardModal] = useState(false)
    const [newName, setNewName] = useState(room.name)
    const removeRoom = storage((state) => state.removeRoom)
    const updateRoom = storage((state) => state.updateRoom)

    function redirectToRoomDetail(id: number) {
        navigation.navigate('RoomDetail', { id })
    }

    function handleSaveChanges() {
        updateRoom({...room, name: newName})
        setVisibleEditRoomCardModal(false)
    }

    function handleRemovePalace() {
        removeRoom(room.id)
        setVisibleEditRoomCardModal(false)
    }

    return (
        <View>
            <TextEditAndDeleteModal newTitle={newName} setNewTitle={setNewName} handleSave={handleSaveChanges} visibleEditModal={visibleEditRoomCardModal} setVisibleEditModal={setVisibleEditRoomCardModal} handleRemove={handleRemovePalace}/>

            <TouchableOpacity
                activeOpacity={0.9} style={styles.container}
                onPress={() => redirectToRoomDetail(room.id)}
                onLongPress={() => setVisibleEditRoomCardModal(true)}
            >
                <View style={styles.imageContainer}>
                    {room.path_to_image && <Image
                        source={{uri: room.path_to_image}}
                        style={styles.image}
                        resizeMode="cover"
                    />}
                </View>

                <View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{room.name}</Text>
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
    textContainer: {

    },
    title: {
        color: yellowPrimary,
        marginTop: 5,
        fontSize: 18,
        fontFamily: "LeagueSpartan-Regular",
    },
})