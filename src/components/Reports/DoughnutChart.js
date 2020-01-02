import React from "react";
import {Doughnut} from 'react-chartjs-2';


export default function Doughnut(props) {
  
     const doughnutData = {
        labels  : props.label,
        datasets: [
            {
                data                : props.graphData,
                backgroundColor     : [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    'FF6384',
                    '#36A2EB'

                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }
        ]
    };
    

    
  return (
    <div>
        <div className="content">   
            <Doughnut data={doughnutData}
              options={{
                title:{
                  display:true,
                  text:props.title,
                  fontSize:20
                }
            }}  />              
        </div>
   
    </div>
  );
}
