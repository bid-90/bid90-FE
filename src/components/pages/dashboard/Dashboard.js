import React from 'react'
import Container from 'react-bootstrap/Container'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import AboutDashboard from './aboutDashboard/AboutDashboard'
import ProjectDashboard from './projectDashboard/ProjectDashboard'
import {loginService} from '../../../service/loginService'


class Dashboard extends React.Component{
    state ={
        login: Boolean ,
        user: {},
        tab: '',
      }

      componentDidMount(){
        this.setState({login: loginService.isLogin()})  
        this.setState({user : loginService.loginInfoUser()})
        if(localStorage.getItem('deshboard-tab')){
          this.setState({tab: localStorage.getItem('deshboard-tab')})
        }else{
          this.setState({tab: 'info'})
        }
       }
    clickHandler= (tabKey) =>{
      console.log(tabKey)
      localStorage.setItem('deshboard-tab', tabKey)
      this.setState({tab: tabKey})
    }
    render(){
        if(!this.state.login){
            return(<div>Unauthorized</div>)
        }

        return(
            <Container >
  <Tabs  activeKey={this.state.tab} className="justify-content-sm-center" id="uncontrolled-tab-example" onSelect={this.clickHandler}>
  <Tab eventKey="info" title="Info" >
    sdfsdf
  </Tab>
  <Tab eventKey="home" title="Home">
    sdfsdfhgghjgh
  </Tab>
  <Tab eventKey="project" title="Project" >
    <ProjectDashboard />
  </Tab>
  <Tab eventKey="about" title="About" >
    <AboutDashboard  />
  </Tab>
 
</Tabs>
</Container>
        )
    }


}

export default Dashboard;