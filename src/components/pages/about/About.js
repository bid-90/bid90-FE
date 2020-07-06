import React from 'react'

import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Particles from 'react-particles-js'
import styleAbout from './About.module.css'

import {pageService} from './../../../service/pageService'
class About extends React.Component{
state = {
    name: null,
    dateOfBirth: null,
    ocupation: null,
    image: null,
    contacts: [],
    educations: [],
    works: [],
    skills: []
}
componentDidMount(){
   pageService.getAbout().then(data =>{
   
        this.setState({
            name : data.name,
            dateOfBirth: data.dateOfBirth,
            ocupation: data.ocupation,
            image: data.image['link'],
            contacts: data.contacts,
            educations: data.educations,
            works: data.works,
            skills: data.skills
        })
    })
}

getAge(data){
    if(data === null) return null;
    let dateOfBirth = new Date(data)
    let dateNow = new Date()
   
    let age = dateNow.getFullYear() - dateOfBirth.getFullYear();
    if(dateNow.getMonth() < dateOfBirth.getMonth()){
        return age - 1;
    }else if(dateNow.getDate() < dateOfBirth.getDate()){
        return age - 1;
    }
    return age;
}
    render(){

        let contacts = this.state.contacts.map(c =>{
           
           
            return <div style={{margin: '10px' , zIndex: '1', display: 'flex', alignItems: 'center'}}><a href={c.value} className={styleAbout.contactButton} ><i className={c.type} style={{ width: '30px', height:'30px'}}></i></a></div>


          
        })
        let educations = this.state.educations.map((e,i,a) =>{
            if(a.length - 1 !== i){
                return  <Col lg="12" key={e.id}>
                            <h3>{e.qualification}</h3>
                            <h4>{e.organisation} ({e.city},{e.country})</h4>
                            <h6>{e.date}</h6>
                            <hr/>
                        </Col>
            }else{
                return  <Col lg="12" key={e.id}>
                            <h3>{e.qualification}</h3>
                            <h4>{e.organisation} ({e.city},{e.country})</h4>
                            <h6>{e.date}</h6>
                        </Col>
            }
            
            
        })
        let works = this.state.works.map((w,i,a) =>{
            if(a.length - 1 !== i){
                return  <Col lg="12" key={w.id}>
                            <h3>{w.qualification}</h3>
                            <h4>{w.organisation} ({w.city},{w.country})</h4>
                            <h6>{w.date}</h6>
                            <hr/>
                        </Col>
            }else{
                return  <Col lg="12" key={w.id}>
                            <h3>{w.qualification}</h3>
                            <h4>{w.organisation} ({w.city},{w.country})</h4>
                            <h6>{w.date}</h6>
                        </Col>
            }
            
            
        })
        let skills = this.state.skills.map((s,i) =>{
            
                return  <div key={s.id}>
                            <h3>{s.name}</h3>
                            <ProgressBar  style={{border: "1px solid black"}} variant="warning" now={s.value} />
                        </div>
          
            
        })

        return(
            <div >
            <Jumbotron style={{background: "linear-gradient(to top, #00c6fb 0%, #005bea 100%)", borderRadius: "0"}}>
                <Container fluid>
                <Row className="justify-content-md-center justify-content-sm-center justify-content-xs-center justify-content-xl-center">
                <Particles className={styleAbout.particles} params={{ 
          particles: { 
            number: { 
              value: 70, 
              density: { 
                enable: true, 
                value_area: 1700, 
              } 
            }, 
          }, 
        }} />
                <Col/>
                    <Col xs="auto" sm="auto">
                        <Image src={this.state.image} roundedCircle thumbnail style={{height: '180px', width: '180px'}}/>
                    </Col>
                <Col/>
                </Row>

                <Row className="justify-content-md-center justify-content-sm-center justify-content-xs-center justify-content-xl-center">
                <Col/>
                    <Col xs="auto">
                        <h3>{this.state.name}, {this.getAge(this.state.dateOfBirth)}</h3>
                    </Col>
                <Col/>
                </Row>

                <Row className="justify-content-md-center justify-content-sm-center justify-content-xs-center justify-content-xl-center">
                <Col/>
                    <Col xs="auto">
                        <h4>{this.state.ocupation}</h4>
                    </Col>
                <Col/>
                </Row>

                <Row className="justify-content-sm-center text-center" >
                <Col/>
                    {contacts}
                <Col/>
                
                    
                
                </Row>
                
                </Container>
            </Jumbotron>
           <Container style={{ paddingBottom: "50px" , minHeight: '460px'}}>
     
     
           
           <Row style={{paddingTop: "10px",paddingBottom: "10px",paddingLeft: "5px", paddingRight: "5px" ,borderBottom: "1px solid #E8E8E8"}} >
                <Col lg="4" md="4"  className=" text-center">
                <h2 style={{paddingBottom: "10px"}} ><span style={{borderBottom: "3px solid #6699cc", }}> Education</span></h2>
                </Col>
                <Col  className="text-sm-left text-center">
                <Row >
                    {educations}
                   
                </Row>

                </Col>
            </Row>

            <Row style={{paddingTop: "10px",paddingBottom: "10px",paddingLeft: "5px", paddingRight: "5px",borderBottom: "1px solid #E8E8E8" }}>
                <Col lg="4" md="4"  className=" text-center">
                <h2><span style={{borderBottom: "3px solid #99cc99"}}> Work</span> </h2>
                </Col>
                <Col  className="text-sm-left text-center">
                    <Row>
                        {works}
                    </Row>
                </Col>
            </Row>

            <Row style={{paddingTop: "10px",paddingBottom: "10px",paddingLeft: "5px", paddingRight: "5px",borderBottom: "1px solid #E8E8E8" }} >
                <Col lg="4" md="4" className="text-center">
                <h2><span style={{borderBottom: "3px solid #ccccff"}}> Skills</span> </h2>
                </Col>
                <Col  className="text-sm-left text-center">
                
               {skills}
                </Col>
            </Row>

            
            
           </Container>
           </div>    
        );
    };
}

export default About;