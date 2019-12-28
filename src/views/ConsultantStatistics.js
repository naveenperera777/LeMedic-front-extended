import React, { useState } from "react";
import { Table,Form,FormGroup,FormControl,ControlLabel,Button,Label } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

export default function ConsultantStats() {
  return (
    <div>
     <Grid fluid>
     <Row>
            <Col lg={3} sm={6}>
                <h3>Total Revenue</h3>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Total Revenue"
                statsValue="10005GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
              </Col>

              <Col lg={3} sm={6}>
                <h3>Total Patients</h3>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Total Patients"
                statsValue="10005GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
              </Col>

              <Col lg={3} sm={6}>
                <h3>Total Sessions</h3>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Total Sessions"
                statsValue="10005GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
              </Col>
    </Row>    
    <Row>
    <Col xs={12} md={8} >
    <Form inline>
        <FormGroup controlId="formInlineName">
        <ControlLabel>From</ControlLabel>{' '}
        <FormControl type="date" placeholder="Jane Doe" />
        </FormGroup>{' '}
    <FormGroup controlId="formInlineEmail">
        <ControlLabel>To</ControlLabel>{' '}
        <FormControl type="date" placeholder="jane.doe@example.com" />
    </FormGroup>{' '}
    <Button bsStyle="primary">Generate</Button>    
    </Form>
    </Col>
    </Row>  <br></br>    

  <Row>  
  <Col xs={12} md={8} >   
  <Table striped bordered condensed hover>
  <thead>
    <tr>
      <th><h6>Revenue Type</h6></th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ConsultantStats</td>
      <td>Mark</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>  
    </tr>
  
  </tbody>
</Table>
</Col> 
</Row> 
</Grid>

    </div>
  );
}


