import { useState } from "react";
import { useHistory } from "react-router";
const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        
        setLoading(true)

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { 'Content-type': "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('New blog added');
            setLoading(false)
            history.push('/');
        })
    }

    return ( 
        <div className="create">
            <h1>Add your blogs here</h1>
            <form action="" onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                 type="text"
                 required
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                />

                <label>Blog body:</label>
                <textarea
                 required
                 value={body}
                 onChange={(e) => setBody(e.target.value)}
                ></textarea>

                <label>Blog author:</label>
                <input
                 type="text"
                 required
                 value={author}
                 onChange={(e) => setAuthor(e.target.value)}
                />

                { !loading && <button>Add blog</button>}
                { loading && <button disabled>Adding blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;