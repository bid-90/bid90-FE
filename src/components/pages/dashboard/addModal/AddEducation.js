import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import {pageService} from '../../../../service/pageService'

class AddEducation extends React.Component{
    state = {
        organisation: null,
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
        let organisation = event.target.elements.organisation.value;
        let city = event.target.elements.city.value;
        let country = event.target.elements.country.value;
        let qualification = event.target.elements.qualification.value;
        let date = event.target.elements.date.value;
        pageService.addEducation(0,organisation,city,country,qualification,date)
        this.refreshPage();
      };
    
      formUpdate = (event) =>{
        //event.preventDefault();
        let id = event.target.elements.idEducation.value;
        let organisation = event.target.elements.organisation.value;
        let city = event.target.elements.city.value;
        let country = event.target.elements.country.value;
        let qualification = event.target.elements.qualification.value;
        let date = event.target.elements.date.value;
        pageService.addEducation(id,organisation,city,country,qualification,date)
        this.refreshPage();
      };

      formDelete= (event)=>{
        //event.preventDefault();
        let id = event.target.elements.idEducation.value;
        pageService.deleteEducation(id);
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

      getEducationHandler = (id) =>{
       
        pageService.getEducation(id).then(result =>{
          document.getElementById("organisation").value = result.organisation
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
              <Button variant="outline-secondary" onClick={() => this.getEducationHandler(this.props.date.idElement)}>Get Education</Button>
            </InputGroup.Prepend>
            <Form.Control type="text" placeholder="Enter id" value={this.props.date.idElement !== null ? this.props.date.idElement : ''} onChange={()=>{}} id="idEducation" disabled/>
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
      show={this.props.date.showEducationModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={this.props.hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {this.props.date.actionModal} Education
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={this.formHandler}>
          {idForm}
            <Form.Group controlId="organisation">
                <Form.Label>Organisation</Form.Label>
                <Form.Control type="text" placeholder="Enter organisation" />
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
            
            <Button type="submit" variant={buttonType} id="submit-button" >
            {this.props.date.actionModal}
            </Button>

        </Form>
      

      </Modal.Body>
    </Modal>
        )
    }
}

export default AddEducation;