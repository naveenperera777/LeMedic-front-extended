import React, { Component } from "react";

import {Modal,Button,ButtonToolbar} from "react-bootstrap";


export default function ModalConsultation(props){
  console.log("modal data", props);
  return (
    <Modal
      {...props}
      bsSize="large"
      aria-labelledby="contained-modal-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">{props.data.complain}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Wrapped Text {props.data.complain}</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
          ac consectetur ac, vestibulum at eros.
        </p>
      
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}