import React, { useState , useEffect } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel, 
  FormControl
} from "react-bootstrap";
import axios from 'axios';
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Button } from "@material-ui/core";

export default function userProfile1(props) {
  // const [user, setUser] = useState("");
  // const [data, setData] = useState("");

  // useEffect(() => {
  //   // const user =localStorage.getItem('user');
  //   // setUser(user);
  //   //     const fetchData = async () => {
  //   //       const result = await axios("http://localhost:9090/users");
  //   //       console.log(result.data.data);
  //   //       setData(result.data.data);
  //   //     };
  //   //     fetchData();
  //     }, []);

  

  return (
    <div className="content">
            <Grid fluid>
               <Row>
               <Col md={8}>
                 <Card
                    title="My Profile"
                    content={
                      <form>
                        <FormInputs
                          ncols={["col-md-5", "col-md-3", "col-md-4"]}
                          properties={[
                            {
                              label: "Company",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Company",
                              defaultValue: 'LeMedic'
                              ,
                              disabled: true
                            },
                            {
                              label: "NIC",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "nic",
                              defaultValue: localStorage.getItem('nic')
                            },
                            {
                              label: "Email address",
                              type: "email",
                              bsClass: "form-control",
                              placeholder: "Email",
                              defaultValue: localStorage.getItem('email')
                            }
                          ]}
                        />
                        <FormInputs
                          ncols={["col-md-6", "col-md-6"]}
                          properties={[
                            {
                              label: "First name",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "First name",
                              defaultValue: localStorage.getItem('first_name')
                            },
                            {
                              label: "Last name",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Last name",
                              defaultValue: localStorage.getItem('last_name')
                            }
                          ]}
                        />
                        <FormInputs
                          ncols={["col-md-4"]}
                          properties={[
                            {
                              label: "Gender",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Gender",
                              defaultValue:
                              localStorage.getItem('gender')
                            }
                          ]}
                        />
                        <FormInputs
                          ncols={[ "col-md-4"]}
                          properties={[
                            
                            {
                              label: "Role",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Role",
                              defaultValue: localStorage.getItem('role')
                            }
                          ]}
                        />
                        
                        <div className="clearfix" />
                      </form>
                    }
                  />
                </Col>
              
              </Row>
{/* 
              <Row>
                <Col md={4}>
                  <Button>
                    Edit
                  </Button>
                </Col>
              </Row> */}
            </Grid>
          </div>
  );
}

