'use client';

import { useEffect, useState } from 'react';

const useFetch = (url: string, options?: RequestInit) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            try {
                setIsLoading(true);
                const response = await fetch(url, { ...options });
                if (response.ok) {
                    const item = await response.json();
                    setData(item);
                }
            } catch (err: any) {
                setError(err.message || err.message || 'Unknown error');
                setData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, error, isLoading };
};

export default useFetch;
