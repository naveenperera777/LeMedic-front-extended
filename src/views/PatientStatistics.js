import React, { useState , useEffect } from "react";
import { Grid, Row, Col,ListGroup,ListGroupItem,MenuItem,DropdownButton } from "react-bootstrap";
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import BarChart from '../components/Reports/BarChart';


export default function PatientStatistics() {

    const [gender, setGender] = useState("select gender");
    const [genderCount, setgenderCount] = useState({});
    // const [diseaseList, setDiseaseList] = useState([]);
    const [diseaseListWithCount, setdiseaseListWithCount] = useState({});
    const [disease, setDisease] = useState("Select Disease");

    let label = [];
    let graphData = [];
    if(disease =="All"){
      delete diseaseListWithCount.All;
      for (let [key, value] of Object.entries(diseaseListWithCount)) {
        console.log("key is --->",key, value);
        label.push(key);
        graphData.push(value);
    }
    diseaseListWithCount["All"] = 0;   
    } else {
      label.push(disease);
      graphData.push(diseaseListWithCount[disease]);
    }

    console.log("graph data",graphData);

     const data = {
        labels  : label,
        datasets: [
            {
                label               : 'Patient Count',
                backgroundColor     : 'rgba(255,99,132,0.2)',
                borderColor         : 'rgba(255,99,132,1)',
                borderWidth         : 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor    : 'rgba(255,99,132,1)',
                data                : graphData
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

        const fetchDiseaseListWithCount = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/patient/count/disease`
          );
          let diseaseArr = result.data.data;
          diseaseArr.push({"disease": "All", "total": 0});
          console.log("diseaseArr",diseaseArr);
          for( let i=0 ; i < diseaseArr.length; i++){
            let disease = diseaseArr[i];
            setdiseaseListWithCount(diseaseListWithCount => 
              ({ ...diseaseListWithCount, [disease.disease]: disease.total}));
          }
        };

        // const fetchDiseaseList = async () => {
        //   const result = await axios(
        //     `http://localhost:9090/statistics/patient/disease/list`
        //   );
        //   let alldieaseList = result.data.data;
        //   console.log("dis------->",alldieaseList);
        //   alldieaseList.push("All")
        //   setDiseaseList(alldieaseList);
        // };

        fetchDiseaseListWithCount();
        fetchGenderCount();
        // fetchDiseaseList();
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
    // console.log("disease list",diseaseList);


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
           {   
          Object.keys(diseaseListWithCount).map((key,value)=>{
            return (
          <MenuItem eventKey={value} onSelect={() => onSelect("disease",key)}>{key}</MenuItem>
              )
          })
        }
        {/* {diseaseList.map(ailment => {              
              return(
                  <MenuItem eventKey={ailment} onSelect={() => onSelect("disease",ailment)}>{ailment}</MenuItem>
              );
            })} */}

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
        <DropdownButton title={"city"}>
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

          <Col xs={12} md={8}>

            <BarChart label={label} graphData={graphData}/>

           {/* <Bar
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
                /> */}
              
              
            </Col>
          </Row>



        </Grid>


        </div>
   
    </div>
  );
}
