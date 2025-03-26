import { faker } from "@faker-js/faker";

export const createFakeSong = ()=> ({
    id: faker.string.uuid(),
    album: faker.music.album(),
    artist: faker.music.artist(),
    genre: faker.music.genre(),
    songName: faker.music.songName(),
});