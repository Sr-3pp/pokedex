import './App.scss';
import PokemonList from './Pokemon/list';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <figure className='img logo'>
          <img src="https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png" alt="pokedex logo" />
        </figure>
      </header>

      <div className='container'>
        <PokemonList />
      </div>

    </div>
  );
}

export default App;