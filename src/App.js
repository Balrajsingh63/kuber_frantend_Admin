import React from "react";
import { BrowserRouter, Route, Routes, Navigate, HashRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const App = () => {
    const userData = useSelector(state => state.authReducer.user);
    return (
        <HashRouter>
            <Routes>
                {
                    userData?.token ? <Route path="/*" element={<Navigate to="/admin/index" replace />} /> : <Route path="/*" element={<Navigate to="/Auth/login" replace />} />
                }
                {
                    userData?.token ? <Route path="/admin/*" element={<AdminLayout />} /> : <Route path="/auth/*" element={<AuthLayout />} />
                }
            </Routes>
        </HashRouter>
    );
};

export default App;
