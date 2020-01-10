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
    const [count,setCount] = useState({});
    const [user, setUser] = useState("");


    useEffect(() => {
        const user =localStorage.getItem('user');
        console.log("user--------------->",user);
        setUser(user);
        const fetchData = async () => {
          const result = await axios(
            `http://localhost:9090/statistics/institute/consultant/receipt/${user}`
          );
          setReceipts(result.data.data);
        };
       
        const fetchSummaryData = async () => {
        const headers = { headers: { 'from' :'0', 'to':'0'} };
        const url = `http://localhost:9090/statistics/institute/consultant/receipt/summary/${user}`;
        let result;
        try{
          result = await axios.get(url,headers);
          setRevenue(result.data.data);    
        } catch(e){
           console.log(e);
        } 
        };

        const fetchPatientSessionCount = async () => {
            const headers = { headers: { 'from' :'0', 'to':'0'} };
            const url = `http://localhost:9090/statistics/institute/consultant/count/session/patient/${user}`;
            let result;
            try{
              result = await axios.get(url,headers);
              setCount(result.data.data);    
            } catch(e){
               console.log(e);
            } 
            };
        fetchData();
        fetchSummaryData();
        fetchPatientSessionCount();
      }, []);

     async function onClickHandler(){
        const headers = { headers: { 'from' :from, 'to':to} };
        const url = `http://localhost:9090/statistics/institute/consultant/receipt/summary/${user}`;
        let result;
        try{
          result = await axios.get(url,headers);
          setRevenue(result.data.data);    
        } catch(e){
           console.log(e);
        }
        const fetchPatientSessionCount = async () => {
            const headers = { headers: { 'from' :from, 'to':to} };
            const url = `http://localhost:9090/statistics/institute/consultant/count/session/patient/${user}`;
            let result;
            try{
              result = await axios.get(url,headers);
              setCount(result.data.data);    
            } catch(e){
               console.log(e);
            } 
            };
            fetchPatientSessionCount();
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
      console.log("count----->", count);

 return (
    <div>
     <Grid fluid>
     <Row>
            <Col xs={6} md={4} >
                <h3>Total Revenue</h3>
              <StatsCard
                bigIcon={<i className="pe-7s-cash" />}
                statsText="Total Revenue"
                statsValue={"Rs." +  revenue["total"]}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
              </Col>

              <Col xs={6} md={4} >
                <h3>Total Patients</h3>
              <StatsCard
                bigIcon={<i className="pe-7s-users" />}
                statsText="Total Patients"
                statsValue={count["patientCount"]}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
              </Col>

              <Col xs={6} md={4} >
                <h3>Total Sessions</h3>
              <StatsCard
                bigIcon={<i className="pe-7s-helm" />}
                statsText="Total Sessions"
                statsValue={count["sessionCount"]}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
              </Col>
    </Row> 
    <Row>
    <Col xs={12} >
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
    <Col xs={12} >
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
            <Panel.Title toggle>Session ID : {receipt.sessionId}</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
            <Table striped bordered condensed hover>
                 <tbody>
                    <tr>
                    <td><h6>Revenue from Consultation</h6></td>
                    <td><h6>{receipt.consultationFees}</h6></td>
                    </tr>
                    <tr>
                    <td><h6>Revenue Medication Fees</h6></td>
                    <td><h6>{receipt.medicationFees}</h6></td>  
                    </tr>

                    <tr>
                    <td><h6>Miscellaneous Revenue</h6></td>
                    <td><h6>{receipt.miscellaneous}</h6></td>  
                    </tr>

                    <tr>
                    <td><h6>Total</h6></td>
                    <td><h6 class="text-success"> {receipt.total}</h6></td>  
                    </tr>                
                </tbody>
            </Table>
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


