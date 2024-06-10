import { useEffect, useState } from 'react';

const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                const item = await response.json();
                setData(item);
                setError(null);
            } catch (err: any) {
                setError(err.message);
                setData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, isLoading };
};

export default useFetch;
