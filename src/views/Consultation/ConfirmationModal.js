import React, { useState  } from "react";
import {Modal,Button} from "react-bootstrap";
// import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";

export default function ConfirmationModal(props) {

    const [show, setShow] = useState(true);
    function handleHide(){
        setShow(false);
        // return <Redirect to='/admin/consultant/dashboard'/>       
    }
    return(
    <div className="modal-container" style={{ height: 200 }}>
        <Modal
          show={show}
          onHide={handleHide}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
             <p className="text-primary"> Email Confirmation</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Consultation session is concluded . <span className="text-primary">{props.user.first_name}</span>'s Medical record has been successfully sent to <span className="text-primary">{props.user.email}</span> successfully!
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}