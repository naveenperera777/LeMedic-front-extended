import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Table,FormGroup,ControlLabel,Form,FormControl,Button } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import BarChart from "../components/Reports/BarChart"
import axios from 'axios';

export default function PatientDashboard() {

    const [count, setCount] = useState({});
    const [pricing, setPricing] = useState({});
    const [from, setFrom] = useState('0');
    const [to, setTo] = useState('0');
    const [consultantCount, setconsultantCount] = useState(0);
    const [type, setType] = useState("month");
    const [label,setLabel] = useState([]);
    const [graphData,setgraphData] = useState([]);
    const [revenueLabel,setrevenueLabel] = useState([]);
    const [revenuegraphData,setrevenuegraphData] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [rank, setRank] = useState(0);
    const [sessionArray, setSessionArray] = useState([]);

    useEffect(() => {         
        const fetchPatientSessionCount = async () => {
          const headers = { headers: { 'from' : from, 'to':to} };
          const url = `http://localhost:9090/statistics/institute/consultant/all/session/patient/count`;
          let result;
          try{
            result = await axios.get(url,headers);
            setCount({"sessionCount":result.data.data["sessionCount"],"patientCount":result.data.data["patientCount"]})  
          } catch(e){
             console.log(e);
          } 
          };
          const fetchPricingSummary = async () => {
            const headers = { headers: { 'from' :from, 'to':to} };
            const url = `http://localhost:9090/statistics/institute/consultant/all/pricing/summary`;
            let result;
            try{
              result = await axios.get(url,headers);
              setPricing({"ConsultationFees":result.data.data["totalConsultationFees"],"MedicationFees":result.data.data["totalMedicationFees"],"totalMiscellaneous":result.data.data["totalMiscellaneous"],"total":result.data.data["total"]});
            } catch(e){
               console.log(e);
            } 
            };
            const fetchLeaderboard = async () => {
              const headers = { headers: { 'from' :from, 'to':to} };
              const url = `http://localhost:9090/statistics/institute/consultant/all/leaderboard`;
              let result;
              try{
                result = await axios.get(url,headers);
                console.log("leader",result.data.data);
                setLeaderboard(result.data.data);
              } catch(e){
                 console.log(e);
              } 
              };
              const fetchConsultantCount = async () => {
                const url = `http://localhost:9090/statistics/institute/consultant/all/count`;
                let result;
                try{
                  result = await axios.get(url);
                  console.log("leader",result.data.data);
                  setconsultantCount(result.data.data);
                } catch(e){
                   console.log(e);
                } 
                };
          fetchPatientSessionCount();
          fetchPricingSummary();
          fetchLeaderboard();
          fetchConsultantCount();
      }, [sessionArray]);

      function onChangeHandler(event){
        const type = event.target.id;
        const value = event.target.value;
        if(type == "From"){
          setFrom(value);
        } else {
          setTo(value);
        }
    }

    async function onClickHandler(){
      const headers = { headers: { 'from' :from, 'to':to, 'type': type} };
      const url = `http://localhost:9090/statistics/institute/consultant/all/session/comparision`;
      let result;
      try{
        result = await axios.get(url,headers);
        let sessionArr = result.data.data;
        let labelArr=[];
        let dataArr = [];
        sessionArr.forEach(element => {
          labelArr.push(element["timestamp"]);
          dataArr.push(element["total"]);
        })
        setLabel(labelArr);
        setgraphData(dataArr);
        setSessionArray(result.data.data);    
      } catch(e){
         console.log(e);
      }
      const revenueUrl = `http://localhost:9090/statistics/institute/consultant/all/revenue/comparision`;
      let revenueRes;
      try{
        revenueRes = await axios.get(revenueUrl,headers);
        let revenueArr = revenueRes.data.data;
        let revenueLabel=[];
        let dataArr = [];
        revenueArr.forEach(element => {
          revenueLabel.push(element["timestamp"]);
          dataArr.push(element["total"]);
        })
        setrevenueLabel(revenueLabel);
        setrevenuegraphData(dataArr);
        setSessionArray(result.data.data);    
      } catch(e){
         console.log(e);
      }
    }  
      console.log("from: ", from, "to ", to);
      console.log("count",count);
      console.log("pricing",pricing);
      console.log("leaderboard",leaderboard);
      console.log("session",sessionArray);

  return (
    <div>
         <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Revenue"
                statsValue={pricing.total}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Sessions"
                statsValue={count["sessionCount"]}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Patients"
                statsValue={count["patientCount"]}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-arc text-info" />}
                statsText="Consultants"
                statsValue={consultantCount}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
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
            </Row> 
            <Row>
          <Col xs={12} md={8}>
              <BarChart graphData={graphData} label={label} title="Session Comparison" color="rgb(68, 90, 216)"/>
            </Col>
            <Col xs={12} md={8}>
              <BarChart graphData={revenuegraphData} label={revenueLabel} title="Revenue Comparison" color="rgb(57, 213, 195)"/>
            </Col>
          </Row>  
          <Row>
            <Col md={12}>
            <Table bordered>
              <thead>
                <tr>
                  <th><h6># Rank</h6></th>
                  <th><h6>First Name</h6></th>
                  <th><h6>Last Name</h6></th>
                  <th><h6>Count</h6></th>
                </tr>
              </thead>
              <tbody>
              {leaderboard.map(user => {
                return(
                <tr>
                  <td>{user.rank}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.count}</td>
                </tr>               
                );
              })}
                </tbody>
                </Table>
              </Col>
          </Row>     
        </Grid>
      </div>
    </div>
  );
}
