import React, { Component } from 'react';

// Styles
import Styles from './styles';

import MainFeed from '../../components/MainFeed';

export default class TodoApp extends Component {
    render () {
        return (
            <section className = { Styles.todoApp }>


                <MainFeed />


            </section>
        );
    }
}
