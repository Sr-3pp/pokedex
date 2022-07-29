import React, { Component } from 'react';

export default class Radio extends Component{
    render(){
        return(
            <div className='radio'>
                <input type="radio" name={this.props.name} value={this.props.value} />
                <span className='radio-box'></span>
                <span className='radio-label'>{this.props.label}</span>
            </div>
        )
    }
}