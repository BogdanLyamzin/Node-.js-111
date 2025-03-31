import styles from "./my-movies-list.module.css";

const MyMoviesList = ({items = []}) => {
    const elements = items.map(({_id, title, director}) => (
        <li key={_id}>
            Title: {title}. Director: {director}.
        </li>
    ));

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default MyMoviesList;
