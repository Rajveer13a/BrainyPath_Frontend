import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BsQuestionSquareFill } from 'react-icons/bs';
import { FaPhotoVideo } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { HiSearch } from "react-icons/hi";
import { IoIosArrowDown, IoMdChatboxes, IoMdSearch } from 'react-icons/io';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { MdAutoGraph, MdOutlineOndemandVideo } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import axiosInstance from '@/Helpers/axiosInstance';
import { isEmail } from '@/Helpers/regexMatcher';
import { ChangeRole } from '@/Redux/Slices/Management/ManagementSlice';
import { logout } from '@/Redux/Slices/AuthSlice';


const Select = ({ sortBy, setSortBy }) => {

    const [dropdown, setDropDown] = useState(false)

    const handleSort = (e) => {
        setSortBy(e.target.textContent);
        setDropDown(false)
    }

    return (
        <div className='relative group'>

            <button onClick={() => setDropDown(!dropdown)} className='border border-black px-4 py-3 font-bold flex items-center gap-2 hover:bg-[#E3E7EA]' htmlFor='dropdown-toggle'>
                {sortBy} <IoIosArrowDown />
            </button>

            <div className={`shadow-lg opacity-0 pointer-events-none border-2  absolute top-14  bg-white w-52  ${dropdown && "pointer-events-auto opacity-100"} bg-white z-20`}>
                <ul className='p-4  text-sm cursor-pointer '>
                    <li onClick={handleSort} className='pb-2 hover:text-blue-600 pee'>Newest</li>

                    <li onClick={handleSort} className='py-2 hover:text-blue-600'>Oldest</li>

                    <li onClick={handleSort} className='py-2 hover:text-blue-600'>A-Z</li>

                    <li onClick={handleSort} className='py-2 hover:text-blue-600'>Z-A</li>


                </ul>
            </div>
        </div>
    )
}

