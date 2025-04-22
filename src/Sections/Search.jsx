import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Details from './Details'

const Search = () => {
    const API = 'https://world.openfoodfacts.org/api/v3/product/';
    const [barcode, setBarcode] = useState('');
    const [data, setData] = useState(null);
    const [flag, setFlag] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleChange=(e)=>{
        setBarcode(e.target.value);
        console.log(barcode);
    }
    
    const handleClick = async (e) =>{
        e.preventDefault();
        try{
            setLoading(true);
            setError(false);
            setFlag(false);
            const response = await axios.get(API+barcode+'.json');
            setBarcode('');
            setData(response.data);
            console.log(data);
            setFlag(true);
        }catch(err){
            setError(true);
            console.log(err.message);
            setBarcode('');
            setData({
                result:{
                    name:'Invailid Barcode'
                }
            });
            setFlag(true);
        }finally{
            setLoading(false);
        }
    }
    
  return (
    <section id='search' className='w-full min-h-[100vh] bg-cover bg-center flex flex-col items-center font-["Outfit",sans-serif] scroll-smooth'>
        <div className="border-[1px] border-black bg-white rounded-md w-[500px] h-[50px] mt-10 flex overflow-hidden max-sm:w-[330px]">
            <form onSubmit={handleClick} className='w-full h-full flex'>
                <input onChange={handleChange} value={barcode} required className='w-full h-full flex-1 px-3 border-none outline-none focus:border focus:border-black' type="text" placeholder='Enter the barcode here...'/>
                <button type='submit'  className='bg-black text-white font-bold text-sm w-16 h-full flex justify-center items-center hover:bg-gray-500 px-3 py-2 rounded-md border-[1px] border-green'>Search</button>
            </form>
        </div>
        <div className='mt-5'>
            {loading && <h1 className='text-2xl mt-5'>Loading...</h1>}
            {flag?<Details content = {data} />:null}
            {error?<div>
                <p className='text-2xl font-bold text-center'>Product was not found in database.</p>
            </div>:null}
        </div>
    </section>
  )
}

export default Search