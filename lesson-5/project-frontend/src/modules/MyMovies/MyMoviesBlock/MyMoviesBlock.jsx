import styles from "./my-movies-block.module.css";

const MyMoviesBlock = ({title, children})=> {
    return (
        <div className={styles.block}>
            <h3 className={styles.title}>{title}</h3>
            {children}
        </div>
    )
}

export default MyMoviesBlock;
