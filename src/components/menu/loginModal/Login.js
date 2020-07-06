import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {loginService} from '../../../service/loginService'


class Login extends React.Component {
 
  


  state = {
    email: String,
    password: String,
    
  }

  changeHandler = (event) =>{
    
      if(event.target.type === "password"){
this.setState({password: event.target.value})
      }else if(event.target.type === "email"){
        this.setState({email: event.target.value})
      }
      
      
  }


  

  buttonLogin = (event) =>{
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    loginService.login(email,password)

      

   
  }
  render(){
    return(
        <Modal
      show={this.props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={this.props.hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login/
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      <Form >
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange= {this.changeHandler} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange= {this.changeHandler}/>
        </Form.Group>
  
        <Button variant="primary" type="submit" onClick={this.buttonLogin}>
          Submit
        </Button>
      </Form>

      </Modal.Body>
    </Modal>
    );

  }


}


export default Login;