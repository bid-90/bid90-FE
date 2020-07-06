import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import {pageService} from './../../../../service/pageService'



class CustomTable extends React.Component{
    state={
        modalShowImage: false,
        modalShowLink: false,
        idProject: '',
        projectImageName: '',
        linkId: '',
        linkType: '',
        link: ''
    }

    openModalImage = (id,imageName) =>{

        this.setState({modalShowImage: true,  idProject: id, projectImageName: imageName})
    }
    openModalLink = (id,type,link) =>{
        
        this.setState({modalShowLink: true, linkId: id, linkType: type, link: link})
    }
    handleClose = () =>{
        this.setState({modalShowImage: false, modalShowLink: false})
    }
    delteImage(projectId,imageName){
        pageService.deleteProjectImage(projectId,imageName)
        this.handleClose()
    }
    linkModalButton = (id,type,link,typeButton) =>{
        if(typeButton === "delete"){
            pageService.deleteProjectLink(id)
        }

        if(typeButton === "update"){
            pageService.updateProjectLink(id,type,link)       
        }
     
    }
    chandeImage = (event)=> {
        let id = event.target.getAttribute('pelement')
        console.log(id)
        const formData = new FormData()
        formData.append("image", event.target.files[0]);
        formData.append("projectId", id);
        pageService.addImageProfile(formData)
        document.getElementById('projectImage').setAttribute('src',URL.createObjectURL(event.target.files[0]))
        
      }
      
    imageClickHandler = () =>{
        document.getElementById("imageProjectUpload").click()
    }
    
    onChangeLink = (event) =>{
        this.setState({link: event.target.value})
    }
    onChangeTypeLink = (event) =>{
        this.setState({linkType: event.target.value})
    }
    render(){
        let imageSrc;
        let nr = null;
        let imageName;
        let body = this.props.arg.map((v,i)=>{
            let  id = this.props.arg[i].id;
            nr = Object.values(v).length;
            return <tr key={i} style={{textAlign: 'center'}}>{
                Object.values(v).map((v,i) => {
                    if( typeof( v ) === 'object' ){
                        if(v === null){
                            return <td key={i}></td>
                        }
                        if( v.size !== undefined ){
                            imageSrc = v.link
                            imageName = v.name
                            return <td key={i}><Button variant="secondary" size="sm" onClick={() => this.openModalImage(id,imageName)}>Open Img</Button></td>
                        }else{
                            var result = Object.keys(v).map((key) => {
                                let classCss = 'fab '+v[key].type+' fa-lg';
                                let keyU = v[key].type + id
                                return  <span key={keyU} onClick={() => this.openModalLink(v[key].id,v[key].type,v[key].link)}  ><i className={classCss}></i></span> ;
                              });
                        return <td key={i}>{result}</td>
                        }
                    }
                    return <td key={i}>{v}</td>
            })}
            <td>
                <span style={{paddingRight: '10px'}}><Button size="sm" variant="primary" onClick={() =>this.props.action(id,'Update',this.props.type)}>Update</Button></span>
                
            </td>
            </tr>
       })

       

       let head = this.props.arg.map((v,i)=>{
        return Object.keys(v).map((v,i) => {
            return <th key={i}>{v.toUpperCase()}</th>
  
        })})
       
        return(
            <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr style={{textAlign: 'center'}}>
                   {head[0]}
                   <th>ACTION</th>
                   </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={nr + 1}>
                                <Button size="sm" variant="success" onClick={() =>this.props.action(null,'Add',this.props.type) }>+</Button>
                        </td>
                    </tr>
                </tfoot>
            </Table>
            <Modal show={this.state.modalShowImage} onHide={this.handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <div className="d-flex justify-content-center">
            <Image src={imageSrc} rounded style={{width: '280px', height: '280px' }} id="projectImage" onClick={this.imageClickHandler} />
        </div>
                  
    

        
        </Modal.Body>
        <Modal.Footer ><input type="file" id="imageProjectUpload" style={{display: 'none'}} pelement={this.state.idProject} onChange={this.chandeImage}/>
                        <Button  variant="danger" onClick={()=> this.delteImage(this.state.idProject,this.state.projectImageName)}>Delete</Button></Modal.Footer>
      </Modal>
      <Modal show={this.state.modalShowLink} onHide={this.handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Links</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Container>
<Row>
    <Col>
    <Form.Group controlId="typeLink">
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" defaultValue={this.state.linkType} onChange={this.onChangeTypeLink}>
<option>fa-apple</option>
<option>fa-google-play</option>
<option>fa-bitbucket</option>
<option>fa-github</option>
            </Form.Control>

            </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="link">
                <Form.Label>Link</Form.Label>
                <Form.Control type="text" placeholder={this.state.link} onChange={this.onChangeLink}/>
            </Form.Group>
    
    </Col>
</Row>
        </Container>
        
        

        
        </Modal.Body>
        <Modal.Footer >
        <Button  variant="primary" onClick={()=> this.linkModalButton(this.state.linkId,this.state.linkType,this.state.link,'update')}>Update</Button>
        <Button  variant="danger" onClick={()=> this.linkModalButton(this.state.linkId,this.state.linkType,this.state.link,'delete')}>Delete</Button>
        </Modal.Footer>
   
      </Modal>
            </div>
        )
    }
}

export default CustomTable;