import DefineMap from 'can-define/map/';

export const IconNameOption = DefineMap.extend({
    iconNameClass: 'string'
});

export const RemoveButtonI18NOptions = DefineMap.extend({
    removeItemConfirmation: {
        type: 'string',
        default: 'removeItemConfirmation'
    },
    removeItemConfirmationNamed: {
        type: 'string',
        default: 'removeItemConfirmationNamed'
    }
});

export const RemoveButtonOptions = IconNameOption.extend({
    confirmation: { type: '*' },
    i18n: { Type: RemoveButtonI18NOptions }
});

export const ButtonOptions = DefineMap.extend({
    back: {
        Type: IconNameOption,
        default: {
            iconNameClass: 'fa-chevron-left'
        }
    },
    refresh: {
        Type: IconNameOption,
        default: {
            iconNameClass: 'fa-refresh'
        }
    },
    remove: {
        Type: RemoveButtonOptions,
        default: {
            iconNameClass: 'fa-times',
            i18n: {}
        }
    },
    submit: {
        Type: IconNameOption,
        default: {
            iconNameClass: 'fa-arrow-circle-right'
        }
    }
});

export const TableOptions = DefineMap.extend({
    containerClass: {
        type: 'string',
        default: ''
    },
    tableClass: {
        type: 'string',
        default: ''
    },
    buttonClass: {
        type: 'string',
        default: ''
    }
});

export const FormOptions = DefineMap.extend({
    elementClass: {
        type: 'string',
        default: 'form-group'
    }
});

export const Options = DefineMap.extend({
    iconClass: {
        type: 'string',
        default: 'fa'
    },
    iconSpacingClass: {
        type: 'string',
        default: 'pr-2'
    },
    button: {
        Type: ButtonOptions,
        default: {}
    },
    form: {
        Type: FormOptions,
        default: {}
    },
    table: {
        Type: TableOptions,
        default: {}
    }
});

let options = new Options({});

export default options;