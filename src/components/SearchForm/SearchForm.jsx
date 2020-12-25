import React, { Component } from 'react';
import './SearchForm.css';


class SearchForm extends Component {
    state = {
        inputMovie: '',
        error: false
    }

    handleChange = (e) => {
        this.setState({ inputMovie: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const resultado = this.state.inputMovie;
        // const API_KEY = '3e62fb2a0d94f7fd5ade1348729a33cf';

        if (resultado === '') {
            this.setState({ error: true });
            return;
        }
        // const API_KEY = '3e62fb2a0d94f7fd5ade1348729a33cf';
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=3e62fb2a0d94f7fd5ade1348729a33cf&language=es-ES&query=${resultado}`)
            .then(res => res.json())
            .then(data => {
                let search = data.results[0]
                if (search === undefined) {
                    this.setState({ error: true });
                    console.log('error');
                    return
                } else {
                    this.props.renderResults(search)
                    this.setState({ error: false })
                }
            })
    }

    render() {
        const { error } = this.state;
        return (
            <div>
                {error ? <small>Sin resultados</small>
                    : null}
                <form className="busqueda" onSubmit={this.handleSubmit} >
                    <div className="field has-addons">
                        <div className="control">
                            <input className="input" type="text" placeholder="Search..." onChange={this.handleChange}
                            value={this.state.inputMovie} />
                        </div>
                        <div className="control">
                            <button className="button is-info">
                                Search
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchForm;