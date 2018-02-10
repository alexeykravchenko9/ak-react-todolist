import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Instruments
import SearchForm from '../SearchForm';
import Task from '../Task';
import Composer from '../Composer';
import { createTask, removeTask, getTasks, editTask, completeTask, unCompleteTask } from '../../helpers/grud';

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
        this.pinTask = ::this._pinTask;
        this.completeTask = ::this._completeTask;
        this.unCompleteTask = ::this._unCompleteTask;
        this.doneAllTasks = ::this._doneAllTasks;
    }


    state = {
        tasks:         [],
        tasksNotFound: false,
        searchQuery:   ''
    };

    async componentWillMount () {
        await this.getTasks(this.state.searchQuery);
    }

    async _createTask (priority, status, content) {
        const { api } = this.context;

        try {

            await createTask(priority, status, content, { api });

            await this.getTasks(this.state.searchQuery);

        } catch ({ err }) {
            console.log('_createTask', err);
        }

    }

    async _removeTask (id) {
        const { api } = this.context;

        await removeTask(id, { api });

        this.setState(({ tasks }) => ({
            tasks: tasks.filter((item) => item.id !== id)
        }));

        this.getTasks(this.state.searchQuery);
    }

    async _getTasks (searchKey) {
        const { api } = this.context;

        this.setState({ searchQuery: searchKey });

        const data = await getTasks(api);

        const inCome =  await data.json();
        const sortedDESC = [];

        for (let i = 0; i < inCome.length; i++) {
            sortedDESC.push(inCome[i]);
        }

        const toLowerSearch = (content) => {

            const matchArray = content.match(/\w/g);

            return matchArray.join('').toLowerCase();

        };


        if (searchKey) {

            const searchArr = sortedDESC.filter((item) => toLowerSearch(item.content).indexOf(toLowerSearch(searchKey)) !== -1 ? item : '');

            searchArr.length === 0
                ? this.setState({ tasksNotFound: true, tasks: []})
                : this.setState({ tasks: searchArr, tasksNotFound: false });

        } else {
            this.setState({ tasks: sortedDESC.reverse() });
        }

    }

    async _pinTask (id, priority) {

        await this.editTask(id, priority);

    }


    async _editTask (id, priority, status, content) {
        const { api } = this.context;

        await editTask({ id, priority, status, content }, { api });

        this.getTasks(this.state.searchQuery);

    }


    _doneAllTasks (doneStatus) {
        const { tasks } = this.state;

        const responseDone = () => {
            tasks.forEach((item) => {
                const { id, status } = item;

                if (doneStatus === 'doneActive') {

                    if (status !== 'checked') {

                        this.completeTask(id);
                    }

                } else {
                    console.log('doneDisable', item);
                    this.unCompleteTask(id);
                }

            });


        };

        setTimeout(responseDone, 800);

    }

    async _completeTask (id) {
        const { api } = this.context;

        await completeTask(id, api);

        this.getTasks(this.state.searchQuery);

    }


    async _unCompleteTask (id) {
        const { api } = this.context;

        await unCompleteTask(id, api);

        this.getTasks(this.state.searchQuery);

    }


    // noinspection JSAnnotator
    render () {
        const { tasks, tasksNotFound } = this.state;
        let noTasksMessages  = '';

        if (tasksNotFound) {
            noTasksMessages = <span className = { Styles.tasksNotFound } >{`There aren't any tasks of your request`}</span>;
        } else {
            noTasksMessages = '';
        }

        console.log('text will replaced'.replace(/text/, '<b>777</b>'));

        const pinnedTasks = tasks.map((pinned) => {

            if (pinned.priority) {
                return (<Task
                    key = { pinned.id }
                    { ...pinned }
                    completeTask = { this.completeTask }
                    editTask = { this.editTask }
                    pinTask = { this.pinTask }
                    removeTask = { this.removeTask }
                    unCompleteTask = { this.unCompleteTask }
                />);
            }

        });

        const allTasks = tasks.map((item) => !item.priority ?
            <Task
                key = { item.id }
                { ...item }
                completeTask = { this.completeTask }
                editTask = { this.editTask }
                pinTask = { this.pinTask }
                removeTask = { this.removeTask }
                unCompleteTask = { this.unCompleteTask }
            /> : '');


        return (
            <section>


                <div className = { Styles.todoApp_header }>

                    <h1>To Do List</h1>

                    <SearchForm getTasks = { this.getTasks } />

                </div>

                <section className = { Styles.MainFeed }>


                    <div className = { Styles.TaskList }>
                        { pinnedTasks }

                        { allTasks }

                        { noTasksMessages }
                    </div>

                    <Composer createTask = { this.createTask } doneAllTasks = { this.doneAllTasks } />

                </section>


            </section>
        );
    }
}
