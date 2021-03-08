import React from "react"
import {
    withRouter
  } from "react-router-dom"
import {Dropdown, Loading, Tabs, Tab} from 'carbon-components-react'
import axios from 'axios'
import {Container, Row} from 'react-bootstrap'
import {
    BrowserView,
    MobileView,
} from "react-device-detect";
import back from './../../assets/background3.jpg'


  class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            selected: "Select Channel",
            channelList: [],
            loading: true,
            code:"",
            playlists:[]
        }
    }

    componentDidMount(){
        // console.log(access_token)
        // console.log(this.props.location.state.user)
        if(!this.props.location.state){
            alert("Please Login to continue")
            this.props.history.push({
                pathname:'/login',
                state:{ reload:true }
            })
        } else {
            const access_token = this.props.location.state.access_token?this.props.location.state.access_token:""
            if(Object.keys(access_token).length !== 0){
                // console.log(access_token)
                this.setState({code: access_token})
                const headers = {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "*"
                }
                axios.get('https://api.video.ibm.com/users/self/channels.json',{headers:headers}).then(res=>{
                    // console.log(res)
                    this.setState({loading:false, channelsData: res.data.channels, headers})
                    const arr = Object.values(res.data.channels)
                    // console.log(arr)
                    const items = arr.map(item=>{
                        return({
                            id: item.id,
                            text: item.title
                        })
                    })
                    this.setState({channelList: items})
                    // console.log(items)
                })
            } else {
                console.log("nope")
            }
        }
    }

    onChange = async (e)=>{
        console.log(e)
        this.setState({loading: true, selected: e.selectedItem.text, selectedItem: e.selectedItem})

        await axios.get(`http://${window.location.hostname}:${window.location.port}/fetchPlaylists/?id=${e.selectedItem.id}`)
        .then(res=>{
            console.log(Object.keys(res.data))
            console.log(res.data["0"])
            const arr = Object.values(res.data.playlists)
                const items = arr.map(item=>{
                    return({
                        id: item.id,
                        text: item.title
                    })
                })
                console.log("playlists", items)
                this.setState({playlists: items})
        })
        .catch(err=>{
            console.log("nopr" ,err)
            console.log(this.state.playlists)
        })

        this.setState({loading: false})
    }

    showPlaylists = ()=>{
        const arr = this.state.playlists.map(item=>{
            return(
                <Tab label={item.text}>
                    <BrowserView>
                        <div className="some-content">
                            <iframe src={`https://video.ibm.com/combined-embed/playlist/${item.id}`} style={{border: "0", padding:"0",backgroundColor:"white"}} webkitallowfullscreen allowFullScreen frameBorder="no" width="1040" height="405" referrerPolicy="no-referrer-when-downgrade"></iframe>                     
                        </div>
                    </BrowserView>
                    <MobileView>
                        <div className="some-content"
                        style={{paddingTop:"56.25%", position:"relative", overflow:"hidden", display:"block", height:"auto", width: "100%"}}
                        >
                            <iframe src={`https://video.ibm.com/combined-embed/playlist/${item.id}`} style={{border: "0", padding:"0",backgroundColor:"white", position:"relative"}} webkitallowfullscreen allowFullScreen frameBorder="no" width="100%" height="auto" referrerPolicy="no-referrer-when-downgrade"></iframe>                     
                        </div>
                    </MobileView>
                </Tab>
            )
        })
        return arr
    }

    render(){

        return (

            <Container fluid={true} 
                style={{display:"flex", 
                    clear:"both", 
                    justifyContent: "center",
                    minHeight:"100vh", 
                    overflow:"scroll", 
                    padding:"1rem",
                    backgroundImage: `url(${back})`, 
                    // backgroundPositionX:"350px", 
                    backgroundSize: 'cover',
                    alignItems: "center"}}>
                <Row className="justify-content-md-center">
                {
                    this.state.loading?
                    <Loading
                        style={{align: 'center'}}
                        description="Active loading indicator" withOverlay={false}
                    />
                    :
                    <div className="bx--grid bx--grid--full-width landing-page" >
                        <div className="bx--row landing-page__banner">
                            <h1 style={{color:"white"}}>
                                <strong>E-Learning Portal using Watson Media</strong>
                            </h1>
                        </div>
                        <div className="bx--row landing-page__r2">
                            <div className="bx--col bx--no-gutter">
                                <div className="bx--grid bx--grid--no-gutter bx--grid--full-width" style={{}}>
                                    <div className="bx--row landing-page__tab-content">
                                        <div className="bx--col-md-4 bx--col-lg-7">
                                            <div style={{ maxWidth: 400 }}>
                                                <Dropdown
                                                    id="default"
                                                    titleText="Channel List"
                                                    // helperText="This is some helper text"
                                                    label= {this.state.selected}
                                                    items={this.state.channelList}
                                                    itemToString={(item) => (item ? item.text : '')}
                                                    onChange={this.onChange}
                                                />
                                            </div><br/>        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bx--row landing-page__r3">
                            <div className="bx--col-md-4 bx--col-lg-8">
                                    {
                                        this.state.selected === "Select Channel"?
                                        <p></p>
                                        :
                                        <div>
                                            <div className='tabs-story-wrapper' >
                                                <Tabs backgroundColor="white" style={{paddingLeft:"2rem"}}
                                                type="container">
                                                    <Tab label="Videos">
                                                        <div>
                                                        <iframe src={`https://video.ibm.com/combined-embed/${this.state.selectedItem.id}/?social=0&videos=tab` } style={{border: "0", padding:"0",backgroundColor:"white"}} webkitallowfullscreen allowFullScreen frameBorder="no" width="1040" height="405" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                                        </div>
                                                    </Tab>
                                                    {
                                                        this.state.playlists.length===0
                                                        ?
                                                            <div></div>
                                                        :
                                                        <Tab label="Playlists" style={{color:"white"}}>
                                                            <Tabs backgroundColor="white" style={{paddingLeft:"1rem"}}
                                                                type="container">
                                                                {this.showPlaylists()}
                                                            </Tabs> 
                                                        </Tab>
                                                    }
                                                    </Tabs>
                                            </div>
                                        </div>
                                    }
                            </div>
                        </div>
                    </div>
                }
                </Row>
            </Container>
          );
    }
}

export default withRouter(Dashboard)