import {useId} from "react";
import {useForm} from "react-hook-form";

import styles from "./my-movies-add-form.module.css";

const MyMoviesAddForm = () => {
    const {
        register,
        handleSubmit} = useForm();

    const onSubmit = values => {
        console.log(values);
    }

    const titleId = useId();
    const directorId = useId();
    const favoriteId = useId();
    const typeId = useId();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                <label htmlFor={titleId}>Title:</label>
                <input required type="text" id={titleId} placeholder="Title" {...register("title")} />

            </div>
            <div className={styles.formGroup}>
                <label htmlFor={directorId}>Director:</label>
                <input required type="text" id={directorId} placeholder="Director" {...register("director")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor={favoriteId}>Favorite:</label>
                <input type="checkbox" id={favoriteId} placeholder="Favorite" {...register("favorite")} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor={typeId}>Type:</label>
                <select id={typeId} {...register("type")}>
                    <option value="film">Film</option>
                    <option value="serial">Serial</option>
                </select>
            </div>
            <button type="submit">Додати книгу</button>
        </form>
    )
}

export default MyMoviesAddForm;
