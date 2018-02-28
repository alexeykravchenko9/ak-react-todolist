import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { TimelineLite, TweenLite } from 'gsap';

import Styles from './styles';

export default class Task extends Component {
    static propTypes = {
        content:        PropTypes.string.isRequired,
        id:             PropTypes.number.isRequired,
        completeTask:   PropTypes.func,
        editTask:       PropTypes.func,
        pinTask:        PropTypes.func,
        priority:       PropTypes.bool,
        removeTask:     PropTypes.func,
        status:         PropTypes.string,
        unCompleteTask: PropTypes.func
    };

    static defaultProps = {
        completeTask: '',
        pinnedTask:   '',
        maxValueText: false
    };


    constructor () {
        super();

        this.handleChangeCompleted = ::this._handleChangeCompleted;
        this.handleRemoveTask = ::this._handleRemoveTask;
        this.handleEditTask = ::this._handleEditTask;
        this.handleEditingProcess = ::this._handleEditingProcess;
        this.handlePinTask = ::this._handlePinTask;

    }


    state = {
        editingTask:  '',
        contentState: ''
    };

    _handleChangeCompleted () {

        const { id, priority, status, content } = this.props;

        if (status === 'checked') {

            this.props.unCompleteTask(id, priority, status, content);

        } else {

            this.props.completeTask(id, priority, status, content);

        }
    }

    _handleEditTask (event) {
        event.preventDefault();
        const { editingTask, contentState } = this.state;
        const { id, priority, status, content } = this.props;

        if (!editingTask) {
            this.setState({
                editingTask:  true,
                contentState: content
            });
        } else if (contentState !== '') {
            this.props.editTask(id, priority, status, contentState);
            this.setState({
                editingTask:  false,
                contentState: ''
            });
        } else {
            this.setState({
                editingTask: true

            });
        }
    }

    _handlePinTask (event) {
        event.preventDefault();

        const { id, priority } = this.props;

        if (!priority) {
            this.props.pinTask(id, true);
        } else {
            this.props.pinTask(id, false);
        }

    }

    _handleEditingProcess (event) {
        if (event.target.value.length < 30) {
            this.setState({
                contentState: event.target.value
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


    _handleRemoveTask (event) {
        event.preventDefault();

        this.props.removeTask(this.props.id);
    }


    render () {
        let classes = Styles.buttonArea__pin;
        let classComl = '';
        let editingClass = '';
        let contentNone = '';
        let validationMessage = Styles.Validation;

        const { content, priority, status, id } = this.props;
        const { contentState, maxValueText, editingTask } = this.state;

        if (priority) {
            classes = [Styles.pinned, Styles.buttonArea__pin].join(' ');
        }

        if (status === 'checked') {
            classComl = Styles.completedTask;
        }

        if (editingTask) {
            editingClass = Styles.editingActive;
            contentNone = Styles.ContentNone;
        }

        if (maxValueText && editingTask) {
            validationMessage = [Styles.Validation, Styles.Show].join(' ');
        }

        return (<section className = { Styles.Task }>
            <form className = { classComl } >

                <label className = { Styles.container } htmlFor = { id } >
                    <input
                        checked = { status }
                        id = { id }
                        type = 'checkbox'
                        onChange = { this.handleChangeCompleted }
                    />
                    <span className = { Styles.checkmark } />
                </label>

                <div className = { Styles.TaskText } >
                    <div className = { contentNone } >{ content }</div>
                    <textarea
                        className = { editingClass }
                        id = ''
                        name = 'taskText'
                        value = { contentState }
                        onChange = { this.handleEditingProcess }
                    />
                    <span className = { validationMessage } >Max length 30 characters</span>
                </div>
                <div className = { Styles.buttonArea }>
                    <button
                        className = { classes }
                        title = 'Pin'
                        onClick = { this.handlePinTask }
                    />

                    <button
                        className = { Styles.buttonArea__edit }
                        title = 'Edit'
                        onClick = { this.handleEditTask }
                    />

                    <button
                        className = { Styles.buttonArea__remove }
                        title = 'Remove'
                        onClick = { this.handleRemoveTask }
                    />

                </div>

            </form>
        </section>);
    }
}
