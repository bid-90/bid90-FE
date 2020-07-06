import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



import { pageService } from '../../../service/pageService'
import cssStyle  from './Project.module.css'

class Post extends React.Component{
    state={
        projects:[]
    }
  
    componentDidMount(){
  
      this.getProjects(null)
      
    }
    getProjects(id){

      pageService.getProjects(id).then(data =>{
        this.setState({projects: data})
        console.log(data)
      })
    }

   
    render(){
      let projects = this.state.projects.map(p =>{
        return  <div className={cssStyle.project_item}>
        <img src={p.image.link} alt={p.image.name}className={cssStyle.project_img} />
    <h6>{p.title}</h6>
    <div class="d-flex justify-content-center">
      {p.links.map(l =>{
        let cssClass = 'fab fa-lg '+ l.type
        return <a href={l.link} target="_blank" rel="noopener noreferrer"><i className={cssClass}></i></a>
      })}
    </div>

  </div>
    })
    let css = 'd-flex flex-wrap justify-content-start '+ cssStyle.project_container;
    
  
        return(
          
            <Container  style={{paddingBottom: "50px" , minHeight: '850px'}}>

        <Row>
          <Col style={{ paddingBottom: "20px" }}>

          </Col>
        </Row>


        <Row style={{margin: 'auto' }} className="justify-content-center">
        
        <div class={css} >
        {projects}
          </div>


        </Row>
  
      </Container>
        )
    }


}

export default Post;