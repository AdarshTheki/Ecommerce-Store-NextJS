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
                    onClick={() => handlePageClick(i)}
                    className={`px-3 py-1 mx-1 rounded ${
                        currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}>
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className='flex items-center justify-center space-x-2 gap-1 flex-wrap py-5'>
            <button
                onClick={handlePrevious}
                className='px-3 py-1 rounded bg-gray-200 hover:bg-gray-300'
                disabled={currentPage === 1}>
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={handleNext}
                className='px-3 py-1 rounded bg-gray-200 hover:bg-gray-300'
                disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};
export default Pagination;
