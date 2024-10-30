import React from 'react'
import Logo from '../../assets/Logo.svg';
import arrow_down from "../../assets/arrow_drop.svg";
import setting from "../../assets/settings.svg";
import shopping from "../../assets/Shopping_bag.svg";
import UserMenu from "../../Components/UserMenu/UserMenu.tsx";
export const Navbar: React.FC = () => {
  return(
    <div className='bg-black flex justify-between'>

     <div className='flex items-center p-5'>
        <div>
            <img src={Logo} alt='Logo'className='w-12 h-auto'/>
        </div>
        <div className='text-white pl-3 text-2xl'>
           F.R.I.D.A.Y
        </div>
        
        <div>
            <img src={arrow_down} alt='arrow_down' className='w-9 h-auto'/>
        </div>
     </div>

     <div className='flex p-5'>
        <div>
            <img src={shopping} alt='shopping' className='w-10 h-auto mr-9 transform translate-y-1'/>
        </div>
        <div>
            <img src={setting} alt='setting' className='w-9 h-auto mr-9 transform translate-y-1'/>
        </div>
        <div>
           <UserMenu/>
        </div>
     </div>


    </div>
  )
}

Navbar.displayName = 'Navbar'