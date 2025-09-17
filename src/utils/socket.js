import {io} from "socket.io-client";
import { BASE_URL } from "../lib/constants";

export const createSocketConnection = () => {
    return io(BASE_URL);
}