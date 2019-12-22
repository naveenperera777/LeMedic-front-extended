import React, { useState , useEffect } from "react";
import { Grid, Row, Col,ListGroup,Table,ListGroupItem,MenuItem,Checkbox,DropdownButton,ButtonToolbar,ToggleButtonGroup,ToggleButton } from "react-bootstrap";
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
    const [label,setLabel] = useState([]);
    const [graphData,setgraphData] = useState([]);

    console.log("################RERENDER##########");


    useEffect(()=> {
      if(selectedCategory.length == 1 ){
        let category = selectedCategory[0];
        if(category == "disease"){
        switch(disease){
          case "All":
            delete diseaseListWithCount.All;
            delete diseaseListWithCount.None; 
            let labelArr = label;
            let graphArr = graphData;
            labelArr = [];
            graphArr = [];
            for (let [key, value] of Object.entries(diseaseListWithCount)) {     
              labelArr.push(key);
              graphArr.push(value);   
            }         
            setLabel(labelArr);
            setgraphData(graphArr);
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
            }
          } else if(category == "gender") {             
            switch(gender){
              case "All":
                delete genderListWithCount.All;
                delete genderListWithCount.None;
                let labelArr = label;
                let graphArr = graphData;
                labelArr = [];
                graphArr = [];
                for (let [key, value] of Object.entries(genderListWithCount)) {
                  labelArr.push(key);
                  graphArr.push(value);

                }
                setLabel(labelArr);
                setgraphData(graphArr);
                  genderListWithCount["All"] = 0; 
                  genderListWithCount["None"] = 0; 
                  break; 
              case "None":
                break;
              default:
                setLabel(label => [gender]);
                setgraphData(graphData => [genderListWithCount[gender]]);      
                } 
              } else if(category == "geography") {
                switch(city){
                  case "All":
                    delete GeographyListWithCount.All;
                    delete GeographyListWithCount.None;
                    let labelArr = label;
                    let graphArr = graphData;
                    labelArr = [];
                    graphArr = [];
                    for (let [key, value] of Object.entries(GeographyListWithCount)) {
                      labelArr.push(key);
                      graphArr.push(value); 
                    }
                    setLabel(labelArr);
                    setgraphData(graphArr); 
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
      } else if(selectedCategory.length == 2){
        console.log("two categories selected");
        let firstCategory = selectedCategory[0];
        let secondCategory = selectedCategory[1];

        if ((firstCategory == "disease" || secondCategory == "disease") && (firstCategory=="geography" || secondCategory=="geography")){
          console.log("disease-geo combination");

         if(disease == "All"){
          const fetchDiseaseDistributionOfAnArea = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/patient/count/area/${city}`
          );
          let diseaseDistributionArr = result.data.data;
          let labelArr = [];
          let graphArr = [];
          diseaseDistributionArr.forEach(element => {
            labelArr.push(element.disease);
            graphArr.push(element.total);
          });
          setLabel(labelArr);
          setgraphData(graphArr);
        };
        fetchDiseaseDistributionOfAnArea();
      } else if(city == "All"){
        const fetchAreaDistributionOfADisease = async () => {
          const result = await axios(
            `http://localhost:9090/statistics//patient/count/disease/${disease}`
          );
          let areaDistributionArr = result.data.data;
          let labelArr = [];
          let graphArr = [];
          areaDistributionArr.forEach(element => {
            labelArr.push(element.district);
            graphArr.push(element.total);
          });
          setLabel(labelArr);
          setgraphData(graphArr);
        };
        fetchAreaDistributionOfADisease();
      } else {
        const fetchCountByDiseaseAndArea = async () => {
          const result = await axios(
            `http://localhost:9090/statistics//patient/count/disease/${disease}`
          );
          let diseaseAreaArr = result.data.data;
          let labelArr = [];
          let graphArr = [];          
          diseaseAreaArr.forEach(element => {
            if(element.district == city){
            labelArr.push(`${city} || ${disease}`);
            graphArr.push(element.total);
            }
          });
          setLabel(labelArr);
          setgraphData(graphArr);
        };
        fetchCountByDiseaseAndArea();

      }
        } 
        else if ((firstCategory == "disease" || secondCategory == "disease") && (firstCategory=="gender" || secondCategory=="gender")){
          console.log("disease-gender combination");
          if(disease =="All"){
            const fetchDiseaseDistributionOfAGender = async () => {
              const result = await axios(
                `http://localhost:9090/statistics/patient/count/gender/disease/${gender}`
              );
              let GenderDistributionArr = result.data.data;
              let labelArr = [];
              let graphArr = [];
              GenderDistributionArr.forEach(element => {
                labelArr.push(element.complain);
                graphArr.push(element.total);
              });
              setLabel(labelArr);
              setgraphData(graphArr);
            };
            fetchDiseaseDistributionOfAGender();
          } else if(gender =="All"){
            const fetchGenderDistributionOfADisease = async () => {
              const result = await axios(
                `http://localhost:9090/statistics/patient/count/disease/gender/${disease}`
              );
              let GenderDistributionArr = result.data.data;
              let labelArr = [];
              let graphArr = [];
              GenderDistributionArr.forEach(element => {
                labelArr.push(element.gender);
                graphArr.push(element.total);
              });
              setLabel(labelArr);
              setgraphData(graphArr);
            };
            fetchGenderDistributionOfADisease();
          } else {
            const fetchCountByDiseaseAndGender = async () => {
              const result = await axios(
                `http://localhost:9090/statistics/patient/count/disease/gender/${disease}`
              );
              let GenderDiseaseArr = result.data.data;
              let labelArr = [];
              let graphArr = [];
              GenderDiseaseArr.forEach(element => {
                if(element.gender == gender){
                labelArr.push(`${gender} || ${disease}`);
                graphArr.push(element.total);
                }
              });
              setLabel(labelArr);
              setgraphData(graphArr);
            };
            fetchCountByDiseaseAndGender();

          }

        } else if((firstCategory == "gender" || secondCategory == "gender") && (firstCategory=="geography" || secondCategory=="geography")){
          console.log("geo-gender combination");
          if(city == "All"){
            const fetchAreaDistributionOfAGender = async () => {
              const result = await axios(
                `http://localhost:9090/statistics/patient/count/district/gender/${gender}`
              );
              let AreaGenderArr = result.data.data;
              let labelArr = [];
              let graphArr = [];
              AreaGenderArr.forEach(element => {
                labelArr.push(element.district);
                graphArr.push(element.total);
              });
              setLabel(labelArr);
              setgraphData(graphArr);
            };
            fetchAreaDistributionOfAGender();

          } else if(gender == "All"){
            const fetchGenderDistributionOfAnArea = async () => {
              const result = await axios(
                `http://localhost:9090/statistics/patient/count/gender/district/${city}`
              );
              let AreaGenderArr = result.data.data;
              let labelArr = [];
              let graphArr = [];
              AreaGenderArr.forEach(element => {
                labelArr.push(element.gender);
                graphArr.push(element.total);
              });
              setLabel(labelArr);
              setgraphData(graphArr);
            };
            fetchGenderDistributionOfAnArea();

          } else {
            const fetchAreaAndGenderCount = async () => {
              const result = await axios(
                `http://localhost:9090/statistics/patient/count/gender/district/${city}`
              );
              let AreaGenderArr = result.data.data;
              let labelArr = [];
              let graphArr = [];
              AreaGenderArr.forEach(element => {
                if(element.gender == gender){
                labelArr.push(`${gender} || ${city}`);
                graphArr.push(element.total);
                }
              });
              setLabel(labelArr);
              setgraphData(graphArr);
            };
            fetchAreaAndGenderCount();

          }
        }


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

          <Row>
          <Col xs={12} md={8}>
          <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                </tbody>
                </Table>


            </Col>

          

          </Row>



        </Grid>


        </div>
   
    </div>
  );
}
