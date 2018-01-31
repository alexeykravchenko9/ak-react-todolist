import React, { Component } from 'react';

// Styles
import Styles from './styles';


import SearchForm from '../../components/SearchForm';
import MainFeed from '../../components/MainFeed';

export default class TodoApp extends Component {
    render () {
        return (
            <section className = { Styles.todoApp }>

                <div className = { Styles.todoApp_header }>

                    <h1>To Do List</h1>

                    <SearchForm />

                </div>

                <MainFeed />


            </section>
        );
    }
}
