import React, { Component } from 'react';
import PropType from 'prop-types';

// Styles
import Styles from './styles';
import imgIconSearch from '../../theme/assets/icon_search.png';
import imgIconSearch2x from '../../theme/assets/icon_search@2x.png';


export default class SearchForm extends Component {
    static propTypes = {
        getTasks: PropType.func
    };
    constructor () {
        super();

        this.handleSearchQuery = ::this._handleSearchQuery;
        this.handleSubmitSearch = ::this._handleSubmitSearch;

    }


    state = {
        query: ''
    };

    _handleSearchQuery (event) {


        this.setState({
            query: event.target.value
        });


        if (event.target.value) {
            this.props.getTasks('');
        }


    }

    _handleSubmitSearch (event) {
        event.preventDefault();

        this.props.getTasks(this.state.query);
    }

    render () {

        const { query } = this.state;

        return (
            <section className = { Styles.todoAppForm }>

                <form onSubmit = { this.handleSubmitSearch } >
                    <input
                        placeholder = { 'Search' }
                        type = 'text'
                        value = { query }
                        onChange = { this.handleSearchQuery }
                    />
                    <button type = 'submit' value = { 'submit' } >
                        <img
                            alt = ''
                            src = { imgIconSearch }
                            srcSet = { imgIconSearch2x }
                        />
                    </button>
                </form>

            </section>
        );
    }
}
