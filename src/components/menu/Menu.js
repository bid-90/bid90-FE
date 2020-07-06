import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Login from './loginModal/Login'

import {loginService} from './../../service/loginService'

class Menu extends React.Component{
  state ={
    loginModal: false,
    login: false,
    user: {} 
  }

  showLoginModal = () =>{
    this.setState({ loginModal: true});
  }
  hideLoginModal=() =>{
    this.setState({ loginModal: false});
  }
 
  

  componentDidMount(){
   this.setState({login: loginService.isLogin()})  
   this.setState({user : loginService.loginInfoUser()})
  }
    render(){
      let navLink;
      let menuButton;
      if(this.state.login){
        navLink = <Nav.Link href="/dashboard" >Dashboard</Nav.Link>
        menuButton = <Button onClick={loginService.logout} block>Logout</Button>
      }else{
        menuButton = <Button onClick={this.showLoginModal}  block>Login</Button>
      }
    

        return(
         <div>
            <Navbar  expand="lg" sticky="top" style={{ backgroundColor:"#005bea"}} variant="dark">
              <Navbar.Brand href="https://bid90.ro">
              BID90
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/project">Projects</Nav.Link>
                  <Nav.Link href="/about">About</Nav.Link>
                  {navLink}
                </Nav>
                <Nav className="justify-content-end">
                  <Nav.Item >
                    <Nav.Link active  className="text-center">{this.state.user.name}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    {menuButton}
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Login show={this.state.loginModal} alert={this.props.alert}hideModal={this.hideLoginModal} />
            
            
          </div>
          
        );
    };
    
}

export default Menu;