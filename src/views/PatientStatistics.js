import React, { useState , useEffect } from "react";
import { Grid, Row, Col,ListGroup,ListGroupItem,MenuItem,DropdownButton } from "react-bootstrap";
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import BarChart from '../components/Reports/BarChart';
// CSS 57.9%	 JavaScript 41.5%	 HTML 0.6%

export default function PatientStatistics() {

    const [gender, setGender] = useState("select gender");
    const [disease, setDisease] = useState("Select Disease");
    const [city, setCity] = useState("Select City");
    const [genderListWithCount, setGenderListWithCount] = useState({});
    const [diseaseListWithCount, setdiseaseListWithCount] = useState({});
    const [GeographyListWithCount, setGeographyListWithCount] = useState({});
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
        } else if(category == "gender") {             
          switch(gender){
            case "All":
              delete genderListWithCount.All;
              delete genderListWithCount.None;
              for (let [key, value] of Object.entries(genderListWithCount)) {
                console.log("key is --->",key, value);
                label.push(key);
                graphData.push(value);
                }
                genderListWithCount["All"] = 0; 
                genderListWithCount["None"] = 0; 
                break; 
            case "None":
              break;
            default:
              label.push(gender);
              graphData.push(genderListWithCount[gender]);
      
              } 
            } else {
              switch(city){
                case "All":
                  delete GeographyListWithCount.All;
                  delete GeographyListWithCount.None;
                  for (let [key, value] of Object.entries(GeographyListWithCount)) {
                    console.log("key is --->",key, value);
                    label.push(key);
                    graphData.push(value);
                    }
                    GeographyListWithCount["All"] = 0; 
                    GeographyListWithCount["None"] = 0; 
                    break; 
                case "None":
                  break;
                default:
                  label.push(city);
                  graphData.push(GeographyListWithCount[city]);
          
                  } 
            }
    }  

    console.log("graph data",graphData);

    useEffect(() => {
        const fetchgenderListWithCount = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/patient/count/gender`
          );
          let genderArr = result.data.data;
          genderArr.push({"gender":"All","total":0});
          genderArr.push({"gender":"None","total":0});
          console.log("genderArr",genderArr);
          for( let i=0 ; i < genderArr.length; i++){
            let genderItem = genderArr[i];
            setGenderListWithCount(genderListWithCount => 
              ({ ...genderListWithCount, [genderItem.gender]: genderItem.total}));
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

        const fetchCityListWithCount = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/patient/count/area`
          );
          let cityArr = result.data.data;
          cityArr.push({"district": "All", "total": 0});
          cityArr.push({"district": "None", "total": 0});
          console.log("cityArr",cityArr);
          for( let i=0 ; i < cityArr.length; i++){
            let city = cityArr[i];
            setGeographyListWithCount(GeographyListWithCount => 
              ({ ...GeographyListWithCount, [city.district]: city.total}));
          }
        };
      
        fetchDiseaseListWithCount();
        fetchgenderListWithCount();
        fetchCityListWithCount();

      }, []);
  

    function handleDiseaseChange(type,value){
      setDisease(value);
      let index =selectedCategory.indexOf(type);
      if(index == -1){
        setSelectedCategory(selectedCategory => [...selectedCategory, type]); 
      } else if (value == "None") {
        if(index > -1){
          selectedCategory.splice(index,1);
        }
      }
    } 

    function handleGenderChange(type,value){
      setGender(value);
      let index =selectedCategory.indexOf(type);
      if(index == -1){
        setSelectedCategory(selectedCategory => [...selectedCategory, type]);
      } else if (value == "None") {        
        if(index > -1){
          selectedCategory.splice(index,1);
        }
      }
    }

    function handleGeographyChange(type,value){
      setCity(value);
      let index =selectedCategory.indexOf(type);
      if(index == -1){
        setSelectedCategory(selectedCategory => [...selectedCategory, type]);
      } else if (value == "None") {        
        if(index > -1){
          selectedCategory.splice(index,1);
        }
      }
    }

    function onSelect(type,value){
        console.log("event",type,value);
        switch(type){
          case 'disease':
            handleDiseaseChange(type,value);
            break;
          case 'gender':
            handleGenderChange(type,value);
            break;
          case 'geography':            
            handleGeographyChange(type,value);  
        }
    }

       console.log("Selected category------>", selectedCategory);

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
          Object.keys(genderListWithCount).map((key,value)=>{
            return (
          <MenuItem eventKey={value} onSelect={() => onSelect("gender",key)}>{key}</MenuItem>
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
        <DropdownButton title={city}>
        {   
          Object.keys(GeographyListWithCount).map((key,value)=>{
            return (
          <MenuItem eventKey={value} onSelect={() => onSelect("geography",key)}>{key}</MenuItem>
              )
          })
        }
        </DropdownButton>
        </Col>            
       
          </Row>
          <Row>

          <Col xs={12} md={8}>

            <BarChart label={label} graphData={graphData}/>             
              
            </Col>
          </Row>



        </Grid>


        </div>
   
    </div>
  );
}
