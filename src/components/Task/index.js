import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Styles from './styles';

export default class Task extends Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        priority: PropTypes.bool
    };



    render () {

        const { content, status } = this.props;
        let classes;
        if (status == true){
            classes = [Styles.pinned, Styles.buttonArea__pin ].join(' ');
        } else {
            classes = Styles.buttonArea__pin;
        }
        return (
            <section className = { Styles.Task }>
                <form action = ''>

                    <label className = { Styles.container } htmlFor = 'taskStatus'>
                        <input id = 'taskStatus' type = 'checkbox' />
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
