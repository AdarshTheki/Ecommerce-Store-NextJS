export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
    }).format(date);
};

export const formatPrice = (price: number) => {
    price.toLocaleString('en-US', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'USD',
    });
};

// CORS
export const configHeaders = {
    status: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, PATCH, POST, DELETE',
    },
};
