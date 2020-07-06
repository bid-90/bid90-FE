import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';

import {pageService} from './../../../../service/pageService'


class ProjectForm extends React.Component{

        state = {
            type: null,
            value: null,
            profileImage: 'http://localhost:8080/api/file/get/image?name=',
            links: 0,
            idElement: null,
           
          }
        
          refreshPage(){
            window.location.reload();
          }
          
          formAdd =(event)=>{
           event.preventDefault();
            let title = event.target.elements.titleProject.value;
            let description = event.target.elements.descriptionProject.value;
            let image = event.target.elements.imageUploadInput.files[0]
            let id = 0;
            if(event.target.elements.idProject !== undefined){
              id = event.target.elements.idProject.value
            }
           
            let links = [];
            for(let x =0; x<=this.state.links;x++){
                let idLink = 'link-' + x 
                let idTypeLink = 'typeLink-' + x 
              if(document.getElementById(idLink).value === '') continue;
              links.push({type: document.getElementById(idTypeLink).value, link: document.getElementById(idLink).value}) 
              
            }
            const formData = new FormData()
            formData.append("id", id);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);
            pageService.addProject(formData,links);
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
                this.formAdd(event);
                break;
              case 'Delete':
                this.formDelete(event)
                break;
              default:
                break;
            }
          }
         
        addLink = () =>{
          let nr = this.state.links + 1;
          this.setState({links: nr})
        }
        removeLink = () =>{
          let nr = this.state.links - 1;
          if(nr < 0) nr = 0;
          this.setState({links: nr})
        }
          getProjectHandler = (id) =>{
           pageService.getProjects(id).then(result =>{
          
            document.getElementById("titleProject").value = result[0].title
            document.getElementById("descriptionProject").value = result[0].description
          })
          }
          deleteProjectHandler = (id) =>{
            pageService.deleteProject(id)
          
          }
          
            render(){
              let idForm;
              let buttonType;
              let links = [];
              if(this.props.date.idElement !== null){
                idForm = (
                  <InputGroup>
                    <InputGroup.Prepend>
                      <Button variant="outline-secondary" onClick={() => this.getProjectHandler(this.props.date.idElement)}>Get Project</Button>
                      <Button variant="danger" onClick={() => this.deleteProjectHandler(this.props.date.idElement)}>Delete</Button>
                    </InputGroup.Prepend>
                    <Form.Control type="text" placeholder="Enter id" value={this.props.date.idElement !== null ? this.props.date.idElement : '0'} onChange={()=>{}} id="idProject" disabled/>
                  
                  </InputGroup>
                )
              }
              
                for(var x=0; x<this.state.links;x++){
                  let idLinkType = 'typeLink-'+(x+1);
                  let idLink = 'link-'+(x+1);
                  links.push(
                    <Row key={x}>
                    <Col>
                    <Form.Group controlId={idLinkType}>
                <Form.Label>Type</Form.Label>
                <Form.Control as="select">
<option>fa-apple</option>
<option>fa-google-play</option>
<option>fa-bitbucket</option>
<option>fa-github</option>
            </Form.Control>

            </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId={idLink}>
                <Form.Label>Link</Form.Label>
                <Form.Control type="text" placeholder="Enter value" />
            </Form.Group>
                    </Col>
                  </Row>)
                  
                }
                return(
             
                    <Modal
              show={this.props.date.showProjectModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              onHide={this.props.hideModal}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {this.props.date.actionModal} Project
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form onSubmit={this.formHandler}>
                  {idForm}
               
                  <Form.Group controlId="titleProject">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" />
                    </Form.Group>
                   
                    <Form.Group controlId="descriptionProject">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                    
                    
                <Container>
                
                  <Row>
                    <Col>
                    <Form.Group controlId="typeLink-0">
                <Form.Label>Type</Form.Label>
                <Form.Control as="select">
<option>fa-apple</option>
<option>fa-google-play</option>
<option>fa-bitbucket</option>
<option>fa-github</option>
            </Form.Control>

            </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="link-0">
                <Form.Label>Link</Form.Label>
                <Form.Control type="text" placeholder="Enter value" />
            </Form.Group>
                    </Col>
                  </Row>
                  {links}
                 
                    <ButtonGroup size="sm">
                      <Button  onClick={this.addLink}>+</Button>
                      <Button  onClick={this.removeLink}>-</Button>
                    </ButtonGroup>
                </Container>
                
            
           
                    <div style={{paddingTop :'10px',paddingBottom :'20px'}}>
                        <input type="file" id="imageUploadInput" onChange={this.chandeImage} />
                    </div>

                    <Button type="submit" variant={buttonType} id="submit-button">
                    {this.props.date.actionModal}
                    </Button>
        
                </Form>
              
        
              </Modal.Body>
            </Modal>
        )
}
}

export default ProjectForm;