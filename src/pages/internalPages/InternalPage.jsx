import React from 'react';
import { Routes, Route, Outlet, useParams } from 'react-router-dom';
import PrivateRoute from '../../routes/PrivateRoute';
import BaseLayout from '../../layout/BaseLayout';
import RolesAuthRoute from '../../routes/RolesAuthRoute';
function InternalPage(props) {

    const {isAuthenticated} = props;
    return (
        <>
            <PrivateRoute isAuthenticated={isAuthenticated}>
                <BaseLayout>
                    <Outlet></Outlet>
                    
                </BaseLayout>
            </PrivateRoute>
        </>
    );

}

export default InternalPage;