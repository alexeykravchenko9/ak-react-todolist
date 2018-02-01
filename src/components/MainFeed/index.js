import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Instruments

// const jsonfile = require('jsonfile');


// Styles
import Styles from './styles';
import Task from '../Task';
import Composer from '../Composer';

export default class MainFeed extends Component {

    constructor () {
        super();

        this.createTask = ::this._createTask;
        this.getTasks = ::this._getTasks;
        this.removeTask = ::this._removeTask;
        this.editTask = ::this._editTask;
        this.completeTask = ::this._completeTask;
        this.unCompleteTask = ::this._unCompleteTask;

    }

    state = {
        tasks: []
    };

    async componentWillMount(){

       await this.getTasks();

       this.interval = setInterval( () => this.getTasks(), 100);

    }

    componentWillUnMount(){
        clearInterval(this.interval);
    }


    async _createTask (priority, status, content) {

        const dateId = new Date();
        const obj = {
            'id': dateId.getTime(),
            priority,
            status,
            content
        };
        const response = await fetch(
            'http://localhost:3004/tasks',
            {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
        );

        if (response.status !== 201) {
            throw new Error('Failed to create new task');
        }

        // const { tasks: db_tasks } = await response.json();
        const inArr = [];

        inArr.push(await response.json());

        // this.setState(({ tasks }) => ({
        //     tasks: [...tasks, ...inArr]
        // }));

        console.log('_createPost', this.state.tasks);

    }

    async _removeTask (id) {
        const response = await fetch(`http://localhost:3004/tasks/${id}`,
            { method: 'DELETE' });
        this.setState( ({tasks}) => ({
           tasks: tasks.filter( (item) => item.id !== id )
        }));
    }


    async _getTasks () {
        const response = await fetch('http://localhost:3004/tasks')
            .then( (response) => (response.json()) )
            .then( (json) => {
                // console.log('getTasks', json[0]);
                const inCome = json;
                let sortedDESC = [];

                for( let i = 0; i < inCome.length; i++){
                    sortedDESC.push( inCome[i] );
                };

                this.setState({ tasks: sortedDESC.reverse() })
            } );
    }

    async _editTask (id, priority, status, content) {
        const response = await fetch(`http://localhost:3004/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                id,
                priority,
                status,
                content
            })
        });

    }


    async _completeTask (id, priority, status, content) {
        const response = await fetch(`http://localhost:3004/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                id,
                priority,
                status: 'checked',
                content
            })

        })
            .then( (response) => response.json())
            .then( (json) => {

            });

    }

    async _unCompleteTask (id, priority, status, content) {
        const response = await fetch(`http://localhost:3004/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                id,
                priority,
                status: '',
                content
            })

        })
            .then( (response) => response.json())
            .then( (json) => {


            });

    }




    // noinspection JSAnnotator
    render () {
        const { tasks } = this.state;

        console.log('check state', tasks);


        const allTasks = tasks.map((item) => (

            <Task
                key = { item.id }
                { ...item }
                editTask = { this.editTask }
                completeTask = { this.completeTask }
                unCompleteTask = { this.unCompleteTask }
                removeTask = { this.removeTask }
            />

        ));


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
