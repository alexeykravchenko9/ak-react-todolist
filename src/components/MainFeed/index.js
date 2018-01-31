import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles';
import Task from '../Task';
import Composer from '../Composer';

export default class MainFeed extends Component {
    constructor () {
        super();

        this.createTask = ::this._createTask;
    }

    state = {
        tasks: []
    }


    _createTask (text, priority) {
        let inc_arr;

        inc_arr = this.state.tasks;

        // console.log(data);
        inc_arr.push( [text, priority] );

        this.setState(({ tasks }) => ({
            tasks: inc_arr
        }));
    }


    render () {
        const { tasks } = this.state;

        console.log('check state', tasks);
        const allTasks = tasks.map((item, id) => (

            <Task
                key = { id }
                content = { item[0] }
                status = { item[1] }
            />

        ));

        console.log('check allTasks', allTasks);
        // setInterval( () => { this.forceUpdate() }, 1000);

        return (
            <section className = { Styles.MainFeed }>

                <div className = { Styles.TaskList }>
                    { allTasks }
                </div>


                <Composer createTask = { this.createTask } />
            </section>
        );
    }
}
