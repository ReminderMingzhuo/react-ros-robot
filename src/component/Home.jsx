import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import Connection from './Connection';

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
            <main>
                <h1 className='text-center mt-3'>Robot Control Page</h1>
                <h5>
                    Experiment Times Counter:
                    <p>{this.state.counter}</p>
                </h5>
                <Button onClick={() => this.increment_counter()}>Launch one time Experiment</Button>

                <Connection />
            </main>
            );
    }
}
 
export default Home;