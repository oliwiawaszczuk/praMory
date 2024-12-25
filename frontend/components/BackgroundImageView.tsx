import {Animated, Dimensions, ImageBackground, PanResponder, StyleSheet, TouchableOpacity, View} from "react-native";
import {activePinColor, greenPrimaryDarker, pinsColor, yellowPrimary, yellowPrimaryDarker} from "../const/Colors";
import {PALACE_IMAGE_HEIGHT, PALACE_IMAGE_HEIGHT_MIN, PIN_SIZE} from "../const/Const";
import HorizontalLine from "./HorizontalLine";
import Slider from "@react-native-community/slider";
import React, {useEffect, useRef, useState} from "react";
import {ImagePalacePin, ImageRoomPin} from "../types/ImagePin";
import {scaleActualToDisplayed} from "../utils/ScalePoint";
import {Room} from "../types/Room";
import {Palace} from "../types/Palace";

interface BackgroundImageViewProps {
    isImageStatic: boolean
    setIsImageStatic: (isImageStatic: boolean) => void
    pathToImage: string
    navigation: any
    activePin: ImagePalacePin | ImageRoomPin | null
    setActivePin: any
    forWhatPins: Palace | Room
}

export default function BackgroundImageView({isImageStatic, setIsImageStatic, pathToImage, navigation, forWhatPins, activePin, setActivePin}: BackgroundImageViewProps) {
    const [imageSize, setImageSize] = useState<{width: number, height: number}>({ width: 0, height: 0 })
    const [imageScale, setImageScale] = useState<number>(1)
    const [sliderValue, setSliderValue] = useState<number>(1)
    const [displayedPins, setDisplayedPins] = useState<ImagePalacePin[] | ImageRoomPin[]>([])

    const { width: screenWidth } = Dimensions.get('window')
    const { width: imageWidth, height: imageHeight } = imageSize

    const imageAspectRatio = imageWidth > 0 ? imageHeight / imageWidth : 1
    const calculatedHeight = screenWidth * imageAspectRatio

    const handleSliderChange = (value: number) => {
        setImageScale(value)
    }

    const handleImageLoad = (event: any) => {
        if (imageSize.width === 0) {
            const {width, height} = event.nativeEvent.source
            if (width > 0 && height > 0) {
                setImageSize({width, height})
            }
        }
    }

    useEffect(() => {
        if (forWhatPins && forWhatPins.pins && imageSize.width > 0 && imageScale > 0) {
            const newDisplayedPins = forWhatPins.pins.map((pin) => ({
                ...pin,
                position: scaleActualToDisplayed(pin.position, imageSize, imageScale),
            }))
            // @ts-ignore
            setDisplayedPins(newDisplayedPins)
        }
    }, [forWhatPins, imageSize, imageScale])

    useEffect(() => {
        if(!isImageStatic)
            setSliderValue(imageScale)
    }, [isImageStatic])

    const animatedImageHeight = useRef(new Animated.Value(PALACE_IMAGE_HEIGHT-250)).current

    const imageAnimationHeight = animatedImageHeight.interpolate({
        inputRange: [PALACE_IMAGE_HEIGHT_MIN, PALACE_IMAGE_HEIGHT],
        outputRange: [PALACE_IMAGE_HEIGHT_MIN, PALACE_IMAGE_HEIGHT],
        extrapolate: 'clamp',
    })

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    {dy: animatedImageHeight}
                ],
                {useNativeDriver: false}
            ),
            onPanResponderRelease: (evt, {moveY}) => {
                animatedImageHeight.extractOffset()
            },
        })
    ).current

    return (
        <View style={{position: "relative"}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsImageStatic(!isImageStatic)}
                style={{width: 30, height: 30, position: "absolute", top: 5, right: 5, borderRadius: 10, backgroundColor: greenPrimaryDarker, zIndex: 2}}
            />
            {isImageStatic &&
                <View style={styles.sliderContainer}>
                    <HorizontalLine color={yellowPrimaryDarker} lineHeight={18}/>
                    <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={5}
                        value={sliderValue}
                        onValueChange={handleSliderChange}
                        minimumTrackTintColor="rgba(0, 0, 0, 0)"
                        maximumTrackTintColor="rgba(0, 0, 0, 0)"
                        thumbTintColor={greenPrimaryDarker}
                        step={0.1}
                    />
                </View>
            }
            <TouchableOpacity
                activeOpacity={0.9}
                onLongPress={() => navigation.navigate('ImageLook', {pathToImage: pathToImage})}
                style={{alignItems: "center"}}
            >
                {!isImageStatic ? <Animated.Image
                    source={{uri: pathToImage}}
                    style={[styles.absImage, {height: imageAnimationHeight}]}
                    resizeMode="cover"
                /> : <ImageBackground
                        source={{ uri: pathToImage }}
                        resizeMode="contain"
                        style={{ width: screenWidth / imageScale, height: calculatedHeight / imageScale }}
                        onLoad={handleImageLoad}
                    >
                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                            {displayedPins.map((pin, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setActivePin(pin)}
                                    style={{
                                        position: 'absolute',
                                        left: pin.position.x,
                                        top: pin.position.y,
                                        width: PIN_SIZE / imageScale,
                                        height: PIN_SIZE / imageScale,
                                        borderRadius: 10,
                                        backgroundColor: pin.position.x === activePin?.position.x && pin.position.y === activePin?.position.y ? activePinColor : pinsColor,
                                    }}
                                />
                            ))}
                        </View>
                    </ImageBackground>}
            </TouchableOpacity>
            {!isImageStatic &&
                <View {...panResponder.panHandlers} style={styles.dragLine}>
                    <View style={styles.handler}></View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    dragLine: {
        width: "100%",
        height: 10,
        backgroundColor: yellowPrimary,
        zIndex: 10,
    },
    absImage: {
        width: "100%",
    },
    handler: {
        height: 40,
        width: 60,
        backgroundColor: yellowPrimaryDarker,
        position: "absolute",
        right: 0,
        top: -15,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth: 3,
        borderColor: greenPrimaryDarker,
        borderRightWidth: 0,
    },
    sliderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
    },
    slider: {
        position: "absolute",
        width: '80%',
        height: 20,
    },
});