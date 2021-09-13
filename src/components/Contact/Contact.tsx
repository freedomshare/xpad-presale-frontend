import React from 'react'
import { FormikErrors, useFormik } from 'formik';

const Contact = () => {

    // const [success, setSuccess] = useState(false);

    const validate = (values: Values) => {
        let errors: FormikErrors<Values> = {};

        if (!values.name) {
            errors.name = 'Your name is required';
        }

        if (!values.message) {
            errors.message = 'Project description is required';
        }


        if (!values.email) {
            errors.email = 'Your email is required';
        } else if (!isValidEmail(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    }

    const isValidEmail = (email = '') => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        validate,
        onSubmit: (values, actions) => {
            (async () => {
                try {
                    // https://thedefi.network/api/sendMail.php/sendMail
                    const rawResponse = await fetch('', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    });
                    const content = await rawResponse.json();
                    if (content) {
                        // setSuccess(true);
                        setTimeout(() => {
                            // setSuccess(false);
                            actions.resetForm({
                                values: {
                                    name: '',
                                    email: '',
                                    message: ''
                                },
                            });
                        }, 5000);
                    }
                } catch (error) {
                    alert('Error on sending email');
                }
            })();

        },
    });


    return (
        <div id="contact" className="max-w-sm md:max-w-xl md:mx-auto lg:max-w-full mx-6 lg:mx-28 mt-20 lg:mt-80">
            <div className="ml-8 lg:ml-0">
                <p className="text-gray-400 text-tiny lg:text-sm uppercase text-center">Developing a project ?</p>
                <h2 className="text-gray-100 font-base uppercase font-bold text-center lg:text-5xl lg:mt-2">Let's talk</h2>
                <form onSubmit={formik.handleSubmit} className="flex flex-col max-w-lg mx-auto mt-10 px-16 lg:px-0">
                    <div className="lg:flex">
                        <div className="my-6 lg:pr-24">
                            <div className="border-b border-gray-500 focus-within:border-gray-100 relative ">
                                <input
                                    className="block w-full appearance-none focus:outline-none bg-transparent pb-2 text-gray-100 text-xs lg:text-xl"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder=" "
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                                <label className="absolute top-0 -z-1 duration-300 origin-0 text-gray-500 font-bold text-xs lg:text-xl" htmlFor="name">Your Name</label>
                            </div>
                            {formik.errors.name ? <div className="text-red-600 text-xs lg:text-sm pt-1">{formik.errors.name}</div> : null}
                        </div>


                        <div className="my-6 lg:pl-24">
                            <div className="border-b border-gray-500 focus-within:border-gray-100 relative">
                                <input
                                    className="block w-full appearance-none focus:outline-none bg-transparent pb-2 text-gray-100 text-xs lg:text-xl"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder=" "
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                <label className="absolute top-0 -z-1 duration-300 origin-0 text-gray-500 font-bold text-xs lg:text-xl" htmlFor="email">Your email</label>
                            </div>
                            {formik.errors.email ? <div className="text-red-600 text-xs lg:text-sm pt-1">{formik.errors.email}</div> : null}
                        </div>
                    </div>

                    <div className="lg:flex">
                        <div className="my-6 lg:mt-6 lg:mb-0 lg:flex-1 lg:flex lg:flex-col justify-end">
                            <div className="border-b border-gray-500 focus-within:border-gray-100 relative">
                                <textarea
                                    className="block w-full appearance-none focus:outline-none bg-transparent text-gray-100 text-xs lg:text-xl"
                                    id="message"
                                    name="message"
                                    placeholder=" "
                                    rows={4}
                                    onChange={formik.handleChange}
                                    value={formik.values.message}
                                />
                                <label className="absolute top-0 -z-1 duration-300 origin-0 text-gray-500 font-bold text-xs lg:text-xl" htmlFor="message">About your project</label>
                            </div>
                            {formik.errors.message ? <div className="text-red-600 text-xs lg:text-sm pt-1">{formik.errors.message}</div> : null}
                        </div>
                        <div className="lg:flex-1 lg:flex items-end justify-center">
                            <button type="submit" className=" px-5 py-1 text-tiny font-bold self-start lg:self-end rounded-md lg:text-sm" style={{ background: 'transparent linear-gradient(350deg, #CCCCCC 0%, #D6D6D6 22%, #E7E7E7 50%, #CCCCCC 100%) 0% 0% no-repeat padding-box' }}>SUBMIT</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

interface Values {
    name: string;
    email: string;
    message: string;
}


export default Contact
