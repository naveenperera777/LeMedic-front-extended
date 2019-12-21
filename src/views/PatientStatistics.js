import React, { useState , useEffect } from "react";
import { Grid, Row, Col,ListGroup,FormGroup,ListGroupItem,MenuItem,Checkbox,DropdownButton,ButtonToolbar,ToggleButtonGroup,ToggleButton } from "react-bootstrap";
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import BarChart from '../components/Reports/BarChart';
import Typography from "material-ui/styles/typography";
// CSS 57.9%	 JavaScript 41.5%	 HTML 0.6%

export default function PatientStatistics() {

    const [gender, setGender] = useState("select gender");
    const [disease, setDisease] = useState("Select Disease");
    const [city, setCity] = useState("Select City");
    const [genderListWithCount, setGenderListWithCount] = useState({});
    const [diseaseListWithCount, setdiseaseListWithCount] = useState({});
    const [GeographyListWithCount, setGeographyListWithCount] = useState({});
    const [selectedCategory,setSelectedCategory] = useState([]);
    const [fetchApiValue , setFetchApiValue] = useState ({});
    const [label,setLabel] = useState([]);
    const [graphData,setgraphData] = useState([]);
    const [value,setValue] = useState([1,3]);

    // let graphData = [];
    let fetchApiObj = {};

    useEffect(()=> {
      if(selectedCategory.length == 1 ){
        let category = selectedCategory[0];
        if(category == "disease"){
        switch(disease){
          case "All":
            delete diseaseListWithCount.All;
            delete diseaseListWithCount.None;            
            for (let [key, value] of Object.entries(diseaseListWithCount)) {     
              if(!(label.indexOf(key)> -1)){
              setLabel(label => [...label, key]);
              setgraphData(graphData => [...graphData, value]);   
              }}         
              // graphData.push(value);              
              diseaseListWithCount["All"] = 0; 
              diseaseListWithCount["None"] = 0; 
              break; 
          case "None":
            setLabel(label => []);
            setgraphData(graphData => []); 
            break;
          default:
            console.log("default");
            setLabel(label => [disease]);
            setgraphData(graphData => [diseaseListWithCount[disease]]); 
            break;
            // label.push(disease);
            // graphData.push(diseaseListWithCount[disease]);
    
            }
          } else if(category == "gender") {             
            switch(gender){
              case "All":
                delete genderListWithCount.All;
                delete genderListWithCount.None;
                for (let [key, value] of Object.entries(genderListWithCount)) {
                  if(!(label.indexOf(key)>-1)){
                  setLabel(label => [...label, key]);
                  setgraphData(graphData => [...graphData, value])
                  // label.push(key);
                  // graphData.push(value);
                  }}
                  genderListWithCount["All"] = 0; 
                  genderListWithCount["None"] = 0; 
                  break; 
              case "None":
                break;
              default:
                setLabel(label => [gender]);
                setgraphData(graphData => [genderListWithCount[gender]]); 
                // label.push(gender);
                // graphData.push(genderListWithCount[gender]);
        
                } 
              } else if(category == "geography") {
                switch(city){
                  case "All":
                    delete GeographyListWithCount.All;
                    delete GeographyListWithCount.None;
                    for (let [key, value] of Object.entries(GeographyListWithCount)) {
                      if(!(label.indexOf(key)>-1)){
                      setLabel(label => [...label, key]);
                      setgraphData(graphData => [...graphData, value]);  
                      // label.push(key);
                      // graphData.push(value);
                      }}
                      GeographyListWithCount["All"] = 0; 
                      GeographyListWithCount["None"] = 0; 
                      break; 
                  case "None":
                    break;
                  default:
                    setLabel(label => [city]);
                    setgraphData(graphData => [GeographyListWithCount[city]]); 
            
                    } 
              }
      } else if(selectedCategory.length == 0){
        setLabel(label => []);
        setgraphData(graphData => []); 
      }
    },[disease,city,gender]);

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
  
    function handleSelectChange(type,value){
      let index =selectedCategory.indexOf(type);
      console.log("INDEXX-->",index);
      if(index == -1){
        console.log("if")
        setSelectedCategory(selectedCategory => [...selectedCategory, type]);
      } else if (value == "None") { 
        console.log("else if");
        if(index > -1){
          selectedCategory.splice(index,1);
        }
      }
    }


    function onSelect(type,value){
        console.log("event",type,value);
        switch(type){
          case 'disease':
            setDisease(value);
            handleSelectChange(type,value);
            break;
          case 'gender':
            setGender(value);
            handleSelectChange(type,value);
            break;
          case 'geography':
            setCity(value);            
            handleSelectChange(type,value);  
        }
    }
       console.log("label---->",label);
       console.log("data------>",graphData);
      //  console.log("graph data---->",graphData);GeographyListWithCount
       console.log("Selected category------>", selectedCategory);
       console.log("city , disease , gender ------>", city,disease,gender);

      //  console.log("fetchApiVal ------>", fetchApiValue);

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
