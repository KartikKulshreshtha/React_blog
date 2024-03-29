import { useState, useEffect} from "react";
 
 const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [IsPending, setIsPending] = useState(true);
    const [Error, setError] = useState(null);
    useEffect(()=> {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal })
                .then(res => {
                    if(!res.ok) {
                        throw Error('could not fetch tje data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null)
                })
                .catch(err => {
                    if(err.name === 'AbortError'){
                        console.log("Fetch Aborted");
                    }
                    else{
                        setError(err.message);
                        setIsPending(false);
                    }
                    
                })
        })

        return () => abortCont.abort();
    }, [url]);

    return { data, IsPending, Error }
}

export default useFetch;