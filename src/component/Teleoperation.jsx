import React, { Component } from 'react';
import { Joystick } from 'react-joystick-component';
import ROSLIB from 'roslib/src/RosLib';
import Config from '../scripts/config.js';
import {Button} from 'react-bootstrap';

class Teleoperation extends Component {
    state = { 
        ros: null
     } 

    constructor() {
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this);
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
    //define two methods used in the Joystick
    handleMove() {
        console.log("handle move");
        //Create a ROS publisher on the topic cmd_vel
        var cmd_vel = new ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,//topic name
            messageType:"geomtery_msgs/Twist",
        });//stand fo cdm_vel method topic
        //Create a twist message to be sent to rosbridge
        var twist = new ROSLIB.Message({
            linear:{
                x: 2,
                y: 2,
                z:0,
            },
            angular:{
                x:0,
                y:0,
                z:0,
            }
        });
        //Publish the message on the cmd_vel topic
        cmd_vel.publish(twist);
    };
    



    handleStop() {
        console.log("handle stop");
    };

    render() { 
        return (
            <Joystick 
             size={100} 
             sticky={false} 
             baseColor="#EEEEEE" 
             stickColor="#BBBBBB" 
             move={this.handleMove} 
             stop={this.handleStop}>
            </Joystick>
        );
    }
}
 
export default Teleoperation;