import React, { Component } from "react";

import {Modal,Button,Panel,ListGroup,ListGroupItem} from "react-bootstrap";


export default function ModalConsultation(props){
  console.log("modal data", props); 
  let timestamp = new Date((props.data.timestamp));
  let utcString = timestamp.toUTCString();
  return (
    <div>
    <Modal
      {...props}
      bsSize="large"
      aria-labelledby="contained-modal-title-lg"
    >
      <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-lg">Session ID #{props.data.session_id} Date : {utcString}</Modal.Title>
 
      </Modal.Header>
      <Modal.Body>


      <Panel bsStyle="primary">
        <Panel.Heading>Diagnosis</Panel.Heading>
        <ListGroup>
      
       <ListGroupItem> <h6>Complain</h6></ListGroupItem>
          <ListGroupItem>{props.data.complain}</ListGroupItem>
        
       
       <ListGroupItem><h6>Signs</h6></ListGroupItem>
          <ListGroupItem>{props.data.signs}</ListGroupItem>
          
       <ListGroupItem><h6>General Examination</h6></ListGroupItem>        
          <ListGroupItem>{props.data.general_exam}</ListGroupItem>
        
          
       <ListGroupItem><h6>Investigation</h6></ListGroupItem>
          <ListGroupItem>{props.data.investigation}</ListGroupItem>
         </ListGroup> 
                
      </Panel>


      <Panel bsStyle="success">
        <Panel.Heading>Treatment</Panel.Heading>
        <ListGroup>
          <ListGroupItem><h6>Medical Management</h6></ListGroupItem>
          <ListGroupItem>{props.data.medical_management}</ListGroupItem>
        
          <ListGroupItem><h6>Surgical Management</h6></ListGroupItem>
        
          <ListGroupItem>{props.data.surgical_management}</ListGroupItem>
          
          <ListGroupItem><h6>Special Remarks</h6></ListGroupItem>
        
          <ListGroupItem>{props.data.remarks}</ListGroupItem>
        
          <ListGroupItem><h6>Next Date</h6></ListGroupItem>
        
          <ListGroupItem>{props.data.next_date}</ListGroupItem>
        </ListGroup>        
      </Panel>

         
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
   </div>
            
    
  );
}