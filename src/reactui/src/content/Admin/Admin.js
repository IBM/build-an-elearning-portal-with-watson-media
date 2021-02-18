import React from "react"
import {
    withRouter
  } from "react-router-dom"
import { Container, Row, Col } from 'react-bootstrap';
// import Dashboard from "../Dashboard"
// import access_token from '../access_token'
import { Button, Form, TextInput } from 'carbon-components-react';
import back from './../../assets/background3.jpg'
const axios = require('axios')

class Admin extends React.Component{
    constructor(){
        super()
        this.state = {
            email: "",
            password:"",
            loading: false,
            clientId:""

        }
    }

    componentDidMount(){
        axios.get(`http://${window.location.hostname}:${window.location.port}/getClientId`).then(res=>{
        // axios.get(`http://${window.location.hostname}:8080/getClientId`).then(res=>{
            console.log(res.data)
            const clientId = res.data
            if(clientId !== "Enter Client ID" && clientId.length === 40){
                this.setState({loading:false, clientId})
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    handleChange = (e) =>{
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleClick = (e)=>{
        e.preventDefault()
        const data = {clientId: this.state.clientId}
        axios.post(`http://${window.location.hostname}:${window.location.port}/setClientId`, data)
        // axios.post(`http://${window.location.hostname}:8080/setClientId`, data)
        .then(res=>{
            console.log(res)
            window.location.href = `https://authentication.video.ibm.com/authorize?client_id=${this.state.clientId}&response_type=token&redirect_uri=http://${window.location.hostname}:${window.location.port}/get_token`
            // window.location.href = `https://authentication.video.ibm.com/authorize?client_id=${this.state.clientId}&response_type=token&redirect_uri=http://${window.location.hostname}:8080/get_token`
        })
    }

    render(){
        return(
            <Container fluid={true} 
                style={{display:"flex", 
                    overflow:"auto", 
                    clear:"both", 
                    justifyContent: "center",
                    minHeight:"100vh", 
                    overflow:"scroll", 
                    backgroundImage: `url(${back})`, 
                    // backgroundPositionX:"350px", 
                    backgroundSize: 'cover', 
                    alignItems: "center"}}>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <div className="bx--row landing-page__banner">
                            <h1 style={{color:"white"}}>
                                <strong>E-Learning Portal using<br/> Watson Media</strong>
                            </h1>
                        </div>
                    </Col>
                    <Col>
                        <h5 style={{color:"white"}}>
                            Welcome Admin,
                        </h5><br/>
                    </Col>
                {/* </Row>
                <Row className="justify-content-md-center"> */}
                    <Col xs md={4}>
                        <div>
                            <Form>
                                <TextInput
                                    id="test2"
                                    invalidText="A valid value is required"
                                    placeholder="Enter Client ID"
                                    style={{marginBottom:"0.5em"}}
                                    type="text"
                                    name="clientId"
                                    value= {this.state.clientId}
                                    onChange = {this.handleChange}
                                    invalid={false}
                                />
                                <Button
                                    disabled={this.state.clientId.length === 40?false:true}
                                    style={{marginTop:"0.5em"}}
                                    kind="primary"
                                    tabIndex={0}
                                    type="submit"
                                    onClick={this.handleClick}
                                >
                                    Authorize Access to Videos
                                </Button>
                            </Form>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(Admin)
