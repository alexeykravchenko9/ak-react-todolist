import React, { Component } from 'react';

// Styles
import Styles from './styles';
import imgIconSearch from '../../theme/assets/icon_search.png';
import imgIconSearch2x from '../../theme/assets/icon_search@2x.png';


export default class SearchForm extends Component {
    render () {
        return (
            <section className = { Styles.todoAppForm }>

                <form action = ''>
                    <input placeholder = { 'Search' } type = 'text' />
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
