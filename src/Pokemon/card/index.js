import React, { Component } from 'react';
import './style.scss';

export default class PokemonCard extends Component{
    pokemon = {}
    types = {
        poison: 'https://www.pinpng.com/pngs/m/488-4882963_png-pokemon-psychic-symbol-transparent-png.png',
        grass: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aba1a756-d955-43f6-a2e9-5b7d60406854/d50w40k-75281ddb-5dc8-4eb8-9321-d5c901815eed.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FiYTFhNzU2LWQ5NTUtNDNmNi1hMmU5LTViN2Q2MDQwNjg1NFwvZDUwdzQway03NTI4MWRkYi01ZGM4LTRlYjgtOTMyMS1kNWM5MDE4MTVlZWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yGkym2UfwaoUVHBldwSE9pHM9Y0tgJMSzvVGLEh6HDI'
    }

    pokemonDetail = (p) => {
        this.props.changePokemon(p)
    }

    render(){
        return(
            <button onClick={this.pokemonDetail.bind(this, this.props.pokemon)} className='pokemon-card' data-type={this.props.pokemon.type[0].toLowerCase()}>
                <div className='pokemon-card-header'>
                    <span className='pokemon-num'>
                        {this.props.pokemon.num}
                    </span>
                    <ul className='pokemon-types'>
                        {
                            this.props.pokemon.type.map((t, k) => 
                                <li className='pokemon-type' key={k}>
                                    <p className={t.toLowerCase()}>
                                        <span className='pokemon-type-tip'>{t}</span>
                                    </p>
                                </li>    
                            )
                        }
                    </ul>
                </div>
                <ul className='pokemon-card-evolutions'>
                    {this.props.pokemon.evolutions ? this.props.pokemon.evolutions.map((e, i) => (<li key={i}></li>)) : null}
                </ul>
                <figure className='img'>
                    <img src={this.props.pokemon.img} alt={this.props.pokemon.name} />
                </figure>
                <div className='pokemon-card-info'>
                    <p className='pokemon-card-name'>
                        {this.props.pokemon.name}
                    </p>
                    <div className='pokemon-card-weaknesses'>
                        <ol className='pokemon-weaknesses'>
                            {
                                this.props.pokemon.weaknesses.map((w, i) => (
                                    <li key={i}>
                                        {w}
                                    </li>
                                ))
                            }
                            <li></li>
                        </ol>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-17 1h4v-8h2v8h4l-5 6-5-6z"/></svg>
                    </div>
                </div>
            </button>
        )
            
    }
}