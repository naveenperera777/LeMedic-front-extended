import React, { useState , useEffect } from "react";
import { Grid, Row, Col,ListGroup,ListGroupItem,SplitButton,MenuItem,DropdownButton } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import axios from 'axios';

export default function PatientStatistics() {

    const [gender, setGender] = useState("");
    const [genderCount, setgenderCount] = useState([])
    

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/patient/count/gender`
          );
        //   setgenderCount({
        //     ...genderCount,
        //     data : result.data.data
        //   });
        setgenderCount(result.data.data);
          console.log("patientCount----->", genderCount);
        };
        fetchData();
      }, []);

    function onSelect(event){
        console.log("event",event);
        setGender(event);
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

        </Grid>


        </div>
   
    </div>
  );
}
