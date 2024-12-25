import React, {useState} from "react"
import {View} from "react-native"
import {storage} from "../../store/storage"
import PrimaryButton from "../Buttons/Primary"
import AddNewModal from "../Modals/AddNewModal";

export default function AddNewPalace() {
    const addPalace = storage((state) => state.addPalace)
    const [newTitle, setNewTitle] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const palaces = storage((state) => state.palaces)

    const handleAddPalace = () => {
        if (newTitle.trim()) {
            addPalace(
                {
                    id: palaces.length > 0 ? Math.max(...palaces.map(p => p.id)) + 1 : 1,
                    title: newTitle,
                    path_to_image: null,
                    pins: [],
                    note: null,
                }
            )
            setNewTitle('')
        }
    }

    return (
        <View>
            <AddNewModal label="Add new palace" modalVisible={modalVisible} setModalVisible={setModalVisible} newText={newTitle} setNewText={setNewTitle} handleAddRoom={handleAddPalace}/>
            <PrimaryButton text="Add new Palace" onPressFunc={() => setModalVisible(true)} />
        </View>
    )
}