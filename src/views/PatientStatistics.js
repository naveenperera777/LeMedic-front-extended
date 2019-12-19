import React, { useState , useEffect } from "react";
import { Grid, Row, Col,ListGroup,ListGroupItem,MenuItem,DropdownButton } from "react-bootstrap";
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import BarChart from '../components/Reports/BarChart';
// CSS 57.9%	 JavaScript 41.5%	 HTML 0.6%

export default function PatientStatistics() {

    const [gender, setGender] = useState("select gender");
    const [genderCount, setgenderCount] = useState({});
    const [diseaseListWithCount, setdiseaseListWithCount] = useState({});
    const [disease, setDisease] = useState("Select Disease");
    const [selectedCategory,setSelectedCategory] = useState([]);

    let label = [];
    let graphData = [];
    if(selectedCategory.length == 1 ){
      let category = selectedCategory[0];
      if(category == "disease"){
      switch(disease){
        case "All":
          delete diseaseListWithCount.All;
          delete diseaseListWithCount.None;
          for (let [key, value] of Object.entries(diseaseListWithCount)) {
            console.log("key is --->",key, value);
            label.push(key);
            graphData.push(value);
            }
            diseaseListWithCount["All"] = 0; 
            diseaseListWithCount["None"] = 0; 
            break; 
        case "None":
          break;
        default:
          label.push(disease);
          graphData.push(diseaseListWithCount[disease]);
  
          }
        } else {   
          
          switch(gender){
            case "All":
              delete genderCount.All;
              delete genderCount.None;
              for (let [key, value] of Object.entries(genderCount)) {
                console.log("key is --->",key, value);
                label.push(key);
                graphData.push(value);
                }
                genderCount["All"] = 0; 
                genderCount["None"] = 0; 
                break; 
            case "None":
              break;
            default:
              label.push(gender);
              graphData.push(genderCount[gender]);
      
              } 
            }
    }

  

    console.log("graph data",graphData);

    useEffect(() => {
        const fetchGenderCount = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/patient/count/gender`
          );
          let genderArr = result.data.data;
          genderArr.push({"gender":"All","total":0});
          genderArr.push({"gender":"None","total":0});
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
          diseaseArr.push({"disease": "None", "total": 0});
          console.log("diseaseArr",diseaseArr);
          for( let i=0 ; i < diseaseArr.length; i++){
            let disease = diseaseArr[i];
            setdiseaseListWithCount(diseaseListWithCount => 
              ({ ...diseaseListWithCount, [disease.disease]: disease.total}));
          }
        };

      
        fetchDiseaseListWithCount();
        fetchGenderCount();

      }, []);
  

    function handleDiseaseChange(type,value){
      setDisease(value);
      if(selectedCategory.indexOf(type) == -1)
      setSelectedCategory(selectedCategory => [...selectedCategory, type]);    
    } 

    function handleGenderChange(type,value){
      setGender(value);
      if(selectedCategory.indexOf(type) == -1)
      setSelectedCategory(selectedCategory => [...selectedCategory, type]);
    }

    function onSelect(type,value){
        console.log("event",type,value);
        switch(type){
          case 'disease':
            handleDiseaseChange(type,value);
            break;
          case 'gender':
            handleGenderChange(type,value);
        }
    }

       console.log("Selected category------>", selectedCategory);
    // console.log("selected gender",gender);
    // console.log("gender count",genderCount);


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
        {   
          Object.keys(genderCount).map((key,value)=>{
            return (
          <MenuItem eventKey={value} onSelect={() => onSelect("gender",key)}>{key}</MenuItem>
              )
          })
        }
        {/* <MenuItem eventKey="1" onSelect={() => onSelect("gender","Male")}>Male</MenuItem>
       <MenuItem eventKey="2" onSelect={() => onSelect("gender","Female")}>Female</MenuItem> */}
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
