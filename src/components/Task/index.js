import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Styles from './styles';

export default class Task extends Component {
    constructor () {
        super();

        this.handleChangeCompleted = ::this._handleChangeCompleted;
    }

    static propTypes = {
        id:           PropTypes.number.isRequired,
        content:      PropTypes.string.isRequired,
        priority:     PropTypes.bool,
        completed:    PropTypes.bool,
        completeTask: PropTypes.func
    };

    static defaultProps = {
        completeTask: ''
    }

    state = {
        completedStatus: ''
    };

    _handleChangeCompleted (event) {
        event.target
        if( this.state.completedStatus == 'checked' ){
            this.setState({ completedStatus: '' });
            this.props.completeTask('');

        } else {
            this.setState({ completedStatus: 'checked' });
            this.props.completeTask(this.props.id);
        }




    }

    render () {

        const { content, priority, completed, id } = this.props;

        let classes;

        if (priority) {
            classes = [Styles.pinned, Styles.buttonArea__pin].join(' ');
        } else {
            classes = Styles.buttonArea__pin;
        }

        let taskStatus;

        if (completed) {
            taskStatus = 'checked';
        } else {
            taskStatus = '';
        }

        return (
            <section className = { Styles.Task }>
                <form action = ''>

                    <label className = { Styles.container } htmlFor = { id } >
                        <input id = { id } onChange = { this.handleChangeCompleted } checked = { this.state.completedStatus } type = 'checkbox' />
                        <span className = { Styles.checkmark } />
                    </label>

                    <div className = { Styles.TaskText } >
                        { content }
                        <textarea
                            id = ''
                            name = 'taskText'
                            value = { content }
                            disabled
                        />
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
                        />

                        <button
                            className = { Styles.buttonArea__remove }
                            title = 'Remove'
                        />

                    </div>

                </form>
            </section>
        );
    }
}
