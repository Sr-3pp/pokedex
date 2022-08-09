import React, { Component } from 'react';
import PokemonCard from '../card';
import PokemonDetails from '../detail';
import PokemonFilters from '../filters';
import './style.scss';


export default class PokemonList extends Component{
    constructor(props){
        super(props)
        this.state = {
          pokemon: {},
          active: false,
          filters: {
            name:   '',
            type: [],
            weaknesses: [],
            sw: false
          }
        }
    }

    types = []
    pokemons= []
    raw=[]

    componentDidMount(){
        const url = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

        fetch(url).then(res => res.json().then(({pokemon}) => {
            this.raw = [...pokemon]
            pokemon.forEach((p, i, list) => {
                p.type.forEach(t => this.types.includes(t) ? null : this.types.push(t))

                if(p.next_evolution){
                    p.evolutions = p.next_evolution.map((evolution) => {
                        const idx = list.find(fp=> fp.num === evolution.num)
                        if(idx){
                            return idx
                        }
                        return null
                    }).filter(l => l)
                }
            })
            this.pokemons = pokemon
            this.setState(() => ({ filtered: pokemon}));
      }));  
    }


    changePokemon= (p) => {
        if(!p.evolutions && (p.next_evolution || p.prev_evolution)){
            p.evolution = []
            let prevs = []
            let nexts = []
            if (p.prev_evolution) {
                prevs = p.prev_evolution.map(p => {
                    const pok = this.raw.find(po => {
                        return parseInt(po.num) === parseInt(p.num)
                    })
                    if (pok) {
                        return pok
                    }else{
                        return null
                    }
                }).filter(p => p)
            }
            if (p.next_evolution) {
                nexts = p.next_evolution.map(p => {
                    const pok = this.raw.find(po => {;
                        return parseInt(po.num) === parseInt(p.num)
                    })
                    if (pok) {
                        return pok
                    }else{
                        return null
                    }
                }).filter(p => p)
            }

            p.evolutions = [...prevs, ...nexts]
        }
        this.setState({pokemon: p})
        this.setState({active: true})
    }

    closeDetail = () => {
        this.setState({active: false})
    }

    setFilters = (input) => {
        const {value, name} = input
        const filters = this.state.filters
        if(name === "pokemon_name"){
            filters.name = value.toLowerCase()
        }else if(name === "pokemon_type"){
            const idx = filters.type.findIndex(t => t.toLowerCase() === value)
            if(idx >= 0){
                filters.type.splice(idx, 1)
            }else{
                filters.type.push(value)
            }
        }else if(name === "pokemon_weaknesses"){
            const idx = filters.weaknesses.findIndex(t => t.toLowerCase() === value)
            if(idx >= 0){
                filters.weaknesses.splice(idx, 1)
            }else{
                filters.weaknesses.push(value)
            }
        }
        this.setState(filters)
    }

    validateFilters = (p) => {
        const checkList = (ref, list) => {
            if (list.length === 1) {
                const type = ref.find(t => list.includes(t.toLowerCase()))
                return type;
            }else{
                let matches = 0;
                list.forEach(f => {
                    if(ref.find(t => t.toLowerCase() === f.toLowerCase())){
                        matches++
                    }
                })
                return matches === list.length ? true : false
            }
        }

        const types = checkList(p.type, this.state.filters.type)
        const weaknesses = checkList(p.weaknesses, this.state.filters.weaknesses)

        if(!p.name.toLowerCase().includes(this.state.filters.name)){
            return false
        }else if(!types && this.state.filters.type.length){
            return false
        }else if(!weaknesses && this.state.filters.weaknesses.length){
            return false
        }
        return true
    }

    clearFilters = () => {
        const filters = this.state.filters;
        filters.name = '';
        filters.type = [];
        filters.weaknesses = [];

        this.setState(filters)
    }

    toggleFilters = () => {
        const filters = this.state.filters
        filters.sw = !filters.sw
        this.setState(filters)
    }

    render(){
        return (
            <div>
                <button className='button' onClick={this.toggleFilters.bind(this)}>
                    Search Pokemon
                </button>
                <PokemonFilters toggleFilters={this.toggleFilters} filters={this.state.filters} clearFilters={this.clearFilters} filterPokemons={this.setFilters} types={this.types} />
                <ul className="pokemon-list">
                    {
                        this.pokemons.map((p, i) => (
                            this.validateFilters(p) ? 
                            <li className='pokemon-list-item' key={i}>
                                    <PokemonCard changePokemon={this.changePokemon} pokemon={p} />
                            </li>
                            : null
                        ))
                    }
                </ul>
                <PokemonDetails changePokemon={this.changePokemon} active={this.state.active} closeDetail={this.closeDetail} pokemon={this.state.pokemon} />
            </div>
        )
    }
}