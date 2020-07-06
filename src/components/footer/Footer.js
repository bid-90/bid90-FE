import React from 'react'
import Container from 'react-bootstrap/Container'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Footer extends React.Component{

    render(){
        return(
            <div  style={{paddingTop: "10px",paddingBottom: "10px" }} >  
            <Container >
                <Row className="justify-content-center">
                    <Col/>
                    <Col xs="auto">
                        <span>Copyright © {new Date().getFullYear()} bid90.ro</span>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </div>
        );
    }
}

                    

export default Footer;