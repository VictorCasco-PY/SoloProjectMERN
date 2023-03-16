import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

const DetalleCliente = () => {
    moment.locale('es');
    let { id } = useParams();
    const [cliente, setCliente] = useState([]);
    const [isCuenta, setIsCuenta] = useState(true);
    const values = { descripcion: "", monto: "", vencimiento: "" };
    const navigate = useNavigate();

    const enviarCorreo = () => {
        const { nombre, descripcion, monto, vencimiento, correo } = cliente;
        const data = {
            correo, descripcion, monto, vencimiento, nombre
        };

        const response = axios.post(
            "http://localhost:8000/api/sendemail",
            data
        );
        console.log(response.data);
        Swal.fire(
            'Recordatorio!',
            'Racordatorio enviado!',
            'success'
        )
    };

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`http://localhost:8000/api/cliente/${id}`);
            setCliente(response.data);
        }
        getData();
    }, [id]);

    const eliminarCuenta = async () => {
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


    useEffect(() => {
        if (cliente.descripcion === "") {
            setIsCuenta(true);
        }
    })


    return (
        <>
            {
                isCuenta ?
                    <>
                        <a href="/dashboard" className='btn btn-primary mb-2'> Atras</a>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Cuentas pendientes de {cliente.nombre}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Descripcion:</strong> {cliente.descripcion}</li>
                                <li className="list-group-item"><strong>Monto:</strong> {cliente.monto}</li>
                                <li className="list-group-item"><strong>Vencimiento:</strong> {moment(cliente.vencimiento).format('LL')}</li>
                            </ul>
                            <div className="card-body">
                                <button className='btn btn-danger me-2' onClick={enviarCorreo}>Enviar Recordatorio</button>
                                <button className='btn btn-secondary' onClick={eliminarCuenta}>Eliminar cuenta</button>
                            </div>
                        </div>
                    </>
                    :
                    <div><h2>No hay cuentas pendientes</h2></div>
            }
        </>
    )
}

export default DetalleCliente;