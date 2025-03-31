import { useState, useEffect } from "react";

import Container from "../../shared/components/layouts/Container/Container.jsx";

import MyMoviesBlock from "./MyMoviesBlock/MyMoviesBlock.jsx";
import MyMoviesAddForm from "./MyMoviesAddForm/MyMoviesAddForm.jsx";
import MyMoviesList from "./MyMoviesList/MyMoviesList.jsx";

import { fetchMovies } from "../../shared/api/movies.js";

import styles from "./my-movies.module.css";

const MyMovies = ()=> {
    const [movies, setMovies] = useState([]);

    useEffect(()=> {
        fetchMovies()
            .then(data => setMovies(data.data))
            .catch(error => console.log(error.message));
    }, []);

    return (
        <Container>
            <h2 className={styles.title}>My movies</h2>
            <div className={styles.blockWrapper}>
                <MyMoviesBlock title="Додати фільм">
                    <MyMoviesAddForm />
                </MyMoviesBlock>
                <MyMoviesBlock title="Список фільмів">
                    <MyMoviesList items={movies} />
                </MyMoviesBlock>
            </div>
        </Container>
    )
}

export default MyMovies;
