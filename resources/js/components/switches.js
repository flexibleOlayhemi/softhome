import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import fanOff from './images/fanOff.jpg';
import fanOn from './images/fanOn.jpg';
import bulbOff from './images/bulbOff.jpg';
import bulbOn from './images/bulbOn.jpg';
import fridgeOn from './images/tvOn.jpg';
import fridgeOff from './images/tvOff.jpg';

class Switches extends React.PureComponent{
    constructor(props){
        super(props)

        this.state = {'fan':0,'bulb':0,'fridge':0,'fanOld' : 0,'bulbOld':0,'fridgeOld' :0 };
        this.handleSwitchFan = this.handleSwitchFan.bind(this);
        this.handleSwitchBulb = this.handleSwitchBulb.bind(this);
        this.handleSwitchFridge = this.handleSwitchFridge.bind(this);
        
        
    }
     
    componentDidMount(){
            axios.get('/status').then((response)=>{
             
            //console.log(response.data);
            //console.log(response.data.fan); 
            //console.log(response.data.bulb);
            //console.log(response.data.fridge); 
            this.setState({
                'fan' : response.data.fan,
                'bulb' : response.data.bulb,
                'fridge' : response.data.fridge,
                'fanOld' : response.data.fan,
                'bulbOld' : response.data.bulb,
                'fridgeOld' : response.data.fridge
                
            });
     
        }).catch(error=>{
            console.log(error);
        }).finally(res=>{
            //console.log("!!!State Set");
            
            
        })
    }
    componentDidUpdate(){
        //send request only if any of the switch state changes
        if((this.state.fan != this.state.fanOld) || 
        (this.state.bulb != this.state.bulbOld) ||
        (this.state.fridge != this.state.fridgeOld)  )
        {
                //console.log('One Device as been updated');
                const content ={    
                    'fan' : this.state.fan ,
                    'bulb' : this.state.bulb,
                    'fridge' : this.state.fridge
                };
                axios.post('/api/',content).then(response=>{
                    //console.log(response.data);
                })
                .catch(error=>{
                    console.log(error);
                })
                    //update Old with New value
                this.setState({
                    'fanOld' : this.state.fan,
                    'bulbOld' : this.state.bulb,
                    'fridgeOld' : this.state.fridge
                })
        }
    }
   
    handleSwitchFan(){  
        this.setState({
            'fan' : !this.state.fan 
        });
    }
    handleSwitchBulb(){
        this.setState({
            'bulb' : !this.state.bulb      
        });
        
    }

    handleSwitchFridge(){
        this.setState({
            'fridge' : !this.state.fridge      
        });    
    }

    render(){
        return(
            
            <div>
                <h3 className="alert-success">Iot Switches</h3>
                <Fan Status={this.state.fan} onClick={this.handleSwitchFan}/>Fan Status: <button onClick={this.handleSwitchFan}>{this.state.fan?'ON':'OFF'}</button><br/>
                <Bulb Status={this.state.bulb} onClick={this.handleSwitchBulb}/>Bulb Status: <button onClick={this.handleSwitchBulb}>{this.state.bulb?'ON':'OFF'}</button><br/>
                <Fridge Status={this.state.fridge} onClick={this.handleSwitchFridge} /> Tv Status: <button onClick={this.handleSwitchFridge}>{this.state.fridge?'ON':'OFF'}</button>
                
            </div>

        )
    }
}


function Bulb(props){
    var style ={
        height : '100px',
        width : '100px', 
    }
    return(
        <img src={props.Status ? bulbOn : bulbOff} 
        onClick={props.onClick} alt="Bulb" style={style}/>
    )
}
function Fan(props){
    var style ={
        height : '100px',
        width : '100px'
    }
    return(
        <img src={props.Status ? fanOn : fanOff}
        onClick={props.onClick} alt="Fan" style={style}/>
    )
}

function Fridge(props){
    var style ={
        height : '100px',
        width : '100px'
    }
    return(
        <img src={props.Status ? fridgeOn : fridgeOff} 
        onClick={props.onClick} alt="Fridge" style={style}/>
    )
}

    export default Switches;
    if (document.getElementById('switches')) {
    ReactDOM.render(<Switches/>,document.getElementById('switches'));
    }

