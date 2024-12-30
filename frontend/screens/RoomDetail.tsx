import {View, Image, ScrollView, StyleSheet, Animated, Dimensions, TouchableOpacity} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import {useRoute} from "@react-navigation/native"
import {Loading} from "../components/Loading"
import PrimaryButton from "../components/Buttons/Primary"
import {greenPrimary, greenPrimaryDarker, yellowPrimary, yellowPrimaryDarker} from "../const/Colors";
import LineToOpen from "../components/LineToOpen";
import {ImagePalacePin, ImageRoomPin} from "../types/ImagePin";
import BackgroundImageView from "../components/BackgroundImageView";
import {useRoomDetails} from "../hooks/useRoomDetails";
import {ImageSection} from "../components/ImageSection";
import AddNewThing from "../components/Thing/AddNewThing";
import ThingCard from "../components/Thing/ThingCard";
import SliderLowerButtonsForRooms from "../components/SliderLowerButtonsForRooms";
import EditNameSnipNote from "../components/EditNameSnipNote";
import CardsSlider from "../components/CardsSlider";
import TaxiDeco from "../components/Decorations/Taxi";
import CardCover from "../components/CardCover";
import {SquareBlankButton} from "../components/Buttons/SquareBlankButton";

export default function RoomDetail({navigation}: { navigation: any }) {
    const route = useRoute()
    const {id} = route.params as { id: number }

    const [isSliderVisible, setIsSliderVisible] = useState<boolean>(true)

    const [isImageStatic, setIsImageStatic] = useState<boolean>(false)
    const [activePin, setActivePin] = useState<ImageRoomPin | null>(null)

    const [thingsVisible, setThingsVisible] = useState<boolean>(false)
    const [editVisible, setEditVisible] = useState<boolean>(false)

    const {
        room,
        sortedThings,
        pathToImage,
        saveName,
        saveSnip,
        saveNote,
        saveImage,
    } = useRoomDetails(id)

    useEffect(() => {
        if (room) {
            navigation.setOptions({title: `Room: ${room.name}`})
        }
    }, [room, navigation])

    if (!room) return <Loading/>

    const handleLinkRoomToImage = () => {
        navigation.navigate("LinkRoomPinToImage", {room_id: id})
    }

    return (
        <View style={{flex: 1, position: "relative"}}>
            <SliderLowerButtonsForRooms currentItem={room} navigation={navigation}/>
            {pathToImage && (
                <BackgroundImageView isImageStatic={isImageStatic} setIsImageStatic={setIsImageStatic}
                                     pathToImage={pathToImage} navigation={navigation} activePin={activePin}
                                     setActivePin={setActivePin} forWhatPins={room}/>
            )}
            <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
                {activePin && isImageStatic &&
                    <View>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setActivePin(null)}
                                          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <TaxiDeco howManyLines={4}/>
                        </TouchableOpacity>
                        <CardCover
                            item={sortedThings.find((thing) => thing.id === activePin.thing_id) || null}
                            whereToGoDetail="ThingDetail"
                            navigation={navigation}
                        />
                    </View>
                }

                <LineToOpen label={`Things   ${sortedThings.length}`} visible={thingsVisible} setVisible={setThingsVisible}/>
                {thingsVisible && (<>
                    {!isSliderVisible ? (
                        <View style={styles.thingCardContainer}>
                            {sortedThings.length > 0 && sortedThings.map((thing) => (
                                <View key={thing.id} style={{margin: 5}}>
                                    <ThingCard thing={thing} navigation={navigation}/>
                                </View>
                            ))}
                        </View>
                    ) : (
                        sortedThings.length > 0 ? ( <CardsSlider items={sortedThings} whereToGoDetail="ThingDetail" navigation={navigation} /> ) : ( <View/> )
                    )}

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1}}>
                            <SquareBlankButton onPress={() => setIsSliderVisible(!isSliderVisible)}/>
                        </View>
                        <View style={{flex: 4}}>
                            <AddNewThing room_id={room.id}/>
                        </View>
                        <View style={{flex: 1}}>
                            <SquareBlankButton onPress={() => setIsSliderVisible(!isSliderVisible)}/>
                        </View>
                    </View>
                </>)}

                <LineToOpen label="Edit" visible={editVisible} setVisible={setEditVisible}/>
                {editVisible && (
                    <View>
                        <EditNameSnipNote name={room.name} snip={room.snip} note={room.note} saveName={saveName}
                                          saveSnip={saveSnip} saveNote={saveNote}/>

                        <PrimaryButton text="Link room to palace image" onPressFunc={handleLinkRoomToImage}/>
                        <ImageSection saveImage={saveImage}/>
                    </View>
                )}
            </ScrollView>
        </View>
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
        flexWrap: "wrap",
        justifyContent: 'space-between',
        alignSelf: "flex-start",
    },
})
