import React from 'react';

interface PaginationProps {
    limit: number;
    skip: number;
    totalProducts: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ limit, skip, totalProducts, onPageChange }) => {
    const totalPages = Math.ceil(totalProducts / limit);
    const currentPage = Math.floor(skip / limit) + 1;

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange((currentPage - 2) * limit);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage * limit);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        onPageChange((pageNumber - 1) * limit);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`px-2 py-1 border ${
                        currentPage === i ? 'bg-blue-1' : 'bg-gray-100'
                    }`}
                    onClick={() => handlePageClick(i)}>
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className='flex flex-wrap items-center gap-2 justify-center'>
            <button
                onClick={handlePrevious}
                className={`px-2 py-1 border hover:bg-blue-1 ${currentPage === 1 ? 'hidden' : ''}`}>
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={handleNext}
                className={`px-2 py-1 border hover:bg-blue-1 ${
                    currentPage === totalPages ? 'hidden' : ''
                }`}>
                Next
            </button>
        </div>
    );
};
export default Pagination;
