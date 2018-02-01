import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Instruments
import SearchForm from '../SearchForm';
import Task from '../Task';
import Composer from '../Composer';

// Styles
import Styles from './styles';


export default class MainFeed extends Component {
    static contextTypes = {
        api: PropTypes.string.isRequired
    };

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
        tasks:         [],
        tasksNotFound: false,
        searchQuery:   ''
    };

    async componentWillMount () {

        // await this.getTasks( this.state.searchQuery );

        this.interval = setInterval(() => this.getTasks(this.state.searchQuery), 500);

    }

    componentWillUnMount () {
        clearInterval(this.interval);
    }


    async _createTask (priority, status, content) {
        const { api } = this.context;
        const dateId = new Date();
        const obj = {
            'id': dateId.getTime(),
            priority,
            status,
            content
        };
        const response = await fetch(api,
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
        const { api } = this.context;
        const response = await fetch(`${api}/${id}`,
            { method: 'DELETE' });

        this.setState(({ tasks }) => ({
            tasks: tasks.filter((item) => item.id !== id)
        }));
    }


    async _getTasks (searchKey) {
        const { api } = this.context;
        console.log('get get get ', api);
        this.setState({ searchQuery: searchKey });

        const response = await fetch(api);

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
        const { api } = this.context;
        const response = await fetch(`${api}/${id}`, {
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
        const { api } = this.context;
        const response = await fetch(`${api}/${id}`, {
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
        const { api } = this.context;
        const response = await fetch(`${api}/${id}`, {
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

        console.log('check contex', this.context);

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
