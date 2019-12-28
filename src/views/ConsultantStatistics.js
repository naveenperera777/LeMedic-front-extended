import React, { useState , useEffect } from "react";
import { Table,Form,FormGroup,FormControl,ControlLabel,Button,Label,ListGroup,ListGroupItem,PanelGroup,Panel } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import axios from 'axios';

export default function ConsultantStats() {
    const [revenue,setRevenue] = useState({});
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [receipts, setReceipts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/institute/consultant/receipt/4`
          );
          setReceipts(result.data.data);
        };
        fetchData();
      }, []);

     async function onClickHandler(){
        const headers = { headers: { 'from' :from, 'to':to} };
        const url = `http://localhost:9090/statistics/institute/consultant/receipt/summary/4`;
        let result;
        try{
          result = await axios.get(url,headers);
        //   console.log("revenue----->", result.data.data);        

          setRevenue(result.data.data);    
        } catch(e){
           console.log(e);
        }   
      }      

      function onChangeHandler(event){
          const type = event.target.id;
          const value = event.target.value;
          if(type == "From"){
            setFrom(value);
          } else {
            setTo(value);
          }
      }
      
      console.log("from",from,"to",to);
      console.log("revenue",revenue);
      console.log("receipts----->", receipts);

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
        <ListGroup>
        <ListGroupItem  bsStyle="success">
            <h6>Revenue summary</h6>
        </ListGroupItem>
        </ListGroup>
        </Col>
    </Row>   
    <Row>
    <Col xs={12} md={8} >
    <Form inline>
        <FormGroup controlId="From">
        <ControlLabel>From</ControlLabel>{' '}
        <FormControl type="date" placeholder="From" onChange={onChangeHandler}/>
        </FormGroup>{' '}
    <FormGroup controlId="To">
        <ControlLabel>To</ControlLabel>{' '}
        <FormControl type="date" placeholder="To" onChange={onChangeHandler} />
    </FormGroup>{' '}
    <Button bsStyle="primary" onClick={onClickHandler}>Generate</Button>    
    </Form>
    </Col>
    </Row>  <br></br>    

  <Row>  
  <Col xs={12} md={8} >   
  <Table striped bordered condensed hover>
  <thead>
    <tr>
      <th><h6 class="text-primary">Revenue Type</h6></th>
      <th><h6 class="text-primary">Amount</h6></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><h6>Total Revenue from Consultation</h6></td>
    <td><h6>{revenue["totalConsultationFees"]}</h6></td>
    </tr>
    <tr>
      <td><h6>Total Revenue Medication Fees</h6></td>
      <td><h6>{revenue["totalMedicationFees"]}</h6></td>  
    </tr>

    <tr>
      <td><h6>Total Miscellaneous Revenue</h6></td>
      <td><h6>{revenue["totalMiscellaneous"]}</h6></td>  
    </tr>

    <tr>
      <td><h6>Total Revenue</h6></td>
      <td><h6 class="text-success">{revenue["total"]}</h6></td>  
    </tr>
  
  </tbody>
</Table>
</Col> 
</Row> 
<Row>
    <Col xs={12} md={8} >
        <ListGroup>
        <ListGroupItem  bsStyle="success">
            <h6>All Receipts</h6>
        </ListGroupItem>
        </ListGroup>
        </Col>
    </Row>  
<Row>
<Col xs={12} md={8} >
    
    <PanelGroup accordion id="accordion-example">
    {receipts.map(receipt => {
          return (
            <Panel eventKey= {receipt.sessionId}>
            <Panel.Heading>
            <Panel.Title toggle>{receipt.sessionId}</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
                {receipt.consultationFees}
                {receipt.medicationFees}
                {receipt.miscellaneous}
                {receipt.tax}
                {receipt.total}

            </Panel.Body>
        </Panel>
          );
        })}
</PanelGroup>
    
    </Col>
</Row>

</Grid>

    </div>
  );
}


