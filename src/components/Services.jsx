import React from 'react'
import { checklistItems } from '../constants'


const Services = () => {
    const firstHalf = checklistItems.slice(0, Math.ceil(checklistItems.length / 2));
    const secondHalf = checklistItems.slice(Math.ceil(checklistItems.length / 2));
  return (
    <div className='sm:mb-20'>
        <h2 className='text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide'>Que te ofrece {" "}
            <span className='bg-custom-purple text-transparent bg-clip-text'> Stream Race TV</span>
        </h2>
        <div className="flex flex-wrap justify-center mt-12">
            <div className="w-full md:w-1/2 px-4">
                {firstHalf.map((item, index) => (
                <div key={index} className="flex mb-12">
                    <div className="text-custom-blue mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                        {item.icon}
                    </div>
                    <div>
                        <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                        <p className="text-mb text-neutral-500">{item.description}</p>
                    </div>
                </div>
                ))}
            </div>

            <div className="w-full md:w-1/2 px-4">
                {secondHalf.map((item, index) => (
                <div key={index} className="flex mb-12">
                    <div className="text-custom-blue mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                        {item.icon}
                    </div>
                    <div>
                        <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                        <p className="text-mb text-neutral-500">{item.description}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Services