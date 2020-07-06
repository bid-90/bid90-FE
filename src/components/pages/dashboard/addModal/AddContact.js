import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';

import {pageService} from './../../../../service/pageService'

class AddContact extends React.Component{

  state = {
    type: null,
    value: null,
   
  }
refreshPage(){
  window.location.reload();
}
  formAdd =(event)=>{
   //event.preventDefault();
    let type = event.target.elements.typeContact.value;
    let value = event.target.elements.valueContact.value;
    pageService.addContact(0,type,value);

 this.refreshPage();
  }

  formUpdate = (event) =>{
    //event.preventDefault();
    let id = event.target.elements.idContact.value;
    let type = event.target.elements.typeContact.value;
    let value = event.target.elements.valueContact.value;
    pageService.addContact(id,type,value);
    this.refreshPage();
  }
  formDelete= (event)=>{
    //event.preventDefault();
    let id = event.target.elements.idContact.value;
    pageService.deleteContact(id);
    this.refreshPage();
  }

  formHandler = (event) =>{
    //event.preventDefault();
    switch(document.getElementById('submit-button').innerText){
      case 'Add':
        this.formAdd(event)
        break;
      case 'Update':
        this.formUpdate(event);
        break;
      case 'Delete':
        this.formDelete(event)
        break;
      default:
        break;
    }
  }
 

  getContactHandler = (id) =>{
   pageService.getContact(id).then(result =>{
    document.getElementById("valueContact").value = result.value
    document.getElementById("typeContact").value = result.type
  })
  }

  
    render(){
      let idForm;
      let buttonType;
      if(this.props.date.idElement !== null){
        idForm = (
          <InputGroup>
            <InputGroup.Prepend>
              <Button variant="outline-secondary" onClick={() => this.getContactHandler(this.props.date.idElement)}>Get Contact</Button>
            </InputGroup.Prepend>
            <Form.Control type="text" placeholder="Enter id" value={this.props.date.idElement !== null ? this.props.date.idElement : ''} onChange={()=>{}} id="idContact" disabled/>
          </InputGroup>
        )
      }
      switch(this.props.date.actionModal ){
        case 'Add':
          buttonType = 'success'
          break;
        case 'Update':
          buttonType = 'primary'
          break;
        default:
          buttonType = 'danger'
          break
        }
        return(
            <Modal
      show={this.props.date.showContactModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={this.props.hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {this.props.date.actionModal} Contact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={this.formHandler}>
          {idForm}
            <Form.Group controlId="typeContact">
                <Form.Label>Example select</Form.Label>
                <Form.Control as="select">
<option>fab fa-facebook-square</option>
<option>far fa-envelope</option>
<option>fab fa-instagram-square</option>
<option>fab fa-linkedin</option>

            </Form.Control>

            </Form.Group>
            <Form.Group controlId="valueContact">
                <Form.Label>Value</Form.Label>
                <Form.Control type="text" placeholder="Enter value" />
            </Form.Group>
            
            <Button type="submit" variant={buttonType} id="submit-button"> {this.props.date.actionModal} </Button>

        </Form>
      

      </Modal.Body>
    </Modal>
        )
    }
}

export default AddContact;