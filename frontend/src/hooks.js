import { useCallback } from "react";
import axios from "axios"

export function useSelectSong(){
    const func = useCallback(async (songName, artistName) => {
        const response = await axios.get("/selectSong?songName=" + songName + "&artistName="+artistName);
        return response.data
    }, [])
    return func;
}