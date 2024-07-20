import { Slack } from 'lucide-react';
import React from 'react';

interface LogoSvgProps {
    name?: string;
}

const LogoSvg: React.FC<LogoSvgProps> = ({ name = 'E-Shopify' }) => {
    return (
        <p className='flex gap-2 items-center'>
            <Slack color='red' />
            <span className='text-[#ac51d6] text-base-bold'>{name}</span>
        </p>
    );
};

export default LogoSvg;
