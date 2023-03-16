import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FirstContext } from '../context/FirstContext';
import Swal from 'sweetalert2';

const DataTable = () => {
    const [cliente, setCliente] = useState([]);
    const [tabla, setTabla] = useState([])
    const [busqueda, setBusqueda] = useState("");
    const { users, admin, validateAdmin } = useContext(FirstContext);
    const navigate = useNavigate();

    useEffect(() => {
        validateAdmin();
    }, [])
    useEffect(() => {
        if (admin === false) {
            navigate("/");
        }
        console.log(users);
    }, [admin])

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:8000/api/cliente');
            setCliente(response.data);
            setTabla(response.data);
        }
        getData();
    }, []);

    const handleChange = (e) => {
        setBusqueda(e.target.value);
        filtro(e.target.value);
    }

    const filtro = (terminoBusqueda) => {
        var resultado = tabla.filter((e) => {
            if (e.ci.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || e.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || e.apellido.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return e;
            }
        });
        setCliente(resultado);
    }

    //Borrar cliente
    const deleteCliente = async (idCliente) => {
        console.log(idCliente);
        try {
            await axios.delete(`http://localhost:8000/api/cliente/${idCliente}`);
            setCliente(cliente.filter(a => a._id !== idCliente));
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops error',
                text: `Error: ${error?.response?.data?.message || error.message}`,
            });
        }
    }

    const confirmDelete = (idCliente) => {
        Swal.fire({
            title: 'Estas seguro de eliminarlo?',
            text: "No podras volver atras",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCliente(idCliente);
                Swal.fire(
                    'Eliminado!',
                    'El cliente fue eliminado.',
                    'success'
                )
            }
        })
    }
    return (
        <>
            {admin ?
                <div>
                    <div className='d-flex justify-content-center'>
                        <a className="nav-link active btn btn-primary mb-2" aria-current="page" href="/new">Agregar cliente</a>
                    </div>
                    <input type="text" name="buscador" className="form-control mb-2" value={busqueda} placeholder="Buscar..." onChange={handleChange} />
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>CI</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cliente.map((item, index) =>
                                <tr key={index} >
                                    <td>{item.ci}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.apellido}</td>
                                    <td>{item.correo}</td>
                                    <td>
                                        <a href={`/cliente/${item._id}`} className="btn btn-primary ms-2">Agregar/Editar cuenta</a>
                                        <a href={`/cliente/${item._id}/detalle`} className="btn btn-secondary ms-2">Detalle cliente</a>
                                        <button className="btn btn-danger ms-2" onClick={() => confirmDelete(item._id)}>Eliminar cliente</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
                : null
            }
        </>
    )
}

export default DataTable