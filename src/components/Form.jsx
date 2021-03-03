import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const Form = ({ addAppointment }) => {
    const initialAppointmentState = {
        pet: '',
        owner: '',
        date: '',
        hour: '',
        symptoms: '',
    };
    const [appointment, setAppointment] = useState(initialAppointmentState);
    const [error, setError] = useState(false);

    const changeAppointment = (e) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value });
    };

    const { pet, owner, date, hour, symptoms } = appointment;

    const submitAppointment = (e) => {
        e.preventDefault();

        if (
            pet.trim() === '' ||
            owner.trim() === '' ||
            date.trim() === '' ||
            hour.trim() === '' ||
            symptoms.trim() === ''
        ) {
            setError(true);
            return;
        }
        setError(false);

        appointment.id = uuid();

        addAppointment(appointment);

        setAppointment(initialAppointmentState);
    };

    return (
        <>
            <h2>Create appointment</h2>
            {error && <p className='alerta-error'>All fields are required</p>}
            <form onSubmit={submitAppointment}>
                <label htmlFor=''>Pet Name</label>
                <input
                    type='text'
                    name='pet'
                    className='u-full-width'
                    placeholder='Pet Name'
                    onChange={changeAppointment}
                    value={pet}
                />

                <label htmlFor=''>Owners Name</label>
                <input
                    type='text'
                    name='owner'
                    className='u-full-width'
                    placeholder='Owners Name'
                    onChange={changeAppointment}
                    value={owner}
                />

                <label htmlFor=''>Date</label>
                <input
                    type='date'
                    name='date'
                    className='u-full-width'
                    onChange={changeAppointment}
                    value={date}
                />

                <label htmlFor=''>Hour</label>
                <input
                    type='time'
                    name='hour'
                    className='u-full-width'
                    onChange={changeAppointment}
                    value={hour}
                />

                <label htmlFor=''>Symptoms</label>
                <textarea
                    className='u-full-width'
                    name='symptoms'
                    onChange={changeAppointment}
                    value={symptoms}
                />
                <button type='submit' className='u-full-width button-primary'>
                    Add appointment
                </button>
            </form>
        </>
    );
};

Form.propTypes = {
    addAppointment: PropTypes.func.isRequired,
};

export default Form;
