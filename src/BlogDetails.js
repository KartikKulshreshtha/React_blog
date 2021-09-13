import { useParams } from "react-router-dom";
import useFetch from './useFetch'
import { useHistory } from "react-router";
const BlogDetails = () => {
    const { id } = useParams()
    const { data, Error, IsPending } = useFetch('http://localhost:8000/blogs/' + id)
    const history = useHistory();
    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + data.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/')
        })
    }

    return ( 
        <div className="blog-details">
            { IsPending && <div>Loading...</div> }
            { Error && <div>{Error}</div> }
            { data && (
                <article>
                    <h2>{ data.title }</h2>
                    <p>Written by { data.author }</p>
                    <div>{ data.body }</div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;