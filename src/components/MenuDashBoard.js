import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png'

const MenuDashBoard = () => {


    return (
        <div className='min-h-[800px] min-w-[150px] max-w-[200px] top-0 right-0  flex px-4 mt-2 mb-8 ml-5'>
            {/* Sidebar */}
            <div className='bg-white w-64 p-4 shadow-lg'>
                {/* Logo */}
                <Link to='/' className='text-2xl font-bold mb-8 text-center'>
                    <img src={Logo} className='h-20 mr-3' alt='Zics Store Logo' />
                </Link>
                <ul className="menu bg-base-200 rounded-box px-2">
                    <li className='py-4 my-4'>
                        <Link to='/Admin/DashBoard'>
                            <div className='flex items-center justify-between'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                <h1 className="font-extrabold text-transparent text-md bg-clip-text bg-gradient-to-r from-mint to-blue-400">
                                    DashBoard
                                </h1>
                            </div>
                        </Link>

                    </li>
                    <li className='py-4 my-4'>
                        <Link to='/Admin/Orders'>
                            <div className='flex items-center justify-between'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h1 className="font-extrabold text-transparent text-md bg-clip-text bg-gradient-to-r from-mint to-blue-400">
                                    Orders
                                </h1>
                            </div>
                        </Link>
                    </li>
                    <li className='py-4 my-4'>
                        <Link to='/Admin/Categories'>
                            <div className='flex items-center justify-between'>
                            <svg className="svg-icon h-8 w-8" viewBox="0 0 20 20">
							<path d="M6.634,13.591H2.146c-0.247,0-0.449,0.201-0.449,0.448v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449v-2.692C7.083,13.792,6.881,13.591,6.634,13.591 M6.185,16.283h-3.59v-1.795h3.59V16.283zM6.634,8.205H2.146c-0.247,0-0.449,0.202-0.449,0.449v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V8.653C7.083,8.407,6.881,8.205,6.634,8.205 M6.185,10.897h-3.59V9.103h3.59V10.897z M6.634,2.819H2.146c-0.247,0-0.449,0.202-0.449,0.449V5.96c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V3.268C7.083,3.021,6.881,2.819,6.634,2.819 M6.185,5.512h-3.59V3.717h3.59V5.512z M15.933,5.683c-0.175-0.168-0.361-0.33-0.555-0.479l1.677-1.613c0.297-0.281,0.088-0.772-0.31-0.772H9.336c-0.249,0-0.448,0.202-0.448,0.449v7.107c0,0.395,0.471,0.598,0.758,0.326l1.797-1.728c0.054,0.045,0.107,0.094,0.161,0.146c0.802,0.767,1.243,1.786,1.243,2.867c0,1.071-0.435,2.078-1.227,2.837c-0.7,0.671-1.354,1.086-2.345,1.169c-0.482,0.041-0.577,0.733-0.092,0.875c0.687,0.209,1.12,0.314,1.839,0.314c0.932,0,1.838-0.173,2.673-0.505c0.835-0.33,1.603-0.819,2.262-1.449c1.322-1.266,2.346-2.953,2.346-4.751C18.303,8.665,17.272,6.964,15.933,5.683 M15.336,14.578c-1.124,1.077-2.619,1.681-4.217,1.705c0.408-0.221,0.788-0.491,1.122-0.812c0.97-0.929,1.504-2.168,1.504-3.485c0-1.328-0.539-2.578-1.521-3.516c-0.178-0.17-0.357-0.321-0.548-0.456c-0.125-0.089-0.379-0.146-0.569,0.041L9.769,9.327v-5.61h5.861l-1.264,1.216c-0.099,0.094-0.148,0.229-0.137,0.366c0.014,0.134,0.088,0.258,0.202,0.332c0.313,0.204,0.61,0.44,0.882,0.7c1.158,1.111,2.092,2.581,2.092,4.145C17.405,12.026,16.48,13.482,15.336,14.578"></path>
						</svg>
                                <h1 className="font-extrabold text-transparent text-md bg-clip-text bg-gradient-to-r from-mint to-blue-400">
                                    Category
                                </h1>
                            </div>
                        </Link>
                    </li>
                    <li className='py-4 my-4'>
                        <Link to='/Admin/Product'>
                            <div className='flex items-center justify-between'>
                                <svg className="svg-icon h-8 w-8" viewBox="0 0 20 20">
                                    <path d="M17.638,6.181h-3.844C13.581,4.273,11.963,2.786,10,2.786c-1.962,0-3.581,1.487-3.793,3.395H2.362c-0.233,0-0.424,0.191-0.424,0.424v10.184c0,0.232,0.191,0.424,0.424,0.424h15.276c0.234,0,0.425-0.191,0.425-0.424V6.605C18.062,6.372,17.872,6.181,17.638,6.181 M13.395,9.151c0.234,0,0.425,0.191,0.425,0.424S13.629,10,13.395,10c-0.232,0-0.424-0.191-0.424-0.424S13.162,9.151,13.395,9.151 M10,3.635c1.493,0,2.729,1.109,2.936,2.546H7.064C7.271,4.744,8.506,3.635,10,3.635 M6.605,9.151c0.233,0,0.424,0.191,0.424,0.424S6.838,10,6.605,10c-0.233,0-0.424-0.191-0.424-0.424S6.372,9.151,6.605,9.151 M17.214,16.365H2.786V7.029h3.395v1.347C5.687,8.552,5.332,9.021,5.332,9.575c0,0.703,0.571,1.273,1.273,1.273c0.702,0,1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h5.941v1.347c-0.495,0.176-0.849,0.645-0.849,1.199c0,0.703,0.57,1.273,1.272,1.273s1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h3.395V16.365z"></path>
                                </svg>                                
                                <h1 className="font-extrabold text-transparent text-md bg-clip-text bg-gradient-to-r from-mint to-blue-400">
                                    Product
                                </h1>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuDashBoard;