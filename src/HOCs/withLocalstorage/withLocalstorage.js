import React, {Component} from 'react';
import {load, save} from '../../localstorage';

const withLocalstorage = (localStorageKey, data) => (WrappedComponent) => {
    return class extends Component {

        saveData = () => {
            save(localStorageKey, data);
        };

        savedData = () => {
            load(localStorageKey);
        };

        render() {
            return <WrappedComponent saveData={this.saveData} savedData={this.savedData}/>;
        }
    };
};

export default withLocalstorage;
