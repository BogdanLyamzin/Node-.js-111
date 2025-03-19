import { readSongs } from "../../utils/songs/readSongs.js";
import { writeSongs } from "../../utils/songs/writeSongs.js";

const removeLastSong = async()=> {
    const songList = await readSongs();
    songList.pop();
    await writeSongs(songList);
};

removeLastSong();