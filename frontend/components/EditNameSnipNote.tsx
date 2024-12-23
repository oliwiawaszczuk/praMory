import {LabelView} from "./Input/LabelView";
import TextInputModal from "./Modals/TextInputModal";
import {Text} from "./Text/Default";
import NoteInputModal from "./Modals/NoteInputModal";
import {ScrollView, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {greenPrimary} from "../const/Colors";


interface EditNameSnipNoteProps {
    name: string
    snip: string | null
    note: string | null
    saveName: any
    saveSnip: any
    saveNote: any
}

const EditNameSnipNote = ({name, snip, note, saveSnip, saveNote, saveName}: EditNameSnipNoteProps) => {
    const [nameEditText, setNameEditText] = useState<string>(name || "")
    const [isNameOpen, setIsNameOpen] = useState<boolean>(true)
    const [nameEditVisible, setNameEditVisible] = useState<boolean>(false)

    const [snipEditText, setSnipEditText] = useState<string>(snip || "")
    const [isSnipOpen, setIsSnipOpen] = useState<boolean>(true)
    const [snipEditVisible, setSnipEditVisible] = useState<boolean>(false)

    const [noteEditText, setNoteEditText] = useState<string>(note || "")
    const [isNoteOpen, setIsNoteOpen] = useState<boolean>(true)
    const [noteEditVisible, setNoteEditVisible] = useState<boolean>(false)

    useEffect(() => {
        setNameEditText(name || "")
        setSnipEditText(snip || "")
        setNoteEditText(note || "")
    }, [name, snip, note])

    return (
        <>
            <LabelView labelText="Name" buttonText="Edit name" onPressFunc={() => setNameEditVisible(true)} onClick={() => setIsNameOpen(!isNameOpen)}/>
            <TextInputModal modalVisible={nameEditVisible} setModalVisible={setNameEditVisible} noteEditText={nameEditText} setNoteEditText={setNameEditText} saveFunc={() => { setNameEditVisible(false); saveName(nameEditText) }}/>
            {isNameOpen && name && <Text style={styles.textAsNote}>{name}</Text> }

            <LabelView labelText="Snip" buttonText="Edit snip" onPressFunc={() => setSnipEditVisible(true)} onClick={() => setIsSnipOpen(!isSnipOpen)}/>
            <TextInputModal modalVisible={snipEditVisible} setModalVisible={setSnipEditVisible} noteEditText={snipEditText} setNoteEditText={setSnipEditText} saveFunc={() => { setSnipEditVisible(false); saveSnip(snipEditText) }}/>
            {isSnipOpen && snip && <Text style={styles.textAsNote}>{snip}</Text> }

            <LabelView labelText="Note" buttonText="Edit note" onPressFunc={() => setNoteEditVisible(true)} onClick={() => setIsNoteOpen(!isNoteOpen)}/>
            <NoteInputModal modalVisible={noteEditVisible} setModalVisible={setNoteEditVisible} noteEditText={noteEditText} setNoteEditText={setNoteEditText} saveFunc={() => { setNoteEditVisible(false); saveNote(noteEditText) }}/>
            {isNoteOpen && note && (
                <ScrollView style={[styles.scrollViewForNote, {height: 100}]} nestedScrollEnabled={true}>
                    <Text style={styles.textAsNote}>{note}</Text>
                </ScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 15,
        marginVertical: 10,
        flex: 1,
    },
    scrollViewForNote: {
        borderColor: greenPrimary,
        borderWidth: 1,
        borderRadius: 10,
    },
    textAsNote: {
        margin: 5,
        padding: 10,
    },
    thingCardContainer: {
        flexDirection: 'row',
        // flex: 1,
        flexWrap: "wrap",
        justifyContent: 'space-between',
        // alignItems: 'flex-start',
    },
})

export default EditNameSnipNote