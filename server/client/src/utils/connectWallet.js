import { ethers } from "ethers";
import contractAbi from "../constants/contractAbi.json"
import toast from "react-hot-toast"
import axios from "axios"

export const connectWallet =async()=>{
    try {
        if(!window.ethereum){
    throw new Error("MetaMask not connected")
}
const accounts = await window.ethereum.request({
    method:"eth_requestAccounts"
})
// console.log(accounts[0])
     const selectedAccount = accounts[0];
     const provider = new ethers.BrowserProvider(window.ethereum);// for reading
     const signer = await provider.getSigner();//for writing

    const message = "Welcome to crypto Valut"
    const signature = await signer.signMessage(message)
    // console.log(signature)

    const dataSignature ={
        signature
    }
    const url =`http://localhost:3000/api/authentication?address=${selectedAccount}`;

    const res = await axios.post(url,dataSignature);
    const token = res.data.token
    localStorage.setItem("token",token)
    // console.log(res.data.token)

     const contractAddress ="0x7fa4504Dfd105f8EfAfADBc4e0429FE745797163";
     const contractInstance = new ethers.Contract(contractAddress,contractAbi,signer)
     return {contractInstance,selectedAccount}
    } catch (error) {
        toast.error("Wallet Connection Failed")
        // console.error(error)
    }


}