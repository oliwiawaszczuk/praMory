import {Point} from "./Point";


export type ImagePin = {
    position: Point
}

export type ImagePalacePin = {
    room_id: number
} & ImagePin


export type ImageRoomPin = {

} & ImagePin
