import React, { useState , useEffect } from "react";
import { Grid, Row, Col,ListGroup,ListGroupItem,MenuItem,DropdownButton } from "react-bootstrap";
import {Bar} from 'react-chartjs-2';
import axios from 'axios';


export default function PatientStatistics() {

    const [gender, setGender] = useState("");
    const [genderCount, setgenderCount] = useState([])
    
     const data = {
        labels  : ['Male', 'Female'],
        datasets: [
            {
                label               : 'My First dataset',
                backgroundColor     : 'rgba(255,99,132,0.2)',
                borderColor         : 'rgba(255,99,132,1)',
                borderWidth         : 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor    : 'rgba(255,99,132,1)',
                data                : [400,800]
            }
        ]
    };
    

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/patient/count/gender`
          );

        setgenderCount(result.data.data);
          console.log("patientCount----->", genderCount);
        };
        fetchData();
      }, []);

    function onSelect(event){
        console.log("event",event);
        setGender(event);
    }

    function createLegend(json) {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
          var type = "fa fa-circle text-" + json["types"][i];
          legend.push(<i className={type} key={i} />);
          legend.push(" ");
          legend.push(json["names"][i]);
        }
        return legend;
      }
    console.log("selected gender",gender);
  return (
    <div>
        <div className="content">
        <Grid fluid>

        <Row>
        <Col xs={6} md={4}>
              <ListGroup>
                  <ListGroupItem>
                      Gender
                  </ListGroupItem>
              </ListGroup>
        </Col>

        <Col xs={6} md={4}>
        <DropdownButton title="Dropdown">
        <MenuItem eventKey="1" onSelect={() => onSelect("male")} value="male">Male</MenuItem>
        <MenuItem eventKey="2" onSelect={() => onSelect("male")}>Female</MenuItem>
        </DropdownButton>
        </Col>            
       
          </Row>


          <Row>
              
          {genderCount.map(record => {
              console.log("record",record);
              return(
                <div>
              <h6>{record.gender}:{record.total}</h6>
              </div>
              );
            })}
    
          </Row>

          <Row>

          <Col md={6}>

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
                            max: 1000    
                        }
                      }]
                   }
            }}
                />
              
              
            </Col>
          </Row>



        </Grid>


        </div>
   
    </div>
  );
}
