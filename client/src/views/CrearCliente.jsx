import React from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import ClienteForm from '../components/ClienteForm';

const initialValues = {
    ci: "",
    nombre: "",
    apellido: "",
    correo: "",
    descripcion: "",
    monto: "",
    vencimiento: ""
};


const agregarCliente = async (values, actions) => {
    try {
        const response = await axios.post("http://localhost:8000/api/cliente", values);
        console.log(response);
        Swal.fire(
            'Registro cliente!',
            'Agregado!',
            'success'
        );
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
        })
    }
    actions.resetForm(initialValues);
};

const CrearCliente = () => {
    return (
        <div>
            <p><a href="/dashboard" className='btn btn-primary'>Inicio</a></p>
            <h3>Nuevo cliente:</h3>
            <hr />
            <ClienteForm initialValues={initialValues} onSubmit={agregarCliente} />
        </div>
    )
}

export default CrearCliente