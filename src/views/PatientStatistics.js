import React, { useState , useEffect } from "react";
import { Grid, Row, Col,ListGroup,ListGroupItem,MenuItem,DropdownButton } from "react-bootstrap";
import {Bar} from 'react-chartjs-2';
import axios from 'axios';


export default function PatientStatistics() {

    const [gender, setGender] = useState("select gender");
    const [genderCount, setgenderCount] = useState({});
    const [diseaseList, setDiseaseList] = useState([]);
    const [diseaseCount, setdiseaseCount] = useState({});
    const [disease, setDisease] = useState("Select Disease");

    console.log("data",genderCount[gender]);
     const data = {
        labels  : [disease],
        datasets: [
            {
                label               : 'My First dataset',
                backgroundColor     : 'rgba(255,99,132,0.2)',
                borderColor         : 'rgba(255,99,132,1)',
                borderWidth         : 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor    : 'rgba(255,99,132,1)',
                data                : [diseaseCount[disease]]
            }
        ]
    };
    

    useEffect(() => {
        const fetchGenderCount = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/patient/count/gender`
          );
          let genderArr = result.data.data;
          console.log("genderArr",genderArr);
          for( let i=0 ; i < genderArr.length; i++){
            let genderItem = genderArr[i];
            setgenderCount(genderCount => 
              ({ ...genderCount, [genderItem.gender]: genderItem.total}));
          }
        };

        const fetchDiseaseCount = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/patient/count/disease`
          );
          let diseaseArr = result.data.data;
          console.log("diseaseArr",diseaseArr);
          for( let i=0 ; i < diseaseArr.length; i++){
            let disease = diseaseArr[i];
            setdiseaseCount(diseaseCount => 
              ({ ...diseaseCount, [disease.disease]: disease.total}));
          }
        };

        const fetchDiseaseList = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/patient/disease/list`
          );

          setDiseaseList(result.data.data);
        };

        fetchDiseaseCount();
        fetchGenderCount();
        fetchDiseaseList();
      }, []);
  

    function handleDiseaseChange(value){
      setDisease(value);      
    } 

    function onSelect(type,value){
        console.log("event",type,value);
        switch(type){
          case 'disease':
            handleDiseaseChange(value);
            break;
          case 'gender':
            setGender(value)
        }
    }


    console.log("selected gender",gender);
    console.log("gender count",genderCount);
    console.log("disease list",diseaseList);


  return (
    <div>
        <div className="content">
        <Grid fluid>

        <Row>
        <Col xs={6} md={4}>
              <ListGroup>
                  <ListGroupItem>
                      Select Gender
                  </ListGroupItem>
              </ListGroup>
        </Col>

        <Col xs={6} md={4}>
        <DropdownButton title={gender}>
        <MenuItem eventKey="1" onSelect={() => onSelect("gender","Male")}>Male</MenuItem>
       <MenuItem eventKey="2" onSelect={() => onSelect("gender","Female")}>Female</MenuItem>
        </DropdownButton>
        </Col>            
       
      </Row>

          <Row>
        <Col xs={6} md={4}>
              <ListGroup>
                  <ListGroupItem>
                      Select Disease
                  </ListGroupItem>
              </ListGroup>
        </Col>

        <Col xs={6} md={4}>
        <DropdownButton title={disease}>
        {diseaseList.map(ailment => {              
              return(
                  <MenuItem eventKey={ailment} onSelect={() => onSelect("disease",ailment)}>{ailment}</MenuItem>
              );
            })}

        </DropdownButton>
        </Col>            
       
          </Row>

          <Row>
        <Col xs={6} md={4}>
              <ListGroup>
                  <ListGroupItem>
                      Select Area
                  </ListGroupItem>
              </ListGroup>
        </Col>

        <Col xs={6} md={4}>
        <DropdownButton title={gender}>
        {/* <MenuItem eventKey="1" onSelect={() => onSelect("Male")} value="male">Male</MenuItem>
        <MenuItem eventKey="2" onSelect={() => onSelect("Female")}>Female</MenuItem> */}
        </DropdownButton>
        </Col>            
       
          </Row>


          <Row>
              
          {/* {genderCount.map(record => {
              console.log("record",record);
              return(
                <div>
              <h6>{record.gender}:{record.total}</h6>
              </div>
              );
            })} */}
    
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
                            max: 20    
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
