import React from 'react'
import ProjectForm from '../addModal/ProjectForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CustomTable from '../table/CustomTable'

import {pageService} from './../../../../service/pageService'
class ProjectDashboard extends React.Component{
    state ={
        projects: [],
        showProjectModal: false,
    }

    componentDidMount(){
  
      this.getProjrcts()
      
    }
    getProjrcts(){
      pageService.getProjects(null).then(data =>{
        this.setState({
          projects: data
        })
     
    
    })}
    actionHandler = (id,action,modal) =>{
  
        if(modal === 'project'){
          this.setState({ showProjectModal: true , actionModal: action , idElement: id});
        }

      }

    hideModal=() =>{
        this.setState({ 
          showProjectModal: false,
     
        });
      }
    render(){
        return(
            <Container style={{paddingTop: '10px'}}>
                <Row>
                    <Col lg="2" md="2"  className=" text-center"><h2><span style={{borderBottom: "3px solid #99cc99"}}> Projects</span> </h2>
                    
                    </Col>
                    <Col>
                        <CustomTable arg={this.state.projects} action={this.actionHandler} add={() =>this.actionHandler(null,'project',"Add")} type="project"/>
                    </Col>
                </Row>
                <ProjectForm date={this.state} hideModal={this.hideModal} />
            </Container>
        )
    }


}

export default ProjectDashboard;