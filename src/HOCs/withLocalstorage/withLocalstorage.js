import React, {Component} from 'react';
import {load, save} from '../../localstorage';

const withLocalstorage = (localStorageKey, data) => (WrappedComponent) => {
    return class extends Component {

        saveData = (data) => {
            save(localStorageKey, data);
        };

        savedData = () => {
            return load(localStorageKey);
        };

        render() {
            return <WrappedComponent saveData={this.saveData} savedData={this.savedData}/>;
        }
    };
};

export default withLocalstorage;
