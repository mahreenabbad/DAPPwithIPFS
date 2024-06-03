import  Wallet  from '../pages/Wallet'
import Home from '../pages/Home';
import {createBrowserRouter} from 'react-router-dom'
import Navbar from "../components/Navbar"

export const routes = createBrowserRouter([
    {path:'/',element:<Wallet/>},
    {path:'/home',element:(
     <div  className=" w-full h-[80px] bg-sky-300 flex justify-center items-center border-b-2 border-gray-700">
        <Navbar/>
        <Home/>
     </div>   
    )}
]);
