import React from 'react';
import { Routes, Route, Outlet, useParams } from 'react-router-dom';
import RolesAuthRoute from '../../../routes/RolesAuthRoute';
import { Perfiles } from '../../../utils/constants';
function MisLegajosPage() {

    return (
        <>
            <RolesAuthRoute perfilesAutorizados={[Perfiles.ABOGADO,Perfiles.ADMIN]}>
                <Outlet></Outlet>
            </RolesAuthRoute>
        </>
    );

}

export default MisLegajosPage;