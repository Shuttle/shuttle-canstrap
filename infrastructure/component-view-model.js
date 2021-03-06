import { DefineMap } from 'can';
import options from './options';
import security from './security';
import click from './click';
import i18n from './i18n';
import { Reflect } from 'can';
import { ErrorList } from './validation';

export default DefineMap.extend({
    placeholder: {
        type: 'string',
        default: '',
        get: function (value) {
            return i18n.value(value);
        }
    },
    focus: {
        type: 'boolean',
        default: false
    },
    click: {
        type: 'observable'
    },
    checked: {
        type: 'boolean'
    },
    value: {
        type: '*'
    },
    label: {
        type: 'string',
        get: function (value) {
            return i18n.value(value);
        }
    },
    errorAttribute: {
        type: 'string',
        default: ''
    },
    errors: {
        Type: ErrorList,
    },
    validationMessage: {
        type: 'string',
        default: '',
        get(value) {
            var self = this;
            var message = undefined;

            if (this.errors) {
                Reflect.each(this.errors, function (error) {
                    if (error.related.indexOf(self.errorAttribute) > -1) {
                        message = error.message;
                        return false;
                    }

                    return true;
                });
            }

            return message || value;
        }
    },
    working: {
        type: 'boolean'
    },
    permission: {
        type: 'string',
        default: ''
    },
    context: {
        type: '*'
    },
    elementClass: {
        type: 'string',
        default: ''
    },
    visible: {
        type: 'boolean',
        default: true
    },
    visibilityClass: {
        get: function () {
            var visible = this.visible;

            return visible != undefined && !visible ? 'invisible' : '';
        }
    },
    iconClass: {
        type: 'string',
        default: '',
        get: function (value) {
            return value || options.iconClass || 'fa';
        }
    },
    iconNameClass: {
        type: 'string',
        default: '',
        get: function (value) {
            return value || '';
        }
    },
    iconSpacingClass: {
        type: 'string',
        get: function (value) {
            return value || options.iconSpacingClass;
        }
    },
    formGroupClass: {
        type: 'string'
    },
    text: {
        type: 'string',
        default: '',
        get: function (value) {
            return i18n.value(value);
        }
    },
    disabled: {
        get(value) {
            var disabled = !!value || !!this.working;

            if (this.permission && !disabled) {
                disabled = !security.hasPermission(this.permission);
            }

            return disabled;
        }
    },
    isDisabled() {
        var result = this.disabled || !!this.working;

        if (this.permission && !result) {
            result = !security.hasPermission(this.permission);
        }

        return result;
    },
    required: {
        type: 'boolean',
        default: false
    },
    hasErrors: function () {
        if (!this.errors) {
            return false;
        }

        return !!this.errors();
    },
    _click: function (ev) {
        return click.on(this, ev);
    }
});

