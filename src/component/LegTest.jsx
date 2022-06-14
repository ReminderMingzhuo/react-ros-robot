import React, { Component } from 'react';
import ROSLIB from 'roslib/src/RosLib';
import Config from '../scripts/config.js';
import {Row, Col, Container, Button} from 'react-bootstrap';


class LegTest extends Component {
    state = { 
        ros: null
     } 

    constructor() {
        super();
        this.init_connection();
    }

    launch_test() {
        console.log("launch leg test");
        //Create publishers
        var publisher_ = new ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.drag_speed,//topic name
            messageType:"std_msgs/Float64MultiArray",
        });
        var publisher_2 = new ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.drag_times,//topic name
            messageType:"std_msgs/Float64MultiArray",
        });
        var publisher_3 = new ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.drag_traj,//topic name
            messageType:"std_msgs/Float64MultiArray",
        });
        var publisher_4 = new ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.drag_angle,//topic name
            messageType:"std_msgs/Float64MultiArray",
        });

        //Create Messages
        var control_message = new ROSLIB.Message({
            layout:{
                data_offset : 0,
            },
            data: [10],
        });
        var drag_times = new ROSLIB.Message({
            layout:{
                data_offset : 0,
            },
            data: [10],
        });
        var drag_traj = new ROSLIB.Message({
            layout:{
                data_offset : 0,
            },
            data: [10],
        });
        var drag_angle = new ROSLIB.Message({
            layout:{
                data_offset : 0,
            },
            data: [10],
        });

        //Publish the message
        publisher_.publish(control_message);
        publisher_2.publish(drag_times);
        publisher_3.publish(drag_traj);
        publisher_4.publish(drag_angle);
    }

    init_connection() {
        this.state.ros = new ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("connection establish in the teleoperation!");
            this.setState({connected:true});
        });

        this.state.ros.on("close", () => {
            console.log("connection is closed!");
            this.setState({connected:false});
            //try to reconnect every 3 seconds
            setTimeout(() => {
                try {
                    this.state.ros.connect("ws://"+Config.ROSBRIDGE_SERVER_IP+":"+Config.ROSBRIDGE_SERVER_PORT); 
                 } catch (error) {
                     console.log("connection problem");
                 }
            }, Config.RECONNECTION_TIMER);
        });
        try {
            this.state.ros.connect("ws://"+Config.ROSBRIDGE_SERVER_IP+":"+Config.ROSBRIDGE_SERVER_PORT);  
        } catch (error) {
            console.log("connection problem");
        }
        
    }
    render(){
        return(
            <div>
                <Container>
                    <Button onClick={() => this.launch_test()}>Launch one time Leg Test</Button>
                </Container>
            </div>
        )
    }

};
 
export default LegTest;