function ListCourses() {

    const dispatch = useDispatch();

    const isAdmin = useSelector((state) => state?.auth?.role) === "ADMIN";

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const [data, setData] = useState(null);

    const [ids, setIds] = useState(null);


    const [courselist, setCourseList] = useState(data);

    const [sortBy, setSortBy] = useState("Newest");

    const [searchTerm, setSearchTerm] = useState("")

    const [roleData, setRoleData] = useState({
        role: "MODE",
        email: ""
    })

    const onLogout = () => {
        dispatch(logout());
    }

    const onChangeRole = async (e) => {
        e.preventDefault();

        if (!isEmail(roleData.email)) {
            toast.error("invalid email address")
            return;
        }

        const res = await dispatch(ChangeRole(roleData));

        if (res?.payload) setRoleData({
            role: "MODE",
            email: ""
        });

    }

    useEffect(() => {
        if (data) {
            let arr = [...data];

            arr = arr.filter((value) => value.title.toLowerCase().includes(searchTerm.toLowerCase()))

            switch (sortBy) {
                case "Newest":
                    setCourseList(arr.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
                    break;

                case "A-Z":
                    setCourseList(arr.sort((a, b) => (a.title > b.title ? 1 : -1)));
                    break;

                case "Z-A":
                    setCourseList(arr.sort((a, b) => (a.title < b.title ? 1 : -1)));
                    break;

                case "Oldest":
                    setCourseList(arr.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1)));
                    break;


                default:
                    break;
            }
        }

    }, [data, sortBy, searchTerm])

    // get courses ids
    useEffect(() => {


        const res = axiosInstance.get("/manage/coursesForReview");

        toast.promise(res, {
            loading: "loading data",
        });

        res.then((res) => {
            let id_arr = res?.data?.data?.filter((value) => {
                if (value.reviewed == false) {
                    return value.course_id
                }
            });

            id_arr = id_arr.map((value) => value.course_id)

            setIds(id_arr);
            console.log(id_arr);


        }).catch((error) => {
            toast.error(error.response.data.message);
        })


    }, []);

    // get courses details
    useEffect(() => {
        if (ids) {

            const fetchCourseDetails = async () => {

                const promiseArray = ids.map((id) =>
                    axiosInstance.get("/manage/courseDetail", {
                        params: {
                            course_id: id
                        }
                    })
                );

                const result = await Promise.all(promiseArray);

                const courseDetails = result.map((result) => result.data.data[0]);

                setData(courseDetails);
                setCourseList(courseDetails)
            }


            fetchCourseDetails()





        }

    }, [ids])

    const resources = [
        {
            svg: <MdOutlineOndemandVideo className='m-auto size-12' />,
            title: "Test Video",
            p: "Send us a sample video and get expert feedback.",
            link: "/link"
        },
        {
            svg: <IoMdChatboxes className='m-auto size-12' />,
            title: "Instructor Community",
            p: "Connect with experienced instructors. Ask questions, browse discussions, and more."
        },
        {
            svg: <LiaChalkboardTeacherSolid className='m-auto size-12' />,
            title: "Teaching Center",
            p: "Learn about best practices for teaching on Udemy."
        },
        {
            svg: <MdAutoGraph className='m-auto size-12' />,
            title: "Marketplace Insights",
            p: "Validate your course topic by exploring our marketplace supply and demand."
        },
        {
            svg: <BsQuestionSquareFill className='m-auto size-10 mt-2' />,
            title: "Help and Support",
            p: "Browse our Help Center or contact our support team."
        },
    ]

    return (

        <div className='px-12 pt-14 relative'>

            {!isLoggedIn ? (
                <div className='space-x-2 pr-10'>
                    <Link to={"/login"}>
                        <button className='border border-black font-bold px-4 py-2 hover:bg-[#E3E7EA] duration-100 text-sm'>Log in</button>
                    </Link>

                    <Link to={"/signup"}>
                        <button className='bg-slate-800 font-bold px-4 py-2 text-sm hover:bg-slate-700 text-white duration-100 '>Sign up</button>
                    </Link>
                </div>
            ) : (
                <div className='flex'>
                    <button onClick={onLogout} className='bg-slate-800 font-bold px-4 py-2 text-sm hover:bg-slate-700 text-white duration-100 ml-auto'>Log out</button>
                </div>
            )

            }

            {
                isAdmin && <>
                    <Link to={"/management/admin"} className='link-primary font-bold absolute right-36'>Admin</Link>

                    <form onSubmit={onChangeRole} className='flex' action="">
                        <div className='border border-black w-[30vw] ml-48 flex'>
                            <select onClick={(e) => setRoleData({ ...roleData, role: e.target.value })} className='border-r py-2 px-3 border-black h-full ' name="" id="">
                                <option value="MODE">Mode</option>
                                <option value="null">terminate</option>
                            </select>
                            <input value={roleData.email} onChange={(e) => setRoleData({ ...roleData, email: e.target.value })} className='px-3 py-2 placeholder:text-slate-500 h-full flex-grow' placeholder='email' type="text" name="" id="" />



                        </div>
                        <button type='submit' className='font-bold text-white bg-slate-900 p-2 hover:bg-slate-800 duration-100'>Set Role</button>
                    </form>
                </>
            }

            <h1 className='text-4xl font-semibold py-10'>Courses</h1>

            {
                (data?.length == 0) && (
                    <div className='flex justify-between p-12 border-2 py-12 shadow-md mt-10'>
                        <h3 className=' '>Empty here!!</h3>

                    </div>
                )
            }

            {/* Show courses */}

            {
                data?.length > 0 && (<>


                    <div className='flex gap-8'>

                        <div className='relative h-12 w-[250px] '>

                            <input onChange={(e) => setSearchTerm(() => e.target.value)} className='border border-black h-full w-full p-4 pr-16 placeholder:text-slate-600 focus:outline-none' type="text" placeholder='Search for courses' />

                            <button className=' absolute top-0 right-0 text-white bg-black h-full w-[50px] '>
                                <IoMdSearch className='m-auto size-6' />
                            </button>

                        </div>

                        <Select sortBy={sortBy} setSortBy={setSortBy} />





                    </div>
                </>)
            }

            <div className='pt-5 space-y-6'>


                {
                    courselist?.map((value, indx) => (
                        <div key={indx} className='border-2  flex w-full group relative gap-2 searchParent'>
                            <img className='size-32 p-1  object-cover rounded ' src={value?.thumbnail?.secure_url || "https://s.udemycdn.com/course/200_H/placeholder.jpg"} alt="" />

                            <div className='py-4 flex flex-col group-hover:opacity-10 duration-100 w-[300px] pl-4' >
                                <h1 className='font-bold'>{value?.title}</h1>

                                <h3 className='mt-auto text-sm font-bold '>
                                    Category:
                                    <span className='font-semibold pl-2'>
                                        {value?.category}
                                    </span>
                                </h3>
                            </div>

                            <div className='flex flex-grow items-center justify-center space-x-5 group-hover:opacity-10 duration-100'>
                                <h1 className='font-bold h-7  '></h1>

                            </div>

                            <Link to={"/management/mode/review/curriculum"} state={value} >
                                <h1 className='font-bold text-xl text-[#3B198F] h-full  absolute   py-12 opacity-0 group-hover:opacity-100 duration-100 px-[220px] cursor-pointer  right-[200px] flex searchParent space-x-5' >

                                    <h1>Review course </h1>
                                    <FaPhotoVideo className='fill-black size-7' />

                                    {/* <HiSearch className='relative right-8 searchAnimate   size-8 fill-black ' /> */}
                                    <FcSearch className='relative right-8 searchAnimate   size-8 fill-black ' />
                                </h1>
                            </Link>

                        </div>
                    ))
                }


            </div>



            {/* cards */}
            <div className=''>
                <h1 className='text-center py-16'>Based on your experience, we think these resources will be helpful.</h1>

                <div className='flex border-2 shadow-md px-4 py-6 my-4 space-x-28'>

                    <img className='size-56 ml-32' src="https://s.udemycdn.com/instructor/dashboard/engaging-course-2x.jpg" alt="image" />


                    <div className='space-y-7  pt-11'>
                        <h1 className='text-2xl '>Create an Engaging Course</h1>

                        <p>

                            Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.
                        </p>
                        <h4 className='link text-blue-700 hover:text-blue-800 text-[17px]'>Get Started</h4>
                    </div>
                </div>

                <div className='flex space-x-8 w-full'>

                    <div className='flex border-2 shadow-md px-4 py-2 my-4 items-center w-[50%]'>
                        <img className='size-40 ml-12' src="https://s.udemycdn.com/instructor/dashboard/video-creation-2x.jpg" alt="" />

                        <div className='space-y-7  pt-4'>
                            <h1 className='text-[21px] '>Get Started with Video</h1>

                            <p>
                                Quality video lectures can set your course apart. Use our resources to learn the basics.
                            </p>
                            <h4 className='link text-blue-700 hover:text-blue-800 text-[17px]'>Get Started</h4>
                        </div>

                    </div>

                    <div className='flex border-2 shadow-md px-4 py-2 my-4 items-center w-[50%]'>
                        <img className='size-40 ml-12' src="https://s.udemycdn.com/instructor/dashboard/build-audience-2x.jpg" alt="" />

                        <div className='space-y-7  pt-4 '>
                            <h1 className='text-[21px] '>Build Your Audience</h1>

                            <p>
                                Set your course up for success by building your audience.
                            </p>
                            <h4 className='link text-blue-700 hover:text-blue-800 text-[17px]'>Get Started</h4>
                        </div>

                    </div>

                </div>

                {/*  */}

                <div className='flex border-2 shadow-md px-4 py-6 my-4 space-x-28'>

                    <img className='size-56 ml-32' src="https://s.udemycdn.com/instructor/dashboard/newcomer-challenge-2x.jpg" alt="image" />


                    <div className='space-y-7  pt-11'>
                        <h1 className='text-2xl '>
                            Join the New Instructor Challenge!</h1>

                        <p>
                            Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!
                        </p>
                        <h4 className='link text-blue-700 hover:text-blue-800 text-[17px]'>Get Started</h4>
                    </div>
                </div>

            </div>

            <div className='py-14 space-y-12'>

                <h1 className='text-center'>
                    Have questions? Here are our most popular instructor resources.
                </h1>

                <div className='flex  '>

                    {
                        resources.map((value, indx) => {
                            return (
                                <Link key={indx} to={value?.link} className='w-[20%]' >
                                    <div className='text-center  space-y-3'>
                                        {value.svg}
                                        <h4 className='font-bold text-lg link text-blue-700 '>{value.title}</h4>
                                        <p className='text-sm px-4'>
                                            {value.p}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>




            </div>

        </div>

    )
}

export default ListCourses
