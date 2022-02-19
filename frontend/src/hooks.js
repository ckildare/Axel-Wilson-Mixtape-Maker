import { useCallback } from "react";
import axios from "axios";

export function useSelectSong() {
    const func = useCallback(async (songName, artistName) => {
        const response = await axios.get(
            '/selectSong?title="' + songName + '"&artist="' + artistName + '"'
        );
        return response.data;
    }, []);
    return func;
}

export function useGetRecommendedSongs() {
    const func = useCallback(async (songs) => {
        const ids = songs.map((song) => song.uri);
        const reqObj = {
            seed_songs: ids,
            discard_songs: [], // TODO
        };
        const response = await axios.post("/recommendedSongs", reqObj);
        return response.data;
    }, []);
    return func;
}

export function useCreatePlaylist() {
    const func = useCallback(async (songs, title, description) => {
        console.dir(songs);
        const ids = songs.map((song) => song.uri);
        const reqObj = {
            title,
            description,
            songs: ids,
        };
        console.dir(reqObj);
        const response = await axios.post("/createPlaylist", reqObj);
        return response.data;
    }, []);
    return func;
}
