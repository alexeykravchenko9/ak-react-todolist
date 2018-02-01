import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Styles from './styles';

export default class Task extends Component {
    constructor () {
        super();

        this.handleChangeCompleted = ::this._handleChangeCompleted;
        this.handleRemoveTask = ::this._handleRemoveTask;
        this.handleEditTask = ::this._handleEditTask;
        this.handleEditingProcess = ::this._handleEditingProcess;


    }

    static propTypes = {
        id:             PropTypes.number.isRequired,
        content:        PropTypes.string.isRequired,
        priority:       PropTypes.bool,
        status:         PropTypes.string,
        completeTask:   PropTypes.func,
        unCompleteTask: PropTypes.func,
        removeTask:     PropTypes.func,
        editTask:       PropTypes.func
    };

    static defaultProps = {
        completeTask: '',
        maxValueText: false
    };



    state = {
        editingTask:'',
        contentState: ''
    };

    _handleChangeCompleted (event) {

        if (this.props.status == 'checked') {

            this.props.unCompleteTask(this.props.id, this.props.priority, this.props.status, this.props.content);

        } else {

            this.props.completeTask(this.props.id, this.props.priority, this.props.status, this.props.content);

        }
    }

    _handleEditTask (event) {
        event.preventDefault();
        const { editingTask, contentState } = this.state;
        const { id, priority, status, content } = this.props;

        if (!editingTask ) {
            this.setState({
                editingTask: true,
                contentState: content
            });
        } else {
            if(contentState !== ''){
                this.props.editTask(id, priority, status, contentState);
                this.setState({
                    editingTask: false,
                    contentState: ''
                });
            } else {
                this.setState({
                    editingTask: true

                });
            }



        }
    }

    _handleEditingProcess(event){
        if ( event.target.value.length < 30) {
            this.setState({
                contentState: event.target.value
            });
        }

        if( event.target.value.length >= 30 ){
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

        const { content, priority, status, id } = this.props;
        const { contentState, maxValueText, editingTask } = this.state;


        let classes;

        if (priority) {
            classes = [Styles.pinned, Styles.buttonArea__pin].join(' ');
        } else {
            classes = Styles.buttonArea__pin;
        }
        let classComl;

        if (status == 'checked') {
            classComl = Styles.completedTask;
        } else {
            classComl = '';
        }

        let editingClass, contentNone;

        if (editingTask) {
            editingClass = Styles.editingActive;
            contentNone = Styles.ContentNone;
        } else {
            editingClass = '';
            contentNone = '';
        }

        let validationMessage;

        if ( maxValueText ) {
            validationMessage = [ Styles.Validation, Styles.Show ].join(' ');
        } else {
            validationMessage = Styles.Validation;
        }



        return (
            <section className = { Styles.Task }>
                <form className = { classComl } >

                    <label className = { Styles.container } htmlFor = { id } >
                        <input
                            id = { id }
                            onChange = { this.handleChangeCompleted }
                            checked = { status }
                            type = 'checkbox'
                        />
                        <span className = { Styles.checkmark } />
                    </label>

                    <div className = { Styles.TaskText } >
                        <div className = { contentNone } >{ content }</div>
                        <textarea
                            id = ''
                            name = 'taskText'
                            value = { contentState }
                            className = { editingClass }
                            onChange = { this.handleEditingProcess }
                        />
                        <span className = { validationMessage } >Max length 30 characters</span>
                    </div>
                    <div className = { Styles.buttonArea }>
                        <button
                            // className = { [Styles.pinned, Styles.buttonArea__pin ].join(' ')}
                            className = { classes }
                            title = 'Pin'
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
            </section>
        );
    }
}
