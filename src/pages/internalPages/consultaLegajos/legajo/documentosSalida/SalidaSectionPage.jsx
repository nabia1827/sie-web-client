import React from 'react';
import { Routes, Route, Outlet, useParams } from 'react-router-dom';
import RolesAuthRoute from '../../../../../routes/RolesAuthRoute';
import { Perfiles } from '../../../../../utils/constants';

function SalidaSectionPage() {

    return (
        <>
            <Outlet></Outlet>
        </>
    );

}

export default SalidaSectionPage;