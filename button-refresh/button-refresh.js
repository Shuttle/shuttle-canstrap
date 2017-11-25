﻿import Component from 'can-component';
import view from './button-refresh.stache!';
import ComponentViewModel from '../infrastructure/component-view-model';
import options from '../infrastructure/options';

export const ViewModel = ComponentViewModel.extend({
    iconNameClass: {
        type: 'string',
        get: function(value){
            return value || options.button.refreshIconNameClass;
        }
    }
});

export default Component.extend({
    tag: 'cs-button-refresh',
    ViewModel,
    view
});