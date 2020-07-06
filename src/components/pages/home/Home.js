import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Typing from 'react-typing-animation'
import Particles from 'react-particles-js'
import styleHome from './Home.module.css'
class Home extends React.Component {

  render() {


    return (
            <div style={{minHeight: '100vh', background: "linear-gradient(to top, #00c6fb 0%, #005bea 100%)", }}>
      <Particles className={styleHome.particles} params={{ 
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
       
   
      <Container >
<Row  className="align-items-center" style={{minHeight: '90vh'}}>
  <Col style={{textAlign: 'center'}}>
  <Typing  cursor=" <">
  <h1 style={{color: "white", fontSize:"4vw"}}>Hello</h1>
  <Typing.Delay ms={1000} />
  <Typing.Backspace count={5} ms={1000}/>
  <h1 style={{color: "white", fontSize:"4vw"}}>I'm BID.
  <Typing.Delay ms={1000} />
  <Typing.Backspace count={4} ms={1000}/>
  Bradea Ioan Daniel.
  </h1>
  <Typing.Delay ms={1000} />
  <h1 style={{color: "white", fontSize:"3vw"}}>And I'm boss the boss mafiot.</h1>
  <Typing.Delay ms={1000} />
  <Typing.Backspace count={29} ms={1000}/>
  <h1 style={{color: "white", fontSize:"3vw"}}>:))</h1>
  
  </Typing>
  </Col>

</Row>
 



      </Container>
      
      </div>
      
    );
  };


}

export default Home;
