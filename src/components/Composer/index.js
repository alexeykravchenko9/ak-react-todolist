import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import TweenMax from 'gsap';

// Styles
import Styles from './styles';

export default class Composer extends Component {
    static propTypes = {
        createTask:   PropTypes.func,
        doneAllTasks: PropTypes.func
    };

    constructor () {
        super();

        this.handleWriteTask = ::this._handleWriteTask;
        this.handleFormAction = ::this._handleFormAction;
        this.handleDoneAll = ::this._handleDoneAll;
        this.enterButton = ::this._enterButton;
    }

    state = {
        taskText:      '',
        priority:      false,
        completed:     '',
        maxValueText:  false,
        doneAllStatus: ''
    };

    _handleDoneAll () {

        const { doneAllStatus } = this.state;


        if (!doneAllStatus) {
            this.setState({
                doneAllStatus: 'checked'
            });

            this.props.doneAllTasks('doneActive');

        } else {

            this.setState({
                doneAllStatus: ''
            });

            this.props.doneAllTasks('doneDisabled');

        }


    }

    _handleWriteTask (event) {
        if (event.target.value.length < 30) {
            this.setState({
                taskText: event.target.value
            });
        }

        if (event.target.value.length >= 30) {
            this.setState({
                maxValueText: true
            });
        } else {
            this.setState({
                maxValueText: false
            });
        }

    }

    _handleFormAction (event) {
        event.preventDefault();
        const { taskText, priority, completed } = this.state;

        if (taskText) {
            this.props.createTask(priority, completed, taskText);

            this.setState({
                taskText: ''
            });

            this.setState({
                maxValueText: false
            });

        } else {
            this.setState({
                maxValueText: true
            });
        }
    }

    _enterButton (el) {
        TweenMax.fromTo(el, 1, { rotationX: 0 }, { rotationX: 360 });
    }


    render () {
        const { taskText, maxValueText } = this.state;
        console.log('Our composter test build');

        let validationMessage = Styles.Validation;
        let emptyValidation = '';

        if (maxValueText && taskText) {
            validationMessage = [Styles.Validation, Styles.Show].join(' ');
        }

        if (taskText && maxValueText === true) {
            emptyValidation = Styles.emptyValidation;
        }

        return (
            <section className = { Styles.Composer }>
                <hr />
                <form action = '' className = { Styles.doneAll }>
                    <label className = { Styles.container } htmlFor = 'doneAll'>
                        <input id = 'doneAll' type = 'checkbox' onChange = { this.handleDoneAll } />
                        <span className = { Styles.checkmark } />
                        Done All
                    </label>
                </form>

                <form
                    className = { Styles.ComposerForm }
                    onSubmit = { this.handleFormAction }>
                    <input
                        className = { emptyValidation }
                        placeholder = { 'Write here' }
                        type = 'text'
                        value = { taskText }
                        onChange = { this.handleWriteTask }
                    />
                    <span className = { validationMessage } >Max length 30 characters</span>
                    <Transition
                        in
                        appear
                        onEnter = { this.enterButton }
                        timeout = { 100 }>
                        <input type = 'submit' value = { 'Add Task' } />
                    </Transition>
                </form>


            </section>
        );
    }
}
