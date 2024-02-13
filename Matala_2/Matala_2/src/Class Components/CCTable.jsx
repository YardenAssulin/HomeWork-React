import React, { Component } from 'react';

class TableSize2x3 extends Component {

    constructor(props){
        super(props)
        this.state={
            tableWidth:'100%',
        }
    }

    changeWidth1=()=>{
        this.setState({
            tableWidth:'50%'
         });
    }

    changeWidth2=()=>{
        this.setState({
            tableWidth:'100%'  
          });
    }

    render() {
        const {tableWidth}=this.state;
        return (
            <div style={{padding:"20px", margin:"20px", border:"5px solid black"}}>
                <h2>Table:</h2>
                <table onDoubleClick={this.changeWidth2} onClick={this.changeWidth1} style={{ borderCollapse: 'collapse',width: tableWidth}}>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Row 1, Column 1</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Row 1, Column 2</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Row 1, Column 3</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Row 2, Column 1</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Row 2, Column 2</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Row 2, Column 3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableSize2x3;
