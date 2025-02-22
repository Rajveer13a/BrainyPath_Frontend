import React, { useState } from 'react';
import { BsBing, BsQuestionCircle } from "react-icons/bs";
import { LuWrench } from "react-icons/lu";
import { MdOndemandVideo } from "react-icons/md";
import { MdOutlineChat } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';

import Footer from '@/components/Footer';

import Hover from '../components/Hover';
import Iprofile from '../components/Iprofile';
import Notification from '../components/Notification';



function LayoutIn({children,tab}) {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
  
    const [current, setCurrent] = useState(tab);
  
    const leftbar = "border-l-4  border-blue-700";
  
    const listStyle = "px-4 flex space-x-8 items-center h-6 py-6 hover:bg-[#3E4143] transition ease-in-out duration-100 cursor-pointer border-l-4   ";
  
    return (
      <>
      <div className='flex'>
  
  {/* side navbar */}
  <div className={`${open ? "w-[295px] " : "w-[65px]"} bg-[#2D2F31] h-[100%] duration-500  overflow-hidden  text-lg font-bold flex flex-col items-start shadow-lg fixed z-50`}
    onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>

    <ul className='py-6 text-white font-bold flex flex-col    space-y-4 w-[295px]'>

      <li onClick={() => navigate('/')} className='px-4 pb-4 flex items-center cursor-pointer'>

        <BsBing className='size-8 text-blue-600 ' />
        <h1 className={`${!open ? "opacity-0" : ""} text-2xl transition ease-in-out duration-500 `}>rainy</h1>

      </li>

      <Link to={"/instructor/courses"} onClick={() => setCurrent(0)} className={`${listStyle}  ${current == 0 ? " border-blue-700 " : "border-transparent"}`}>

        <MdOndemandVideo className='size-[26px]' />

        <h1 className={` transition ease-in-out duration-500 ${!open ? "opacity-0" : ""} `}>Courses</h1>

      </Link>



      <li onClick={() => setCurrent(1)} className={`${listStyle} ${current == 1 ? leftbar : "border-transparent"}`}>

        <MdOutlineChat className='size-[26px]' />

        <h1 className={` transition ease-in-out duration-500 ${!open ? "opacity-0" : ""} `}>Communication</h1>

      </li>



      <Link to={"/instructor/performance"} onClick={() => setCurrent(2)} className={`${listStyle}  ${current == 2 ? leftbar : "border-transparent"}`}>

        <RiBarChartFill className='size-[26px]' />

        <h1 className={` transition ease-in-out duration-500 ${!open ? "opacity-0" : ""} `}>Performance</h1>

      </Link>



      <li onClick={() => setCurrent(3)} className={`${listStyle}  ${current == 3 ? leftbar : "border-transparent"}`}>

        <LuWrench className='size-[26px]' />

        <h1 className={` transition ease-in-out duration-500 ${!open ? "opacity-0" : ""} `}>tools</h1>

      </li>


      <div onClick={() => setCurrent(4)} className={`${listStyle} ${current == 4 ? leftbar : "border-transparent"}`}>

        <BsQuestionCircle className='size-[26px]' />

        <h1 className={` transition ease-in-out duration-500 ${!open ? "opacity-0" : ""} `}>Resources</h1>

      </div>


    </ul>

  </div>

  {/* top right bar */}
  <div className='ml-[65px] border-4  w-[95vw] '>
    <div className='absolute right-1 flex  px-4 pt-4  top-2  h-[80px] '>
      
      <Hover className={"group"} contentClass={"px-4 py-2"} title={<h1 className='group-hover:text-blue-600 font-medium pt-2 mr-4' ><Link to={"/"}>Student</Link></h1>}>
        <li className='w-[266px] py-2 text-sm font-medium text-center'>Switch to the student view here - get back to the courses you’re taking.</li>
      </Hover>

      <Notification/>

      <Iprofile />
    </div>

    {children}

  </div>

</div>

<Footer/>
      </>
    )
}

export default LayoutIn
