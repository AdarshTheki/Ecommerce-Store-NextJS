'use client';

import React from 'react';

const Dropdown = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const toggle = () => setIsOpen(!isOpen);

    return { isOpen, dropdownRef, toggle };
};

export default Dropdown;
