import React, { useState, useEffect } from "react";

import {Modal,Button,ButtonToolbar,ListGroup,ListGroupItem} from "react-bootstrap";
import ModalConsultation from "./ModalConsultation";
import axios from 'axios';


export default function ModalHome(props) {
  
  const [medical_records, setMedical_records] = useState([]);
  const [lgShowRecord, setLgShowRecord] = useState({data:{}, status :false})


  const patient_id = props.selected_patient.patient_id;
  console.log("Patient object ",props.selected_patient);

   useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:9090/session/patient/${patient_id}/all`
      );
      setMedical_records(result.data.data);
      console.log("medical records", medical_records);
    };
    fetchData();
  }, []);

  function onClickHandler(selected_record){
    console.log("onclick data",selected_record);
    setLgShowRecord({      
    ...lgShowRecord,
     data:selected_record,
     status:true
    });
  }


  function lgClose(){
    setLgShowRecord({      
      ...lgShowRecord,
       status:false
      });
  }
  console.log("state data", lgShowRecord);
  console.log("medical records", medical_records.length);


if (!medical_records.length == 0) {    
  console.log("medical records",medical_records);
    return (
      <div>
          {medical_records.map(record => {
          return (
            <ListGroup>
              <ListGroupItem key= {record.complain}>
              <Button bsStyle="primary" 
               onClick={() => onClickHandler(record)}>     
                #{record.session_id} {record.complain}
            </Button>
           <ModalConsultation show={lgShowRecord.status} onHide={lgClose} data={lgShowRecord.data}/>
              </ListGroupItem>               
            </ListGroup>        
          );
        })}
      </div>
    );
    } else {
    return (<div>
      <h1>
      No Records Found!   
      </h1>
    </div>)
  }
  
    
  
  }

