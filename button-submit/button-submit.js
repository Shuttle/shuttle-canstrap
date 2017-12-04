﻿import Component from 'can-component';
import ComponentViewModel from '../infrastructure/component-view-model';
import options from '../infrastructure/options';
import view from './button-submit.stache!';

export const ViewModel = ComponentViewModel.extend({
    iconNameClass: {
        type: 'string',
        value: '',
        get: function(value){
            return value || options.button.submit.iconNameClass;
        }
    }
});

export default Component.extend({
    tag: 'cs-button-submit',
    view,
    ViewModel
});