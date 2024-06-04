'use client';

const ContactPage = () => {
    return (
        <>
            <div className='flex flex-col sm:flex-row items-start gap-10 justify-center p-12'>
                <div className='sm:w-1/2 space-y-5'>
                    <h2 className='text-heading4-bold'>Summery</h2>
                    <p>
                        Our e-commerce app, built with Next.js, offers a seamless shopping
                        experience for users looking to browse and purchase products online. With a
                        user-friendly interface and smooth navigation, customers can easily find and
                        buy items from the comfort of their own homes.
                    </p>
                    <p>
                        The app utilizes the latest technology to ensure fast loading times and
                        optimal performance, making it convenient for users to shop on-the-go. With
                        a secure payment gateway and responsive design, our e-commerce app with
                        Next.js provides a modern and efficient platform for both customers and
                        sellers.
                    </p>
                    <p>
                        Additionally, our e-commerce app with Next.js offers personalized
                        recommendations based on user preferences and browsing history, enhancing
                        the overall shopping experience. Customers can also track their orders in
                        real-time and receive notifications on the status of their purchases,
                        ensuring transparency and peace of mind throughout the entire process.
                    </p>
                </div>
                <div className='mx-auto w-full max-w-[550px]'>
                    <form
                        method='POST'
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert('This time not unavailable receive your message!....');
                        }}>
                        <div className='mb-5'>
                            <label
                                htmlFor='name'
                                className='mb-3 block text-base font-medium text-[#07074D]'>
                                Full Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Full Name'
                                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                            />
                        </div>
                        <div className='mb-5'>
                            <label
                                htmlFor='email'
                                className='mb-3 block text-base font-medium text-[#07074D]'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='example@domain.com'
                                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                            />
                        </div>
                        <div className='mb-5'>
                            <label
                                htmlFor='subject'
                                className='mb-3 block text-base font-medium text-[#07074D]'>
                                Subject
                            </label>
                            <input
                                type='text'
                                name='subject'
                                id='subject'
                                placeholder='Enter your subject'
                                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                            />
                        </div>
                        <div className='mb-5'>
                            <label
                                htmlFor='message'
                                className='mb-3 block text-base font-medium text-[#07074D]'>
                                Message
                            </label>
                            <textarea
                                rows={4}
                                name='message'
                                id='message'
                                placeholder='Type your message'
                                className='w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'></textarea>
                        </div>
                        <div>
                            <button className='hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
