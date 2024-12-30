import React from "react";
import {Modal, TouchableOpacity, View, StyleSheet} from "react-native";
import {Text} from "../Text/Default";
import {
    grayPrimaryBrighter,
    grayPrimaryDarker,
    greenPrimary,
    yellowPrimary,
} from "../../const/Colors";

export default function OkAndCancelModal({modalVisible, setModalVisible, label, okFunc}: OkAndCancelModalProps) {
    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true}
               onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.label}>{label}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => {
                                okFunc()
                                setModalVisible(false)
                            }}
                        >
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: yellowPrimary,
        borderRadius: 10,
        alignItems: "center",
    },
    label: {
        fontFamily: "Tomorrow-Regular",
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
        color: grayPrimaryDarker,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    cancelButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: grayPrimaryBrighter,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    okButton: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: greenPrimary,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: grayPrimaryDarker,
        fontSize: 18,
    },
})
