import { Dimensions } from "react-native";
import {Point} from "../types/Point";

export function scaleActualToDisplayed( actualPosition: Point, imageSize: { width: number; height: number }, imageScale: number): Point {
    const { width: screenWidth } = Dimensions.get('window')
    const imageAspectRatio = imageSize.width > 0 ? imageSize.height / imageSize.width : 1

    const displayedWidth = screenWidth / imageScale
    const displayedHeight = screenWidth * imageAspectRatio / imageScale

    const scaleX = displayedWidth / imageSize.width
    const scaleY = displayedHeight / imageSize.height

    return {
        x: actualPosition.x * scaleX,
        y: actualPosition.y * scaleY,
    }
}

export function scaleDisplayedToActual(displayedPosition: Point, imageSize: { width: number; height: number }, imageScale: number): Point {
    const { width: screenWidth } = Dimensions.get('window')
    const imageAspectRatio = imageSize.width > 0 ? imageSize.height / imageSize.width : 1
    const displayedHeight = screenWidth * imageAspectRatio * imageScale

    const scaleX = imageSize.width / screenWidth
    const scaleY = imageSize.height / displayedHeight

    return {
        x: displayedPosition.x * scaleX,
        y: displayedPosition.y * scaleY,
    }
}
