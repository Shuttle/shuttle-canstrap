﻿import {Component} from 'can';
import ComponentViewModel from '../infrastructure/component-view-model';
import options from '../infrastructure/options';
import view from './button-submit.stache!';

export const ViewModel = ComponentViewModel.extend({
    elementClass: {
        default: 'btn-primary'
    },
    iconNameClass: {
        type: 'string',
        default: '',
        get: function(value){
            return value || options.button.submit.iconNameClass;
        }
    },
    buttonClass: {
        get(){
            return `btn ${this.elementClass} ${this.visibilityClass}`;
        }
    },
    buttonIconClass: {
        get(){
            return `${this.iconClass} ${this.iconNameClass}${(!!this.text ? ' ' + this.iconSpacingClass : '')}`;
        }
    }
});

export default Component.extend({
    tag: 'cs-button-submit',
    view,
    ViewModel
});