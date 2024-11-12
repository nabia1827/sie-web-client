import React from 'react';
import { Routes, Route, Outlet, useParams } from 'react-router-dom';
import RolesAuthRoute from '../../../routes/RolesAuthRoute';
import { Perfiles } from '../../../utils/constants';
function TodosLegajosPage() {

    return (
        <>
            <RolesAuthRoute perfilesAutorizados={[Perfiles.ABOGADO, Perfiles.ADMIN, Perfiles.MESA_PARTES, Perfiles.PROCURADOR]}>
                <Outlet></Outlet>
            </RolesAuthRoute>
        </>
    );

}

export default TodosLegajosPage;