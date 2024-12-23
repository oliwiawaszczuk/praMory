import {View, Image, ScrollView, StyleSheet, Animated, Dimensions, TouchableOpacity} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import {useRoute} from "@react-navigation/native"
import {Loading} from "../components/Loading"
import LineToOpen from "../components/LineToOpen";
import {useThingDetails} from "../hooks/useThingDetails";
import SliderLowerButtonsForThings from "../components/SliderLowerButtonsForThings";
import DisplayThing from "../components/DisplayThing";
import EditThing from "../components/EditThing";

export default function ThingDetail({navigation}: { navigation: any }) {
    const route = useRoute()
    const {id} = route.params as { id: number }

    const {thing} = useThingDetails(id)

    const [isDisplayVisible, setIsDisplayVisible] = useState<boolean>(true)
    const [isEditVisible, setIsEditVisible] = useState<boolean>(false)

    if (thing) navigation.setOptions({title: `Thing: ${thing.name}`})
    else return <Loading/>

    return (
        <View style={{flex: 1, marginHorizontal: 5}}>
            <SliderLowerButtonsForThings currentItem={thing} navigation={navigation}/>
            <View style={{marginTop: 10}}>
                <LineToOpen label="Display" visible={isDisplayVisible} setVisible={setIsDisplayVisible}/>
                {isDisplayVisible &&
                    <ScrollView style={styles.scrollView}>
                        <DisplayThing thing={thing}/>
                    </ScrollView>
                }

                <LineToOpen label="Edit" visible={isEditVisible} setVisible={setIsEditVisible}/>
                {isEditVisible &&
                    <ScrollView style={styles.scrollView}>
                        <EditThing thing_prop={thing} navigation={navigation}/>
                    </ScrollView>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        maxHeight: "85%",
    },
})
