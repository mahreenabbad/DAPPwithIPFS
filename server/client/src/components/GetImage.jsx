import axios from 'axios'
import {useWeb3Context} from '../context/useWeb3Context'
import { useState, useEffect } from 'react'
import {toast} from 'react-hot-toast'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'

const GetImage = ({reload}) => {
    const [currentPage,setCurrentPage]=useState(1)
    const [imagePerPage, setImagePerPage]= useState(2)
    const[images,setImages] =useState([])
    const [loading,setLoading] =useState(false)
    const {web3State} = useWeb3Context()
    const {contractInstance,selectedAccount} = web3State;

    useEffect(()=>{
        try {
            const getImageHashes =async()=>{
                const ipfsHashes = await contractInstance.viewFiles(selectedAccount)
                return ipfsHashes
             }
             const getImage =async()=>{
                setLoading(true)
             const ipfsHashes = await getImageHashes()
             const ipfsHashesArray = Object.values(ipfsHashes)
             const url = `http://localhost:3000/api/getImage?page=${currentPage}&limit=${imagePerPage}`
             const token =localStorage.getItem("token")
             const config={
                 headers:{
                     "x-access-token":token
                 }
             }
             const res = await axios.post(url,ipfsHashesArray,config)
             const imagesData = res.data.decryptedImageArr;
             setImages(imagesData)
             setLoading(false)
            }
            contractInstance && getImage()
        } catch (error) {
            toast.error("Error fetchoing Images")
        }finally{
            setLoading(false)
        }
       
       
    },[contractInstance,currentPage,imagePerPage,selectedAccount,reload])
    
   const paginate =(pageNumber)=>setCurrentPage(pageNumber)

    return (<> {  !loading?(
        images.length>0?
        (
         <div className="flex justify-start md:justify-center items-center w-full  overflow-x-auto">
            {images.map((imgData, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${imgData}`}
                alt={`Image ${index + 1}`}
                className="w-[300px] h-[240px]  mx-2 object-cover"
              />
            ))}
          </div>
        )
        :(
        <p>No images found</p>
        )):<p>Loading...</p>
     }
    <div className="w-full h-20 flex justify-center items-center gap-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          <CircleArrowLeft className="w-8 h-8 opacity-80" />
        </button>
        <span className="font-bold text-[24px]">{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={loading}>
          <CircleArrowRight className="w-8 h-8 opacity-80" />
        </button>
      </div>
   
    </> );
}
 
export default GetImage;