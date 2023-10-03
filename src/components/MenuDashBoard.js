import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '/./source/asg/src/img/logo.png'
import { FaChartBar, FaUsers, FaBox } from 'react-icons/fa'; // Import icons as needed

const MenuDashBoard = () => {


    return (
        <div className='min-h-[800px] min-w-[150px] max-w-[200px] top-0 right-0  flex px-4 mt-2 mb-8 ml-5'>
            {/* Sidebar */}
            <div className='bg-white w-64 p-4 shadow-lg'>
                {/* Logo */}
                <Link to='/' className='text-2xl font-bold mb-8 text-center'>
                    <img src={Logo} class='h-20 mr-3' alt='Zics Store Logo' />
                </Link>

                {/* Navigation links */}
                <ul className='space-y-8 mt-10'>
                    <li>
                        <Link to='/DashBoard' className='flex items-center p-2  bg-gradient-to-t  from-mints to-blue-500  bg-clip-text text-transparent'>
                            <FaChartBar className='mr-2 text-mint' />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to='/Orders' className='flex items-center p-2  bg-gradient-to-r  from-mints to-blue-500  bg-clip-text text-transparent'>
                            <FaUsers className='mr-2 text-mint' />
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to='/CategoryAdmin' className='flex items-center p-2  bg-gradient-to-r  from-mints to-blue-500  bg-clip-text text-transparent'>
                            <FaUsers className='mr-2 text-mint' />
                            Category
                        </Link>
                    </li>
                    <li>
                        <Link to='/ProductAdmin' className='flex items-center p-2  bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>
                            <FaBox className='mr-2 text-mint' />
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to='/ProductAdmin' className='flex items-center p-2  bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>
                            <FaBox className='mr-2 text-mint' />
                            Chart
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuDashBoard;