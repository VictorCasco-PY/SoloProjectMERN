import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import CrearCliente from "../views/CrearCliente";
import DataTable from "../views/DataTable";
import CrearCuenta from "../views/CrearCuenta";
import DetalleCliente from "../views/DetalleCliente";
import ErrorPage from "../views/ErrorPage";
import LoginPage from "../views/LoginPage";

export default createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <LoginPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/dashboard",
                element: <DataTable />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/new",
                element: <CrearCliente />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/cliente/:id",
                element: <CrearCuenta />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/cliente/:id/detalle",
                element: <DetalleCliente />,
                errorElement: <ErrorPage />,
            }
        ],
    },
]);