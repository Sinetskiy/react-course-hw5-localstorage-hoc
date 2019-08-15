import React, {PureComponent} from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
    state = {
        inputValue: '',
        data: []
    };

    getId() {
        const {savedData} = this.props;
        const biggest = savedData().reduce((acc, el) => Math.max(acc, el.id), 0);
        return biggest + 1;
    }

    handleChange = event => {
        this.setState({inputValue: event.target.value})
    };

    createNewRecordByEnter = event => {
        if (event.key === 'Enter') {
            this.createNewRecord();
        }
    };

    toggleRecordComplete = event => {
        const {savedData, saveData} = this.props;
        const todoId = parseInt(event.target.dataset.todoId);
        let data = savedData();
        data.find(todo => todo.id === todoId).isComplete = !data.find(todo => todo.id === todoId).isComplete;
        saveData(data);
        this.setState(data);
    };

    createNewRecord = () => {
        const {inputValue} = this.state;
        const {saveData, savedData} = this.props;

        saveData([{id: this.getId(), isComplete: false, text: inputValue}, ...savedData()]);
        this.setState({inputValue: ''});
    };

    render() {
        const {inputValue} = this.state;
        const {savedData} = this.props;

        return <Card title={"Список дел"}>
            <div className="todo t-todo-list">
                <div className="todo-item todo-item-new">
                    <input className="todo-input t-input" placeholder="Введите задачу" value={inputValue}
                           onKeyPress={this.createNewRecordByEnter}
                           onChange={this.handleChange}/>
                    <span className="plus t-plus" onClick={this.createNewRecord}>+</span></div>
                {savedData().map(todo => todo ? this.renderRecord(todo) : Todo.renderEmptyRecord())}
            </div>
        </Card>;
    }

    static renderEmptyRecord() {
        return null;
    }

    renderRecord = record => {
        console.log(record);
        return <div className="todo-item t-todo">
            <p className="todo-item__text">{record.text}</p>
            <span className="todo-item__flag t-todo-complete-flag"
                  data-todo-id={record.id} onClick={this.toggleRecordComplete}>[{record.isComplete ? 'x' : ' '}]</span>
        </div>;
    };
}

export default withLocalstorage('todo-app', [])(Todo);
