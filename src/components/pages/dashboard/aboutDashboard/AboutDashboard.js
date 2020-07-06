import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import {pageService} from './../../../../service/pageService'
import CustomTable from '../table/CustomTable'

import AddSkill from './../addModal/AddSkill'
import AddEducation from './../addModal/AddEducation'
import AddWork from './../addModal/AddWork'
import AddContact from './../addModal/AddContact'

class AboutDashboard extends React.Component{
 state ={
  contacts: [],
  dateOfBirth: null,
  educations: [],
  profileImage: 'http://localhost:8080/api/file/get/image?name=myPhoto',
  name: null,
  ocupation: null,
  skills: [],
  works: [],

  showSkillModal: false,
  showEducationModal: false,
  showWorkModal: false,
  showContactModal: false,

  actionModal: null,
  idElement: null,
 }
componentDidMount(){
  
  this.getInfo()
  
}
getInfo(){
  pageService.getAbout().then(data =>{
  
    this.setState({
      contacts: data.contacts,
      dateOfBirth: data.dateOfBirth,
      educations: data.educations,
      profileImage: data.image.link,
      name: data.name,
      ocupation: data.ocupation,
      skills: data.skills,
      works: data.works
    })
 

})}

actionHandler = (id,action,modal) =>{
  
  if(modal === 'skill'){
    this.setState({ showSkillModal: true , actionModal: action , idElement: id});
  }else if(modal === 'education'){
    this.setState({ showEducationModal: true , actionModal: action , idElement: id});
  }else if(modal === 'work'){
    this.setState({ showWorkModal: true , actionModal: action , idElement: id});
  }else if(modal === 'contact'){
    this.setState({ showContactModal: true , actionModal: action , idElement: id});
  }
}

formDateHandler = (event) =>{
  event.preventDefault();
  let name = event.target.elements.formName.value;
  let ocupation = event.target.elements.formOcupation.value;
  let dateOfBirth = event.target.elements.formdateOfBirth.value
  window.location.reload();
  const formData = new FormData()
  if(name !== ''){
    formData.append("name", name);
  }
  if(ocupation !== ''){
    formData.append("ocupation", ocupation);
  }
  if(dateOfBirth !== ''){
    formData.append("dateOfBirth", dateOfBirth);
  }

  pageService.addDateProfile(formData)

}

hideModal=() =>{
  this.setState({ 
    showSkillModal: false,
    showEducationModal: false,
    showWorkModal: false,
    showContactModal: false
  });
}

deleteImage = ()=> {
  pageService.deleteProfileImage()
  this.refreshPage();
}

chandeImage = (event)=> {
  const formData = new FormData()
  formData.append("file", event.target.files[0]);
  pageService.addDateProfile(formData)
  this.setState({profileImage: URL.createObjectURL(event.target.files[0])})
}

imageClickHandler = () =>{
  document.getElementById("imageUploadInput").click()
}

render(){
  

  

    return(
        <Container style={{paddingTop: '10px'}} >
            <Row>
              <Col lg="2" md="3"  className=" text-center"><h3><span style={{borderBottom: "3px solid #c43cff"}}> Header</span> </h3></Col>
              <Col>
         
              <Container >
                <Row><Col  md={4}>
                <Card style={{ width: '10rem' }} >
                <Card.Img variant="top" src={this.state.profileImage} id="profilImage" onClick={this.imageClickHandler}  />
  <Card.Body>
  <Form >
  
  <input type="file" id="imageUploadInput" style={{display: 'none'}} onChange={this.chandeImage}/>
   

  <ButtonGroup aria-label="Basic example">
    <Button size="sm" variant="danger" onClick={this.deleteImage}>Delete</Button>
</ButtonGroup>
</Form>
  
  </Card.Body>
</Card>
                </Col>
                <Col  md={8}>
                <Form style={{paddingBottom: '10px'}} onSubmit={this.formDateHandler}>
  <Form.Group controlId="formName">
    <Form.Label>Name: {this.state.name}</Form.Label>
    <Form.Control size="sm" type="text" placeholder="Enter name" />
  </Form.Group>
  <Form.Group controlId="formOcupation">
    <Form.Label>Ocupation: {this.state.ocupation}</Form.Label>
    <Form.Control size="sm" type="text" placeholder="Enter ocupation" />
  </Form.Group>
  <Form.Group controlId="formdateOfBirth">
    <Form.Label>Date Of Bith: {this.state.dateOfBirth}</Form.Label>
    <Form.Control size="sm" type="date" placeholder="Enter Date" />
  </Form.Group>
  
  <Button variant="primary" type="submit" size="sm">
    Update
  </Button>
</Form>
                </Col>
  
                </Row>
                
              
                <Row>
<Col>
                <CustomTable arg={this.state.contacts} action={this.actionHandler} add={() =>this.actionHandler(1,'contact',"Add")} type="contact"/>
</Col>
                </Row>
              </Container>
              
  
              </Col>
            </Row>
            <Row>
            <Col lg="2" md="2"  className=" text-center"><h3><span style={{borderBottom: "3px solid #99cc99"}}> Work</span> </h3></Col>
                <Col>
                <Container >
                <Row>
                  <Col>
                   <CustomTable arg={this.state.works} action={this.actionHandler} add={() =>this.actionHandler(null,'work',"Add")} type="work"/>
                  </Col>
                </Row>
                </Container>
                </Col>
            </Row>
            <Row>
                <Col lg="2" md="2"  className=" text-center"><h3 style={{paddingBottom: "10px"}} ><span style={{borderBottom: "3px solid #6699cc", }}> Education</span></h3></Col>
                <Col>
                <Container >
                <Row>
                  <Col>
                  <CustomTable arg={this.state.educations} action={this.actionHandler} add={() =>this.actionHandler(null,'education',"Add")} type="education"/>
                  </Col>
                </Row>
                </Container>
                </Col>
            </Row>
            <Row>
            <Col lg="2" md="2"  className=" text-center"><h3><span style={{borderBottom: "3px solid #99cc99"}}> Skill</span> </h3></Col>
              <Col>
              <Container >
                <Row>
                  <Col>
                <CustomTable arg={this.state.skills} action={this.actionHandler} add={() =>this.actionHandler(null,'skill',"Add")} type="skill"/>
                  </Col>
                </Row>
                </Container>
              </Col>
            </Row>
          <AddSkill date={this.state} hideModal={this.hideModal} />
          <AddEducation date={this.state} hideModal={this.hideModal}   />
          <AddWork date={this.state} hideModal={this.hideModal}   />
          <AddContact date={this.state} hideModal={this.hideModal}  />
        </Container>

    )
}



}

export default AboutDashboard;