import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import 'moment/dist/locale/es';
import Swal from 'sweetalert2';
moment.locale("es");

const DetalleCliente = () => {

    let { id } = useParams();
    const [cliente, setCliente] = useState([]);
    const [cuentas, setCuentas] = useState([])

    const enviarCorreo = (cuenta) => {
        const { nombre, correo } = cliente;

        const data = {
            correo, nombre, cuenta
        };

        console.log("datos", data);

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
        async function getData() {
            const response = await axios.get(`http://localhost:8000/api/cliente/${id}`);
            console.log(response.data)
            setCliente(response.data);
        }
        getData();
    }, []);

    useEffect(() => {
        // Hacer la solicitud GET al servidor para obtener la lista de cuentas
        async function getCuentas() {
            const response = await axios.get(`http://localhost:8000/api/cliente/${id}/cuentas`);
            setCuentas(response.data);
        }
        getCuentas();
    }, []);

    async function eliminarCuenta(idCuenta) {
        try {
            await axios.delete(`http://localhost:8000/api/cliente/${id}/${idCuenta}`);
            // Si la eliminación fue exitosa, actualizar la lista de cuentas
            setCuentas((prevCuentas) =>
                prevCuentas.filter((cuenta) => cuenta._id !== idCuenta)
            );
            Swal.fire({
                title: 'Eliminado correctamente',
                icon: 'success',
                text: 'La cuenta ha sido eliminado correctamente',
                confirmButtonText: 'Aceptar'
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar la cuenta',
                text: `Error: ${error}`,
            });
        }
    }

    return (
        <>
            {cuentas.length > 0 ? (
                <>
                    <a href="/dashboard" className="btn btn-primary mb-2">
                        {" "}
                        Atras
                    </a>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Cuentas pendientes de {cliente.nombre}</h5>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Monto(Gs)</th>
                                    <th>Vencimiento</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cuentas.map((cuenta) => (
                                    <tr key={cuenta._id}>
                                        <td>{cuenta.descripcion}</td>
                                        <td>{cuenta.monto.toLocaleString()}</td>
                                        <td>{moment(cuenta.vencimiento).format("D [de] MMMM [de] YYYY")}</td>
                                        <td>
                                            <button className="btn btn-secondary me-2" onClick={() => eliminarCuenta(cuenta._id)}>
                                                Eliminar
                                            </button>
                                        </td>
                                        <td>
                                            <a href={`/cliente/${cliente._id}/cuenta/${cuenta._id}`} className='btn btn-success'>Editar</a>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger me-2" onClick={() => enviarCorreo(cuenta)}>
                                                Enviar Recordatorio
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">No hay cuentas pendientes</h5>
                        <a href="/dashboard" className="btn btn-primary">
                            {" "}
                            Atras
                        </a>
                    </div>
                </div>
            )}
        </>

    );
}

export default DetalleCliente;