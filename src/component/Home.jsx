import React, { Component } from 'react';
import {Row, Col, Container, Button} from "react-bootstrap";
import Connection from './Connection';
import Teleoperation from './Teleoperation';
import LegTest from './LegTest';

class Home extends Component {
    state = {
        counter: 0,
      };
    increment_counter() {
        this.setState({counter:this.state.counter + 1});
        //console.log(this.state.coounter);
    }

    render() { 
        return (
            <div>
                <Container>
                    <h1 className='text-center mt-3'>Robot Control Page</h1>
                    <Row>
                        <h1>1.</h1>
                        <h2>Page Interactive Test</h2>
                        <Col>
                            <h3>
                                Experiment Times Counter:
                                {this.state.counter}
                            </h3>
                        </Col>
                        <Col>
                            <Button onClick={() => this.increment_counter()}>Launch one time Experiment</Button>
                            
                        </Col>
                    </Row>
                    <Row>
                    <h1>2.</h1>
                        <h2>Robot Connection Test</h2>
                        <Connection />
                    </Row>
                    
                    <Row>
                        <h1>3.</h1>
                        <h2>Robot Teleoperation Test</h2>
                        <Teleoperation />
                    </Row>

                    <Row>
                        <h1>4.</h1>
                        <h2>Traveler Leg Test</h2>
                        <LegTest />
                    </Row>

                </Container>
                
            </div>
            );
    }
}
 
export default Home;