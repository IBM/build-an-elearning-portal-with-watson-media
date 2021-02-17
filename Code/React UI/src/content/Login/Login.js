import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom"
import { Container, Row, Col } from 'react-bootstrap';
import Dashboard from "./../Dashboard"
import { Button, TextInput, Form, Loading } from 'carbon-components-react';
import back from './../../assets/background3.jpg'
var data = require('./../sampleLogin.json')
const axios = require('axios')


class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email: "",
            password:"",
            loading: true,
            auth:false
        }
    }

    componentDidMount(){
        // console.log(window.location.hostname)
        axios.get(`http://${window.location.hostname}:${window.location.port}/showToken`).then(res=>{
        // axios.get(`http://${window.location.hostname}:8080/showToken`).then(res=>{
            console.log(res.data)
            const access_token = res.data.access_token
            if(access_token !== "expired" && access_token.length === 40){
                this.setState({auth:true, loading:false, access_token})
                // console.log('auth')
            } else {
                alert("Contact Admin to authorize page")
                this.props.history.push('/admin')
            }
        }).catch((err)=>{
            alert("Contact Admin to authorize page")
            console.log(err)
            this.props.history.push('/admin')
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
        if(this.state.email === "" || this.state.password === ""){
            alert("Please enter email and password")
            return
        }
        if(!this.state.auth){
            console.log("Toast")
            // this.Toast()
            alert("Please contact Admin to authorize the page")
            return
        }
        var found = false
        var user = {}
        data.map(item => {
            if(item.email === this.state.email && item.password === this.state.password){
                found = true
                user = item
            }
        })
        if(found){
            const access_token = this.state.access_token
            this.props.history.push({
                pathname:'/dashboard',
                state:{ user, access_token }
            })
        } else {
            alert("Invalid Email or Password")
            return
        }
        console.log(found, user)
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
                    width:'100%',
                    padding:'1rem',
                    alignItems: "center"}}>
                <Row >
                    {
                        this.state.loading?
                        <Loading
                            style={{align: 'center'}}
                            description="Active loading indicator" withOverlay={false}
                        />
                        :
                    <Col md={12}>
                        <div >
                            <h1 style={{color:"white"}}>
                                <strong>E-Learning Portal using<br/> Watson Media</strong>
                            </h1>
                        </div><br/>
                        <div style={{alignItems: "center"}}>
                            <Form>
                                <TextInput
                                    id="test2"
                                    invalidText="A valid value is required"
                                    placeholder="Email"
                                    style={{marginBottom:"0.5em"}}
                                    type="email"
                                    name="email"
                                    value= {this.state.email}
                                    onChange = {this.handleChange}
                                    invalid={false}
                                />
                                <TextInput.PasswordInput 
                                    hidePasswordLabel="Hide password"
                                    id="test"
                                    invalidText="A valid value is required"
                                    placeholder="Password"
                                    name="password"
                                    value= {this.state.password}
                                    onChange = {this.handleChange}
                                />
                                <Button
                                    style={{marginTop:"1em"}}
                                    kind="primary"
                                    tabIndex={0}
                                    type="submit"
                                    onClick={this.handleClick}
                                >
                                   Login
                                </Button>
                            </Form>
                            
                        </div>
                    </Col>
                    }
                </Row>
            </Container>
        )
    }
}

export default withRouter(Login)