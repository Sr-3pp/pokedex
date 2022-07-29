import React, { Component } from 'react';

import './style.scss'

export default class Checkbox extends Component{
    updated = ($event) => {
        this.props.onChange($event)
    }
    render(){
        return(
            <label className='checkbox'>
                <input type="checkbox" checked={this.props.checked} onChange={this.updated} name={this.props.name} value={this.props.value} />
                <span className='checkbox-box'></span>
                <span className='checkbox-label'>{this.props.label}</span>
            </label>
        )
    }
}