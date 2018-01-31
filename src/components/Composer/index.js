import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles';

export default class Composer extends Component {
    static propTypes = {
        createTask: PropTypes.func
    };

    constructor (){
        super();

        this.handleWriteTask = ::this._handleWriteTask;
        this.handleFormAction = ::this._handleFormAction;
    }

    state = {
        taskText: '',
        priority: false
    };

    _handleWriteTask (event) {
        this.setState({
            taskText: event.target.value
        });
    }

    _handleFormAction(event){
        event.preventDefault();
        this.props.createTask( this.state.taskText, this.state.priority );

        this.setState({
            taskText: ''
        });

    }


    render () {
        const { taskText } = this.state;

        return (
            <section className = { Styles.Composer }>
                <hr />
                <form action="" className = { Styles.doneAll }>
                    <label className = { Styles.container } htmlFor = 'doneAll'>
                        <input id = 'doneAll' type = 'checkbox' />
                        <span className = { Styles.checkmark } />
                        Done All
                    </label>
                </form>

                <form
                    className = { Styles.ComposerForm }
                    onSubmit = { this.handleFormAction }
                >
                    <input
                        placeholder = { 'Write here' }
                        type = 'text'
                        value = { taskText }
                        onChange = { this.handleWriteTask }
                    />
                    <input type = 'submit' value = { 'Add Task' } />
                </form>


            </section>
        );
    }
}
