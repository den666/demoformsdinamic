/**
 * Created by dennis on 1/12/16.
 */

import ReduxConstants from './ReduxConstants'

const forms = [
    {
        role: ReduxConstants.Roles.TYPE_A,
        route: ReduxConstants.Routes.USERS_ADD_TYPE_A,
        userFormFields:[
            {   labels: ReduxConstants.DataKeys.NAME,
                inputClass: 'InputBox',
                required: true,
                number: false,
                email: false,
                itemMaxLength: "30",
                itemLength: false,
                placeholder: "Ingrese su nombre",
                error: "El Campo Nombre es Obligatorio"
            },
            {   labels: ReduxConstants.DataKeys.COUNTRIE,
                inputClass: 'SelectDropDown',
                required: true,
                placeholder: "Seleccione el país",
                children: ReduxConstants.DataKeys.CITY,
                catalogProvider: ReduxConstants.FormActions.GET_COUNTRIES
            },
            {   labels: ReduxConstants.DataKeys.CITY,
                inputClass: 'SelectDropDown',
                required: true,
                placeholder: "Seleccione una ciudad",
                children: ReduxConstants.DataKeys.SECTOR,
                catalogProvider: ReduxConstants.FormActions.GET_COUNTRIES
            },
            {   labels: ReduxConstants.DataKeys.SECTOR,
                inputClass: 'SelectDropDown',
                required: true,
                placeholder: "Seleccione un sector",
                catalogProvider: ReduxConstants.FormActions.GET_COUNTRIES
            }
        ] ,
        userFormEndPoint: "/url1"
    },
    {
        role: ReduxConstants.Roles.TYPE_B,
        route: ReduxConstants.Routes.USERS_ADD_TYPE_B,
        userFormFields:[
            {   labels: ReduxConstants.DataKeys.NAME,
                inputClass: 'InputBox',
                required: true,
                number: false,
                email: false,
                itemMaxLength: "30",
                itemLength: false,
                placeholder: "Ingrese su nombre",
                error: "El Campo Nombre es Obligatorio"
            },
            {   labels: ReduxConstants.DataKeys.COUNTRIE,
                inputClass: 'SelectDropDown',
                required: true,
                placeholder: "Seleccione el país",
                children: ReduxConstants.DataKeys.CITY,
                catalogProvider: ReduxConstants.FormActions.GET_COUNTRIES
            },
            {   labels: ReduxConstants.DataKeys.CITY,
                inputClass: 'SelectDropDown',
                required: true,
                placeholder: "Seleccione una ciudad",
                children: ReduxConstants.DataKeys.SECTOR,
                catalogProvider: ReduxConstants.FormActions.GET_COUNTRIES
            },
            {   labels: ReduxConstants.DataKeys.SECTOR,
                inputClass: 'SelectDropDown',
                required: true,
                placeholder: "Seleccione un sector",
                catalogProvider: ReduxConstants.FormActions.GET_COUNTRIES
            }
        ] ,
        userFormEndPoint: "/url1"
    }
];

export default {
    forms : forms
};

