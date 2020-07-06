import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import {pageService} from '../../../../service/pageService'

class AddSkill extends React.Component{
  state = {
    range: 50
  }
  refreshPage(){
    window.location.reload();
  }
  formAdd = (event) =>{
    //event.preventDefault();
    console.log("ad")
    let type = event.target.elements.skill.value;
    let value = event.target.elements.range.value;
    pageService.addSkill(0,type,value)
    this.refreshPage();
  }
  formUpdate = (event) =>{
    //event.preventDefault();
    let id = event.target.elements.idSkill.value;
    let type = event.target.elements.skill.value;
    let value = event.target.elements.range.value;
    pageService.addSkill(id,type,value);
    this.refreshPage();
  }
  formDelete= (event)=>{
    //event.preventDefault();
    let id = event.target.elements.idSkill.value;
    pageService.deleteSkill(id);
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
  rangeHandler = (event) =>{
    let value = event.target.value
    this.setState({range: value})
  }
  getSkillHandler = (id) =>{
       
    pageService.getSkill(id).then(result =>{
      document.getElementById("skill").value = result.name
      this.setState({range: result.value})
      document.getElementById("range").value = result.value
   
    })
  }
    render(){
      let idForm;
      let buttonType;
if(this.props.date.idElement !== null){
  idForm = (
    <InputGroup>
      <InputGroup.Prepend>
        <Button variant="outline-secondary" onClick={() => this.getSkillHandler(this.props.date.idElement)} >Get Work</Button>
      </InputGroup.Prepend>
      <Form.Control type="text" placeholder="Enter id" value={this.props.date.idElement !== null ? this.props.date.idElement : ''} onChange={()=>{}} id="idSkill" disabled/>
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
      show={this.props.date.showSkillModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={this.props.hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {this.props.date.actionModal} Skill
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={this.formHandler} >
          {idForm}
            <Form.Group controlId="skill">
                <Form.Label>Skill</Form.Label>
                <Form.Control type="text" placeholder="Enter skill" />
            </Form.Group>
            <Form.Group controlId="range" onChange={this.rangeHandler}>
        <Form.Label>Range: {this.state.range}</Form.Label>
                <Form.Control type="range" />
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

export default AddSkill;