import { useState, useEffect } from "react";
import axios from "axios";

const {VITE_API_URL} = import.meta.env;

const MovieList = ()=> {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const fetchMovies = async()=> {
            try {
                setLoading(true);
                const {data} = axios.get(VITE_API_URL);
                setItems(data.data);
            }
            catch(error){
                setError(error.response.data.message);
            }
            finally {
                setLoading(false)
            }
        }
        fetchMovies();
    })

    if(loading) {
        return <p>Loaing....</p>
    }

    const elements = items.map(item => <li key={item._id}>{item.title}</li>)

    return (
        <div>
            {error && <p>{error}</p>}
            {Boolean(items.length) && <ul>{elements}</ul>}
        </div>
    )
}