import React, { Component } from 'react'
import Checkbox from '../../Checkbox'
import Input from '../../input'

import './style.scss';

export default class PokemonFilters extends Component{
    constructor(props){
        super(props);
    }


    filter = ($event) => {
        this.props.filterPokemons($event.target)
    }

    clearFilters = () => {
        this.props.clearFilters();
        const chekeds = document.querySelectorAll('[checked]')
        Array.from(chekeds).forEach(el => {
            el.removeAttribute('checked')
        })
    }

    isChecked = (p, flag) => {
        return this.props.filters[flag].includes(p)
    }

    toggleFilters = () => {
        this.props.toggleFilters()
    }


    
    render(){
        return(
            <div className={`pokemon-filters ${this.props.filters.sw ? 'active' : ''}`}>
                <button className='pokemon-filters-toggle' onClick={this.toggleFilters}>
                    {this.props.filters.sw ? 'Close' : 'Show'} filters
                </button>
                <div className='pokemon-filters-content'>
                    <div className='pokemon-filters-header'>
                        <h2>
                            Filter Pokemons
                        </h2>

                        <button onClick={this.clearFilters} className='button'>
                            Clear Filters
                        </button>
                        <Input name="pokemon_name" value={this.props.filters.name} onChange={this.filter} placeholder="Ex: Charmander" label="Pokemon Name:" />
                    </div>

                    <div>
                        <div className='pokemon-filters-types'>
                            <p className='pokemon-filters-label'>
                                Type
                            </p>
                            <ul className='pokemon-filters-list'>
                                {
                                    this.props.types.map((t,i) => (
                                        <li className='pokemon-type' key={i}>
                                            <Checkbox checked={this.isChecked(t.toLowerCase(), 'type')} value={t.toLowerCase()} onChange={this.filter} label={t} name="pokemon_type"/>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <hr></hr>

                        <div className='pokemon-filters-types'>
                            <p className='pokemon-filters-label'>
                                Weaknesses
                            </p>
                            <ul className='pokemon-filters-list'>
                                {
                                    this.props.types.map((t,i) => (
                                        <li className='pokemon-type' key={i}>
                                            <Checkbox checked={this.isChecked(t.toLowerCase(), 'weaknesses')} value={t.toLowerCase()} onChange={this.filter} label={t} name="pokemon_weaknesses" />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}