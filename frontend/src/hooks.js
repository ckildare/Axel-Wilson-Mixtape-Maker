import { useCallback } from "react";
import axios from "axios"

export function useSelectSong(){
    const func = useCallback(async (songName, artistName) => {
        const response = await axios.get("/selectSong?songName=" + songName + "&artistName="+artistName);
        return response.data
    }, [])
    return func;
}

export function useGetRecommendedSongs(){
    const func = useCallback(async (songs) => {
        console.dir(songs)
        const ids = songs.map(song => song.id)
        console.log("ids:")
        const response = await axios.post("/recommendedSongs", {
            seed_songs: ids // TODO
        });
        return response.data
    }, [])
    return func;
}