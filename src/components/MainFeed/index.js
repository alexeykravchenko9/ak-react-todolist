import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Instruments
import SearchForm from '../SearchForm';
import Task from '../Task';
import Composer from '../Composer';

// Styles
import Styles from './styles';


export default class MainFeed extends Component {

    constructor () {
        super();

        this.createTask = ::this._createTask;
        this.getTasks = ::this._getTasks;
        this.removeTask = ::this._removeTask;
        this.editTask = ::this._editTask;
        this.completeTask = ::this._completeTask;
        this.unCompleteTask = ::this._unCompleteTask;
        // this.querySearch = ::this._querySearch;
    }

    state = {
        tasks:         [],
        tasksNotFound: false,
        searchQuery:   ''
    };

    async componentWillMount () {

        // await this.getTasks( this.state.searchQuery );

        // this.interval = setInterval(() => this.getTasks(this.state.searchQuery), 5000);

    }

    componentWillUnMount () {
        clearInterval(this.interval);
    }


    // _querySearch(query){
    //
    //     const { tasks } = this.state;
    //     let taskItem;
    //
    //     if ( query !== '' ){
    //         const searchArr = tasks.filter( (item ) => {
    //             if ( item.content.indexOf( query ) !== -1){
    //                 return item;
    //             };
    //         });
    //
    //         ( searchArr.length == 0 )
    //             ? this.setState({ tasksNotFound: true, tasks: [] })
    //             : this.setState({ tasks: searchArr });
    //
    //     } else {
    //         this.getTasks();
    //     }
    // }

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

        const inArr = [];

        inArr.push(await response.json());

        console.log('_createPost', this.state.tasks);

    }

    async _removeTask (id) {
        const response = await fetch(`http://localhost:3004/tasks/${id}`,
            { method: 'DELETE' });

        this.setState(({ tasks }) => ({
            tasks: tasks.filter((item) => item.id !== id)
        }));
    }


    async _getTasks (searchKey) {
        this.setState({ searchQuery: searchKey });

        const response = await fetch('http://localhost:3004/tasks');

        const inCome =  await response.json();
        const sortedDESC = [];

        for (let i = 0; i < inCome.length; i++) {
            sortedDESC.push(inCome[i]);
        }

        console.log('then promise', sortedDESC);


        if (searchKey !== '') {

            const searchArr = sortedDESC.filter((item) => {
                if (item.content.indexOf(searchKey) !== -1) {
                    return item;
                }
            });

            searchArr.length == 0
                ? this.setState({ tasksNotFound: true, tasks: []})
                : this.setState({ tasks: searchArr, tasksNotFound: false });


        } else {
            console.log('else', 'get_Tasks');
            this.setState({ tasks: sortedDESC.reverse() });
        }

    }

    async _editTask (id, priority, status, content) {
        const response = await fetch(`http://localhost:3004/tasks/${id}`, {
            method:  'PUT',
            headers: {
                'Content-type': 'application/json'
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
            method:  'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id,
                priority,
                status: 'checked',
                content
            })

        })
            .then((response) => response.json())
            .then((json) => {

            });

    }

    async _unCompleteTask (id, priority, status, content) {
        const response = await fetch(`http://localhost:3004/tasks/${id}`, {
            method:  'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id,
                priority,
                status: '',
                content
            })

        })
            .then((response) => response.json())
            .then((json) => {


            });

    }


    // noinspection JSAnnotator
    render () {
        const { tasks, tasksNotFound } = this.state;
        let noTasksMessages;

        if (tasksNotFound) {
            noTasksMessages = <span className = { Styles.tasksNotFound } >There aren't any tasks of your request</span>;
        } else {
            noTasksMessages = '';
        }

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
            <section>


                <div className = { Styles.todoApp_header }>

                    <h1>To Do List</h1>

                    <SearchForm getTasks = { this.getTasks } />

                </div>

                <section className = { Styles.MainFeed }>

                    <div className = { Styles.TaskList }>
                        { allTasks }
                        { noTasksMessages }
                    </div>

                    <Composer createTask = { this.createTask } />

                </section>


            </section>
        );
    }
}
