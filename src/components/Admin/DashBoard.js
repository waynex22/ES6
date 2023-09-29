import React from 'react';
import NavLeft  from './NavLeft';
import NavContent from './NavContent';
const DashBoard = () => {
    return (
        <div className='flex flex-row justify-between '>
        <NavLeft />
        <NavContent />
        </div>
        )
}
export default DashBoard;