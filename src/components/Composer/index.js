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
        this.handleDoneAll = ::this._handleDoneAll;
    }

    state = {
        taskText: '',
        priority: false,
        completed: '',
        maxValueText: false
    };

    _handleWriteTask (event) {
        if ( event.target.value.length < 30) {
            this.setState({
                taskText: event.target.value
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

        console.log( event );

    }

    _handleDoneAll(){

    }

    _handleFormAction(event){
        event.preventDefault();

        if( this.state.taskText !== "" ){
            this.props.createTask( this.state.priority,  this.state.completed, this.state.taskText );

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


    render () {
        const { taskText, maxValueText } = this.state;

        let validationMessage, emptyValidation;

        if ( maxValueText && taskText !== "" ) {
            validationMessage = [ Styles.Validation, Styles.Show ].join(' ');
        } else {
            validationMessage = Styles.Validation;
        }

        if ( taskText == "" && maxValueText == true){
            emptyValidation = Styles.emptyValidation;
        } else {
            emptyValidation = "";
        }

        return (
            <section className = { Styles.Composer }>
                <hr />
                <form action="" className = { Styles.doneAll }>
                    <label className = { Styles.container } htmlFor = 'doneAll'>
                        <input id = 'doneAll' type = 'checkbox' onChange = { this.handleDoneAll  } />
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
                        className = { emptyValidation }
                    />
                    <span className = { validationMessage } >Max length 30 characters</span>
                    <input type = 'submit' value = { 'Add Task' } />
                </form>


            </section>
        );
    }
}
