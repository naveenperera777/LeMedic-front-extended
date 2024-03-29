import React from "react";
import {Bar,Doughnut} from 'react-chartjs-2';


export default function PatientStatistics(props) {
  
    const data = {
        labels  : props.label,
        datasets: [
            {
                label               : props.title,
                backgroundColor     : props.color,
                borderColor         : props.color,
                borderWidth         : 1,
                hoverBackgroundColor: props.color,
                hoverBorderColor    : props.color,
                data                : props.graphData
            }
        ]
    };
    
  return (
    <div>
        <div className="content">
           <Bar
            data={data}
            width={100}
            height={50}
            options={{
                title:{
                  display:true,
                  text:props.title,
                  fontSize:20
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,                              
                        },
                        stretch: true
                      }]
                   }
            }} />  
               
        </div>
   
    </div>
  );
}
