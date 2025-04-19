import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
// Import images directly from the assets folder
import A from '../assets/Img/A.png';
import B from '../assets/Img/B.png';
import C from '../assets/Img/C.png';
import D from '../assets/Img/D.png';
import E from '../assets/Img/E.png';


const Details = ({content}) => {
  console.log(content);
  
  const [data, setData] = useState();
  const [ing, setIng] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [nut, setNut] = useState([]);
  const [nutLevel, setNutLevel] = useState({});
  const [found, setProductFound] = useState(false);
  const [score, setScore]  = useState();
  
  useEffect(()=>{
    console.log(3);
    setData(content);
  },[content]);
  
  useEffect(()=>{
    console.log(1);
    console.log(data);
    
    if(data){
        if(data.result.name === 'Invailid Barcode'){
          setProductFound(false);
          return;
        }
        if(data.result.name === 'Product found'){
          console.log(7);
          setIng(data.product.ingredients);
          setNutLevel(data.product.nutrient_levels)
          let sc = data.product.nutriscore_score;
          if(sc>=0 && sc <= 2){
            setScore(E);
          }else if(sc>=3 && sc<=10){
            setScore(D);
          }else if(sc>=11 && sc <= 18){
            setScore(C);
          }else if(sc >= 19 && sc <= 40){
            setScore(B);
          }else{
            setScore(A);
          }
          setProductFound(true);
        }else{
          console.log(4);
          setProductFound(false);
        }
    }
  },[data, content]);
  
  useEffect(()=>{
    setNut(Object.entries(nutLevel));
    if(ing){
      console.log(99);
      console.log(ing);
      const color = [];
    for(let i=0; i<ing.length; i++){
      color.push(random_rgba());
    }
    const chart = {
      labels: ing.map((c)=>{
        return c.text;
      }),
      datasets:[{
        data: ing.map((c)=> c.percent_estimate),
        backgroundColor:color,
        hoverOffset:4,
        borderColor:'#000000'
      }]
    }
    
    setChartData(chart);
    }
    
    console.log(chartData);
  },[ing]);
  
  const random_rgba = () => {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  }

  return (
    <div className="font-['Outfit',sans-serif]">
      {(data)?
        <div className='max-sm:w-full'>
        {(found)? 
            <div className=' px-5 py-3 flex gap-5 max-sm:gap-5 flex-col'>
            <h1 className='bg-white py-5 px-5 rounded-xl shadow-2xl text-center w-full text-2xl'>{data.product.brands}</h1>
            {score?<div className='rounded-xl py-2 px-3 flex bg-white justify-center'>
              <h1 className='text-2xl flex gap-4 items-center'>Nutrition Grade - <img src={score} alt="score" height={50} width={50} /> </h1>
            </div>:null}
              <div className='flex max-md:flex-col gap-[20px]'>
                <div>
                  {(ing)?
                    <div className='mb-[20px] bg-white py-5 rounded-xl shadow-2xl px-5 min-h-[190px]'>
                    <h1 className='mb-2 text-center text-2xl'>Ingredients</h1>
                  {ing.map((ing)=>(
                    <div className='flex justify-between'>
                      <p className='mr-6'>{ing.text}</p>
                      <p>{ing.percent_estimate}%</p>
                    </div>
                  ))}
                  </div>
                  :null}
                  {(nut)?
                    <div className='bg-white py-5 rounded-xl shadow-2xl px-5 min-h-[190px]'>
                    <h1 className=' mb-2 text-center text-2xl'>Nutrients</h1>
                    {nut.map((n)=>(
                      <div className='flex justify-between gap-6'>
                        <p>{n[0].toUpperCase()}</p>
                        <p>{n[1].toUpperCase()}</p>
                      </div>
                    ))}
                  </div>
                  :null}
                </div>
                {(chartData && chartData.labels && chartData.labels.length !== 0)?
                  <div className='bg-white py-5 rounded-xl shadow-2xl min-h-[400px] '>
                  <h1 className='text-center text-2xl mb-5'>Ingredients Chart</h1>
                  <Doughnut data = {chartData} />
                </div>
                :null}
              </div>
              
          </div> 
        : null}
        
    </div>
        
      :null}
    </div>
  )
}

export default Details