import { Facebook, Github, Twitter } from 'lucide-react';
import React from 'react';

const Footer = () => {
    return (
        <footer className='relative py-6 border-t'>
            <div className='container mx-auto'>
                <div className='flex flex-wrap text-left lg:text-left'>
                    <div className='w-full lg:w-6/12 px-4'>
                        <h4 className='text-3xl font-semibold'>Lets keep in touch!</h4>
                        <h5 className='text-lg mt-0 mb-2 '>
                            Find us on any of these platforms, we respond 1-2 business days.
                        </h5>
                        <div className='flex gap-3 mt-6'>
                            <button
                                className='h-10 w-10 flex items-center justify-center bg-white text-grey-1 hover:text-blue-600'
                                type='button'>
                                <Twitter />
                            </button>
                            <button
                                className='h-10 w-10 flex items-center justify-center bg-white text-grey-1 hover:text-blue-600'
                                type='button'>
                                <Facebook />
                            </button>
                            <button
                                className='h-10 w-10 flex items-center justify-center bg-white text-grey-1 hover:text-blue-600'
                                type='button'>
                                <Github />
                            </button>
                        </div>
                    </div>
                    <div className='w-full lg:w-6/12 px-4 text-gray-700'>
                        <div className='flex flex-wrap items-top mb-6'>
                            <div className='w-full lg:w-4/12 ml-auto'>
                                <span className='block uppercase text-sm font-semibold my-2'>
                                    Useful Links
                                </span>
                                <ul className='list-disc list-inside'>
                                    <li>
                                        <a className='hover:text-blue-600' href='#'>
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a className='hover:text-blue-600' href='#'>
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a className='hover:text-blue-600' href='#'>
                                            Github
                                        </a>
                                    </li>
                                    <li>
                                        <a className='hover:text-blue-600' href='#'>
                                            Free Products
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className='w-full lg:w-4/12'>
                                <span className='block uppercase  text-sm font-semibold my-2'>
                                    Other
                                </span>
                                <ul className='list-disc list-inside'>
                                    <li>
                                        <a className='hover:text-blue-600' href='#'>
                                            MIT License
                                        </a>
                                    </li>
                                    <li>
                                        <a className='hover:text-blue-600' href='#'>
                                            Terms &amp; Conditions
                                        </a>
                                    </li>
                                    <li>
                                        <a className='hover:text-blue-600' href='#'>
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a className='hover:text-blue-600' href='#'>
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='border-t' />
                <div className='flex flex-wrap items-center md:justify-between justify-center'>
                    <div className='w-full md:w-4/12 px-4 mx-auto text-center'>
                        <div className='text-sm  font-semibold py-1'>
                            Copyright © <span id='get-current-year'>2021</span>
                            <a href='#' className=' hover:text-gray-800' target='_blank'>
                                {' '}
                                Notus JS by
                            </a>
                            <a href='#' className='hover:to-blue-600'>
                                Creative Tim
                            </a>
                            .
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
