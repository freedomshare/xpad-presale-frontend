import React from 'react'
import styles from './About.module.css';

const About = () => {
    return (
        <>
            <div id="about" className="max-w-sm md:max-w-xl md:mx-auto lg:max-w-full mx-6 lg:mx-28 mt-20 lg:mt-80">
                <p className="text-gray-100 pl-10 lg:pl-24 mb-3 text-tiniest lg:text-lg">ABOUT US</p>
                <div style={{ width: '110%' }}>
                    <h2 className={`w-full py-3 pl-10 lg:pl-24 lg:pr-32 lg:py-6 lg:leading-tight pr-4 bg-xpad-grad text-tiny font-bold uppercase lg:text-3xl ${styles.textBorder}`}>We’re a 5 person team of developers,marketers & designers  who’ve all come together to make XPAD a Reality.</h2>
                </div>
                <div className="lg:flex">
                    <div className="relative mt-4 lg:mt-8 lg:flex-2">
                        <img src="./hand.svg" alt="about us indicator" className={`absolute top-4 lg:hidden -left-20 ${styles.hand}`} width="100px" height="100px" />
                        <div className="pl-10 lg:pl-24">
                            <p className="text-tiny text-gray-400 lg:text-xl">We’re anon as we believe we should be judged on our ability to execute not who we are. This isn’t a one man show, we all contribute to the vision of creating the premier chain-agnostic funding platform.</p>
                            <p className="text-tiny text-gray-400 mt-4 lg:mt-8 lg:text-xl">
                                Some members of the team have been in the crypto space for over 4 years now and some of us much shorter. Regardless, our team intends to deliver the best possible experience for both our investors and collaborators.
                        </p>
                            <p className="text-tiny text-gray-400 mt-4 lg:mt-8 lg:text-xl">We’re all variables in the code.</p>
                        </div>
                    </div>
                    <div className="hidden lg:flex-1 lg:flex justify-end">
                        <img src="./hand.svg" alt="about us indicator" className={``} width="183px" height="194px" />

                    </div>
                </div>
                <div className="flex pl-10 lg:pl-24 mt-4 lg:mt-8">
                    <div className="flex flex-col">
                        <p className={`${styles.gradText} lg:text-5xl lg:mr-24`}>5 TEAM</p>
                        <p className="text-tiny lg:text-xl text-gray-400">Members</p>
                    </div>
                    <div className="flex flex-col pl-6">
                        <p className={`${styles.gradText} lg:text-5xl`}>4 YEARS</p>
                        <p className="text-tiny lg:text-xl text-gray-400">Experience</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default About
