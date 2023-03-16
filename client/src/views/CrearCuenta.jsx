import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import CuentaForm from '../components/CuentaForm';

const CrearCuenta = () => {

    const initialValues = {
        descripcion: "",
        monto: "",
        vencimiento: ""
    };

    const navigate = useNavigate();
    let { id } = useParams();
    const [cuenta, setCuenta] = useState(initialValues);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`http://localhost:8000/api/cliente/${id}`);
            setCuenta(response.data);
        }
        getData();
    }, [id]);


    const agregarCuenta = async (values) => {
        try {
            await axios.put(`http://localhost:8000/api/cliente/${id}`, values);
            Swal.fire({
                icon: 'success',
                title: 'GENIAL!!!',
                text: `Se ha actualizado perfectamente!`,
            });
            navigate('/dashboard');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops error',
                text: `Error: ${error?.response?.data?.message || error.message}`,
            });
        }
    }

    return (
        <CuentaForm
            initialValues={cuenta}
            onSubmit={agregarCuenta}
        />
    )
}

export default CrearCuenta;