import React from 'react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const Errors = Yup.object().shape({
    ci: Yup.string()
        .min(6, 'Numero de documento invalido')
        .required('Numedo de documento obligatorio'),
    nombre: Yup.string()
        .min(3, 'Nombre muy corto')
        .required('Nombre es obligatorio'),
    apellido: Yup.string()
        .min(3, 'Apellido muy corto')
        .required('Apellido es obligatorio'),
    correo: Yup.string()
        .email('Correo Invalido')
        .required('Correo es obligatorio')
});

const ClienteForm = ({ initialValues, onSubmit }) => {
    return (
        <div className='row'>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={Errors}
            >
                {({ errors, touched }) => (
                    <Form className='row'>
                        <div className='col-3'>
                            <h3>Datos personales</h3>
                            <hr />

                            <label htmlFor="ci">Numero de cedula</label>
                            <Field type="number" name="ci" className="form-control mt-2" />
                            {touched.ci && errors.ci && <div className="ms-3 mt-1 text-danger">{errors.ci}</div>}

                            <label htmlFor="nombre">Nombre</label>
                            <Field type="text" name="nombre" className="form-control mt-2" />
                            {touched.nombre && errors.nombre && <div className="ms-3 mt-1 text-danger">{errors.nombre}</div>}

                            <label htmlFor="apellido">Apellido</label>
                            <Field type="text" name="apellido" className="form-control mt-2" />
                            {touched.apellido && errors.apellido && <div className="ms-3 mt-1 text-danger">{errors.apellido}</div>}

                            <label htmlFor="correo">Correo</label>
                            <Field type="email" name="correo" className="form-control mt-2" />
                            {touched.correo && errors.correo && <div className="ms-3 mt-1 text-danger">{errors.correo}</div>}
                        </div>

                        <div className='col-2'>
                            <h3>Cuenta(Opcional)</h3>
                            <hr />
                            <label htmlFor="descripcion">Descripcion</label>
                            <Field type="text" name="descripcion" className="form-control mt-2" />


                            <label htmlFor="monto">Monto</label>
                            <Field type="number" name="monto" className="form-control mt-2" />


                            <label htmlFor="vencimiento">Vencimiento</label>
                            <Field type="date" name="vencimiento" className="form-control mt-2" />
                        </div>

                        <p>
                            <a href="/dashboard" className='btn btn-secondary mt-5 me-2'>Cancelar</a>
                            <button type="submit" className='btn btn-primary mt-5'>Agregar</button>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ClienteForm;