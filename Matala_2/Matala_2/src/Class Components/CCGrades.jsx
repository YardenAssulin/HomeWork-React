import React, { Component } from 'react'

class CCGrades extends Component {
    constructor(props){
        super(props);
        this.state={
            lastName:'',
            firstName: '',
            psychometricGrade: '',
            lastNameError: false,
            firstNameError: false,
            psychometricGradeError: false
        }
    }

    ChangeInput=(event)=>{
        const {name,value}=event.target;
        const errorName=`${name}Error`;

        this.setState({
            [name]:value,
            [errorName]:value// Update error state based on input value
        }

        )
    }

    handleFocus = (event) => {
        const { name, value } = event.target;
        const errorName = `${name}Error`;

        if (value === '') {
            this.setState({
                [errorName]: true // Show error message when input field is empty and focused
            });
        }
    };

    handleBlur = (event) => {
        const { name, value } = event.target;
        const errorName = `${name}Error`;
    
        let errorMessage = '';
    
        if (name === 'psychometricGrade') {
            if (value < 55) {
                errorMessage = "You must try again next year.";
            } else {
                errorMessage = "You can be accepted for studies.";
            }
        }
    
        this.setState({
            [errorName]: false, // Always hide error message when leaving the input field
            errorMessage: errorMessage // Set the appropriate message
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    submitfun=(event)=>{
        event.preventDefault();
        console.log(this.state);
    }

    render() { 
        return (
            <div style={{padding:"20px", margin:"20px", border:"5px solid black"}}>
                <form onSubmit={this.submitfun}> 
                    <h2>Psychometric Form:</h2>
                    {this.state.lastNameError && <p style={{backgroundColor:'red'}}>You Must Enter A Last Name.</p>}
                    <input onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.ChangeInput} style={{width:"200px"}} type="text" name="lastName" placeholder='Insert your Last name'  defaultValue={this.state.lastName}  /><br />
                    {this.state.firstNameError && <p style={{backgroundColor:'red'}}>You Must Enter A First Name.</p>}
                    <input onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.ChangeInput} style={{width:"200px"}} type="text" name="firstName" placeholder='Insert your First name' defaultValue={this.state.firstName}  /><br />
                    {this.state.psychometricGradeError && <p style={{backgroundColor:'red'}}>You Must Enter A Psychometric Grade.</p>}
                    <input onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.ChangeInput} style={{width:"200px"}} type="number" name="psychometricGrade" placeholder='Insert your Psychometric grade' defaultValue={this.state.psychometricGrade}/><br />
                    {this.state.errorMessage && <p style={{backgroundColor:'pink'}}>{this.state.errorMessage}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>            
        );
    }
}
 
export default CCGrades ;