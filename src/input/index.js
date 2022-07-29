import React, { Component } from 'react';
import './style.scss';
export default class Input extends Component{

    updated = ($event) => {
        this.props.onChange($event)        
    }

    render(){
        return (
            <div className='input'>
                <label>{this.props.label}</label>
                <input onChange={this.updated} value={this.props.value} type="text" placeholder={this.props.placeholder} name={this.props.name} />
                <span className='input-hint'></span>
                <span className='input-error'></span>
            </div>
        )
    }
}