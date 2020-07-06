import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import {pageService} from './../../../../service/pageService'

class AddWork extends React.Component{
    state = {
        employer: null,
        city: null,
        country: null,
        qualification: null,
        date: null
      }
    refreshPage(){
      window.location.reload();
    }
      formAdd = (event) =>{
        //event.preventDefault();
        let employer = event.target.elements.employer.value;
        let city = event.target.elements.city.value;
        let country = event.target.elements.country.value;
        let qualification = event.target.elements.qualification.value;
        let date = event.target.elements.date.value;
        pageService.addWork(0,employer,city,country,qualification,date);
        this.refreshPage();
      }
      formUpdate = (event) =>{
        //event.preventDefault();
        let id = event.target.elements.idWork.value;
        let employer = event.target.elements.employer.value;
        let city = event.target.elements.city.value;
        let country = event.target.elements.country.value;
        let qualification = event.target.elements.qualification.value;
        let date = event.target.elements.date.value;
        pageService.addWork(id,employer,city,country,qualification,date);
        this.refreshPage();
      }
      formDelete = (event)=>{
        //event.preventDefault();
        let id = event.target.elements.idWork.value;
        pageService.deleteWork(id);
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
      getWorkHandler = (id) =>{
       
        pageService.getWork(id).then(result =>{
          document.getElementById("employer").value = result.employer
          document.getElementById("city").value = result.city
          document.getElementById("country").value = result.country
          document.getElementById("qualification").value = result.qualification
          document.getElementById("date").value = result.date
        })
      }

    render(){
      let idForm;
      let buttonType;
if(this.props.date.idElement !== null){
  idForm = (
    <InputGroup>
      <InputGroup.Prepend>
        <Button variant="outline-secondary" onClick={() => this.getWorkHandler(this.props.date.idElement)}>Get Work</Button>
      </InputGroup.Prepend>
      <Form.Control type="text" placeholder="Enter id" value={this.props.date.idElement !== null ? this.props.date.idElement : ''} onChange={()=>{}} id="idWork" disabled/>
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
      show={this.props.date.showWorkModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={this.props.hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {this.props.date.actionModal} Work
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={this.formHandler}>
          {idForm}
            <Form.Group controlId="employer">
                <Form.Label>Employer</Form.Label>
                <Form.Control type="text" placeholder="Enter employer" />
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter city" />
            </Form.Group>
            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Enter country" />
            </Form.Group>
            <Form.Group controlId="qualification">
                <Form.Label>Qualification</Form.Label>
                <Form.Control type="text" placeholder="Enter qualification" />
            </Form.Group>
            <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" placeholder="Enter date" />
            </Form.Group>
            
            <Button type="submit" variant={buttonType} id="submit-button">
            {this.props.date.actionModal}
            </Button>

        </Form>
      

      </Modal.Body>
    </Modal>
        )
    }
}

export default AddWork;