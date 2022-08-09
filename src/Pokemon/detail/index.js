import React, { Component } from 'react';
import PokemonCard from '../card';
import './style.scss'
export default class PokemonDetails extends Component{
    closeDetail = () => {
        this.props.closeDetail()
    }

    changePokemon = (p) => {
        console.log(p);
        this.props.changePokemon(p)
    }

    render(){
        return (
            <div className={`pokemon-detail ${this.props.active ? 'active' : ''}`}>
                <div data-type={this.props.pokemon.type ? this.props.pokemon.type[0].toLowerCase() : null} className='pokemon-detail-content'>
                    <button className='pokemon-detail-close' onClick={this.closeDetail.bind(this)}>
                    ×
                    </button>
                    <div className='pokemon-detail-main'>
                        <div className='pokemon-detail-header'>
                            <span>{this.props.pokemon.num}</span>
                            <p className='pokemon-detail-name'>
                                {this.props.pokemon.name}
                            </p>
                            <ul className='pokemon-types'>
                                {
                                    this.props.pokemon.type ? this.props.pokemon.type.map((t, k) => 
                                        <li className='pokemon-type' key={k}>
                                            <p className={t.toLowerCase()}>
                                                <span className='pokemon-type-tip'>{t}</span>
                                            </p>
                                        </li>    
                                    ) : null
                                }
                            </ul>
                        </div>
                        <figure className='img'>
                            <img src={this.props.pokemon.img} alt={this.props.pokemon.name} />
                        </figure>
                        <hr />
                        <ul className='pokemon-detail-details'>
                            <li className='pokemon-info-item'>
                                <p>
                                    <span>Weight:</span> {this.props.pokemon.weight}
                                </p>
                            </li>
                            <li className='pokemon-info-item'>
                                <p>
                                    <span>Height:</span> {this.props.pokemon.height}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className='pokemon-detail-info'>
                        <ul className='pokemon-detail-info-list'>
                            {
                                this.props.pokemon.evolutions ? 
                                    <li className='pokemon-detail-info-item evolutions'>
                                        <span>Evolutions:</span> { this.props.pokemon.evolutions ?this.props.pokemon.evolutions.map((p,i) => (
                                            <PokemonCard changePokemon={this.changePokemon} pokemon={p} key={i} />
                                        )) : null}
                                    </li>:
                                null
                            }
                            <li className='pokemon-detail-info-item weaknesses'>
                                <span>Weaknesses:</span> { this.props.pokemon.weaknesses ? 
                                    <ul className='pokemon-types'>
                                        {
                                            this.props.pokemon.weaknesses.map((t,i) => (
                                                <li className='pokemon-type' key={i}>
                                                    <p className={t.toLowerCase()}>
                                                        <span className='pokemon-type-tip'>{t}</span>
                                                    </p>
                                                    <span>{t}</span>
                                                </li>  
                                            ))
                                        }
                                    </ul>
                                    : null
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                <button onClick={this.closeDetail.bind(this)} className='pokemon-detail-backdrop'></button>
            </div>
        )
    }
}