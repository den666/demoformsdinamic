/**
 * Created by dennis on 30/11/16.
 */

const LoadingStatus:object = {
    LOADING_ACTIVE: "LOADING_ACTIVE",
    LOADING_INACTIVE: "LOADING_INACTIVE"
};

const Roles:object = {
    TYPE_A: {
        name: "TYPE_A",
        description: "Usuario A",
        id: 1
    },
    TYPE_B: {
        name: "TYPE_B",
        description: "Usuario B",
        id: 2
    }
};


const FormActions:object = {
    GET_COUNTRIES: 'GET_COUNTRIES',
    GET_CITIES: 'GET_CITIES'
};


const DataKeys:object = {
    NAME: {
        singular: 'name',
        plural: 'name',
        singular_label: 'nombre',
        plural_label: 'nombres'
    },
    COUNTRIE: {
        singular: 'countrie',
        plural: 'countries',
        singular_label: 'país',
        plural_label: 'países'
    },
    CITY: {
        singular: 'city',
        plural: 'cities',
        singular_label: 'ciudad',
        plural_label: 'ciudades'
    },
    SECTOR: {
        singular: 'sector',
        plural: 'sector',
        singular_label: 'sector',
        plural_label: 'sectores'
    }
};

const Routes:object = {
    USERS_HOME: '/usuarios',
    USERS_ADD_TYPE_A: '/usuarios/usuario_a',
    USERS_ADD_TYPE_B: '/usuarios/usuario_b'
};

const FormUserActions:object = {
    SET_FORM_ACTIVE_DATA: 'SET_FORM_ACTIVE_DATA'
}

export default{
    LoadingStatus,
    Roles,
    FormActions,
    DataKeys,
    Routes,
    FormUserActions
};