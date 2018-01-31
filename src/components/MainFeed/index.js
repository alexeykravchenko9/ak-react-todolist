import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Instruments
import { addTaskJSON } from '../../helpers/index';
import fs from 'file-system';
// const jsonfile = require('jsonfile');


// Styles
import Styles from './styles';
import Task from '../Task';
import Composer from '../Composer';

export default class MainFeed extends Component {

    constructor () {
        super();

        this.createTask = ::this._createTask;
        this.completeTask = ::this._completeTask;

    }

    state = {
        tasks: []
    };


    _createTask (priority, status, text) {
        const dateId = new Date();
        let obj = {
            id: dateId.getTime(),
            priority,
            status,
            text
        };


        // addTaskJSON(priority, status, text);

        fs.writeFileSync('./data.json', JSON.stringify(obj), (err) => {
            if (err) throw new Error(`Data weren't added to the JSON file`);
            console.log('Data was added!');
        });


        let inc_arr;


        inc_arr = this.state.tasks;

        // console.log(data);
        inc_arr.push([text, priority, status, dateId.getTime()]);

        this.setState(({ tasks }) => ({
            tasks: inc_arr
        }));
    }

    _completeTask (id) {
        let incArr;

        incArr = this.state.tasks;

        // this.setState( ({ tasks }) => ({
        //     tasks: tasks.filter( (item) => ( item[3] !== id ) )
        // }));
    }


    render () {
        const { tasks } = this.state;

        console.log('check state', tasks);
       console.log('check FS var', );

        // const dataJSON = fs.readFileSync('./libraries.json');
        // console.log('check JSONFILE var', dataJSON)

        const allTasks = tasks.map((item, id) => (

            <Task
                key = { id }
                content = { item[0] }
                priority = { item[1] }
                completed = { item[2] }
                id = { item[3] }
                completeTask = { this.completeTask }
            />

        ));

        console.log('check allTasks', allTasks);
        // setInterval( () => { this.forceUpdate() }, 1000);

        return (
            <section className = { Styles.MainFeed }>

                <div className = { Styles.TaskList }>
                    { allTasks }
                </div>


                <Composer createTask = { this.createTask } />
            </section>
        );
    }
}
