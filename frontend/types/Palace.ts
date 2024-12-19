import {Room} from "./Room";

export type Palace = {
    id: number
    title: string
    path_to_image: string | null
    rooms: Room[] | null
}