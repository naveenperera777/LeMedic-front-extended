import React from "react";
import {Bar,Doughnut} from 'react-chartjs-2';


export default function PatientStatistics(props) {
  
    const data = {
        labels  : props.label,
        datasets: [
            {
                label               : 'Patient Count',
                backgroundColor     : 'rgba(255,99,132,0.2)',
                borderColor         : 'rgba(255,99,132,1)',
                borderWidth         : 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor    : 'rgba(255,99,132,1)',
                data                : props.graphData
            }
        ]
    };

    const doughnutData = {
        labels  : props.label,
        datasets: [
            {
                data                : props.graphData,
                backgroundColor     : [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
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
           <Bar
            data={data}
            width={100}
            height={50}
            options={{
                title:{
                  display:true,
                  text:'Patient Count',
                  fontSize:20
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            min: 0,
                            max: 10    
                        }
                      }]
                   }
            }} />  
            <Doughnut data={doughnutData}
              options={{
                title:{
                  display:true,
                  text:'Patient Count',
                  fontSize:20
                }
            }}  />              
        </div>
   
    </div>
  );
}
