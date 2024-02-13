import React, { Component } from 'react'

class CCColors  extends Component {
    constructor(props){
        super(props)
        this.state={
            backgroundColor: "white",
            buttonColor: "white"
        }
    }

    changeColor = (color) => {
        this.setState({ backgroundColor: color });
        this.setState({buttonColor:color})
      }

    render() { 
        return (
            <div style={{backgroundColor:this.state.backgroundColor,padding:"20px",margin:"20px",border:"5px solid black"}}>
                <h2>Color Buttons:</h2>
                <button onClick={()=>this.changeColor('red')} style={{backgroundColor:this.state.buttonColor}}>Red</button>
                <button onClick={()=>this.changeColor('blue')} style={{backgroundColor:this.state.buttonColor}}>Blue</button>
                <button onClick={()=>this.changeColor('green')} style={{backgroundColor:this.state.buttonColor}}>Green</button>
                <button onClick={()=>this.changeColor('yellow')} style={{backgroundColor:this.state.buttonColor}}>Yellow</button>
                <button onClick={()=>this.changeColor('orange')} style={{backgroundColor:this.state.buttonColor}}>Orange</button>
                <button onClick={()=>this.changeColor('purple')} style={{backgroundColor:this.state.buttonColor}}>Purple</button>
                <button onClick={()=>this.changeColor('pink')} style={{backgroundColor:this.state.buttonColor}}>Pink</button>
                <button onClick={()=>this.changeColor('brown')} style={{backgroundColor:this.state.buttonColor}}>Brown</button>
            </div>
        );
    }
}
 
export default CCColors ;