import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles';
import MainFeed from '../../components/MainFeed';

const globalOptions = {
    api: 'http://localhost:3006/tasks'
}

export default class TodoApp extends Component {
    static childContextTypes = {
      api: PropTypes.string.isRequired
    };

    getChildContext (){
        return globalOptions;
    }


    render () {

        console.log( globalOptions );
        return (
            <section className = { Styles.todoApp }>


                <MainFeed />


            </section>
        );
    }
}
