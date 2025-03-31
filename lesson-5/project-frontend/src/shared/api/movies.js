import axios from "axios";

const moviesInstance = axios.create({
    baseURL: "http://localhost:3000/movies",
});

export const fetchMovies = async ()=> {
    const {data} = await moviesInstance.get("/");
    return data;
}