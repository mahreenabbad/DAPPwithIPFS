// import { useWeb3Context } from "../context/useWeb3Context";
import GetImage from "../components/GetImage";
import UploadImage from "../components/UploadImage";
import { useState } from "react";
const Home = () => {
    const [reload ,setReload] =useState(false)
    // const {web3State} =useWeb3Context()
    // const {selectedAccount} =web3State;
    // console.log(selectedAccount)
    const reLoadEffect =()=>{
      setReload(!reload)
    }


    return (  
     <div className="relative h-full w-screen flex flex-col justify-center items-center mt-8 px-4 ">
     <UploadImage reLoadEffect={reLoadEffect}/>
     <GetImage reload={reload} />
     </div> );
}
 
export default Home;