import { courseDetails, updateCourseDetails } from '@/Redux/Slices/Instructor/InstructorSlice'
import React, { useEffect, useRef, useState } from 'react'
import { FaItalic } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdInfo, MdList } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Input = ({ onChange, value, name, count }) => {



    return (
        <div className='relative'>
            <input name={name} onChange={onChange} className='border border-black w-[100%] h-[45px] outline-none pl-4 pr-20 placeholder:text-slate-600' placeholder={`Insert your course ${name}`} value={value}></input>

            <h1 className='absolute top-3 right-5'>{count - value.length}</h1>

        </div>
    )

}

function LandingPage({setSaveThunk,setSaveEnable}) {

    const dispatch= useDispatch();

    const stateData = useSelector((state)=> state.instructor.edit);

    const [data, setData] = useState({
        title: "",
        subtitle: "",
        description:  "",
        language: "",
        level: "",
        category: "",
        subcategory: ""
    });

    console.log(data?.title);
    

    const onUserInput = (e) => {
        const { value, name } = e.target;
        setSaveEnable(true)
        setData({
            ...data,
            [name]: value
        })

        // const thunk =()=>{
        //     dispatch(updateCourseDetails({
        //         course_id:stateData._id,
        //         ...data
        //     }))
        // }
        
        // setSaveThunk(()=>thunk)
    }

    useEffect(() => {
        const thunk = async() => {
            const res = await dispatch(updateCourseDetails({
                course_id: stateData._id,
                ...data  // Use the latest `data` here
            }));

            if(res?.payload){
                dispatch(courseDetails(stateData._id));
            }
        };
        
        setSaveThunk(() => thunk);  // Set the thunk function to be triggered later
    }, [data, dispatch, setSaveThunk, stateData._id]); 
    

    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [data.description]);

    useEffect(()=>{
        setData({
            title: stateData?.title || "",
            subtitle: stateData?.subtitle || "",
            description: stateData?.description || "",
            language: stateData?.language || "",
            level: stateData?.level || "",
            category: stateData?.category || "",
            subcategory: stateData?.subcategory || ""
        })
    },[stateData])

    return (
        <div className='w-[96%]'>

            <h1 className='font-semibold text-2xl border-b  pb-6 px-12'>
                Course landing page
            </h1>

            <div className='px-12 space-y-6 py-8'>

                <p className=''>
                    Your course landing page is crucial to your success on Brainy. If it’s done right, it can also help you gain visibility in search engines like Google. As you complete this section, think about creating a compelling Course Landing Page that demonstrates why someone would want to enroll in your course. Learn more about <Link className='link-primary underline'>creating your course landing page</Link> and <Link className='link-primary underline'>course title standards.</Link>
                </p>

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Course title</h1>
                    <Input onChange={onUserInput} name={"title"} value={data.title} count={60} />
                    <p className='text-xs'>Your title should be a mix of attention-grabbing, informative, and optimized for search</p>
                </div>

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Course subtitle</h1>
                    <Input onChange={onUserInput} name={"subtitle"} value={data.subtitle} count={120} />
                    <p className='text-xs'>Use 1 or 2 related keywords, and mention 3-4 of the most important areas that you've covered during your course.</p>
                </div>

                {/* description */}

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Course description</h1>

                    <div>
                        <div className='w-[100%] border-x border-t border-black flex items-center text-xl px-2 py-2 gap-4'>
                            <button>
                                <MdFormatBold />
                            </button>

                            <button>
                                <MdFormatItalic />
                            </button>

                            <button>
                                <MdFormatListNumbered />
                            </button>

                            <button>
                                <MdFormatListBulleted />
                            </button>
                        </div>

                        <textarea
                            ref={textAreaRef}
                            name="description"
                            onChange={onUserInput}
                            className='border border-black w-[100%]  outline-none pl-4 pr-20 placeholder:text-slate-600 overflow-hidden resize-none h-auto py-2'
                            placeholder={`Insert your course description`}
                            value={data.description}
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                        ></textarea>
                        <p className='text-xs'>Description should have minimum 200 words.</p>



                    </div>

                </div>

                {/* basic info */}
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Basic info</h1>

                    <div className='flex justify-between pb-1'>
                        {/* Language Select */}
                        <div className='group relative'>
                            <select
                                value={data?.language}
                                onChange={onUserInput}
                                name="language"
                                className="border border-black w-[250px] h-11 px-4 outline-none appearance-none bg-transparent relative z-10 cursor-pointer">
                                <option value="" >Select a language</option>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="mandarin">Mandarin</option>
                                <option value="hindi">Hindi</option>
                                <option value="french">French</option>
                                <option value="arabic">Arabic</option>
                                <option value="bengali">Bengali</option>
                                <option value="portuguese">Portuguese</option>
                                <option value="russian">Russian</option>
                            </select>
                            <div className='w-[250px] h-11 px-4 absolute group-hover:bg-[#E3E7EA] top-0 -z-0'></div>
                            <div className='absolute right-3 top-4'>
                                <IoIosArrowDown />
                            </div>
                        </div>

                        {/* Level Select */}
                        <div className='group relative'>
                            <select
                                value={data?.level}
                                onChange={onUserInput}
                                name="level"
                                className="border border-black w-[250px] h-11 px-4 outline-none appearance-none bg-transparent relative z-10 cursor-pointer">
                                <option value="" selected>--Select Level--</option>
                                <option value="beginner">Beginner Level</option>
                                <option value="intermediate">Intermediate Level</option>
                                <option value="expert">Expert Level</option>
                                <option value="all">All Level</option>
                            </select>
                            <div className='w-[250px] h-11 px-4 absolute group-hover:bg-[#E3E7EA] top-0 -z-0'></div>
                            <div className='absolute right-3 top-4'>
                                <IoIosArrowDown />
                            </div>
                        </div>

                        {/* Category Select */}
                        <div className='group relative'>
                            <select
                            value={data?.category}
                                onChange={onUserInput}
                                name="category"
                                className="border border-black w-[250px] h-11 px-4 outline-none appearance-none bg-transparent relative z-10 cursor-pointer">
                                <option value="" selected>--Select Category--</option>
                                <option value="music">Music</option>
                                <option value="development">Development</option>
                                <option value="business">Business</option>
                                <option value="finance">Finance</option>
                                <option value="accounting">Accounting</option>
                                <option value="it-software">IT & Software</option>
                                <option value="office-productivity">Office Productivity</option>
                                <option value="personal-development">Personal Development</option>
                                <option value="design">Design</option>
                                <option value="marketing">Marketing</option>
                                <option value="lifestyle">Lifestyle</option>
                                <option value="photography-video">Photography & Video</option>
                                <option value="health-fitness">Health & Fitness</option>
                                <option value="teaching-academics">Teaching & Academics</option>
                            </select>
                            <div className='w-[250px] h-11 px-4 absolute group-hover:bg-[#E3E7EA] top-0 -z-0'></div>
                            <div className='absolute right-3 top-4'>
                                <IoIosArrowDown />
                            </div>
                        </div>
                    </div>

                    {/* Subcategory Select */}
                    <div className='flex'>
                        <div className='group relative ml-auto'>
                            <select
                                onChange={onUserInput}
                                name="subcategory"
                                className="border border-black w-[250px] h-11 px-4 outline-none appearance-none bg-transparent relative z-10 cursor-pointer pointer-events-none">
                                <option value="" selected>--Select Subcategory--</option>
                            </select>
                            <div className='w-[250px] h-11 px-4 absolute group-hover:bg-[#E3E7EA] top-0 -z-0'></div>
                            <div className='absolute right-3 top-4'>
                                <IoIosArrowDown />
                            </div>
                        </div>
                    </div>
                </div>

                {/* taught what */}
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg flex items-center gap-2'>What is primarily taught in your course? <MdInfo className='size-5 cursor-pointer' /></h1>

                    <input className='border border-black h-11 w-[50%] outline-none px-4 placeholder:text-slate-500' placeholder='e.g. Landscape Photography' type="text" />

                </div>

                {/* coure image upload */}

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Course image</h1>

                    <div className='flex gap-4'>
                        <img className='size-[50%] border border-slate-300' src="https://s.udemycdn.com/course/750x422/placeholder.jpg" alt="" />

                        <div className='space-y-2'>
                            <h1>
                                Upload your course image here. It must meet our <span className='link-primary underline cursor-pointer'>course image quality standards</span> to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.</h1>

                            <div className='h-12 w-[100%] border border-black flex items-center pl-3 bg-[#F7F9FA]'>
                                <h1 >No file selected</h1>
                                <button className='h-full w-[30%] border-l border-black ml-auto bg-white hover:bg-[#E3E7EA] font-bold transition-all duration-100' >Upload File</button>
                            </div>


                            <input type="file" hidden />
                        </div>
                    </div>

                </div>

                {/* course promotional video */}

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Promotional video</h1>

                    <div className='flex gap-4'>
                        <img className='size-[50%] border border-slate-300' src="https://s.udemycdn.com/course/750x422/placeholder.jpg" alt="" />

                        <div className='space-y-2'>
                            <h1>
                                Your promo video is a quick and compelling way for students to preview what they’ll learn in your course. Students considering your course are more likely to enroll if your promo video is well-made.<span className='link-primary underline cursor-pointer'> Learn how to make your promo video awesome!</span> </h1>

                            <div className='h-12 w-[100%] border border-black flex items-center pl-3 bg-[#F7F9FA]'>
                                <h1 >No file selected</h1>
                                <button className='h-full w-[30%] border-l border-black ml-auto bg-white hover:bg-[#E3E7EA] font-bold transition-all duration-100' >Upload File</button>
                            </div>


                            <input type="file" hidden />
                        </div>
                    </div>

                </div>


            </div>


        </div>
    )
}

export default LandingPage