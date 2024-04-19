import { useState } from 'react';
import { useMutation } from '@apollo/client';

const AuxillaryMotorForm = ({ onAdd }) => {
    const [auxillaryMotor, setAuxillaryMotor] = useState({
        dateCompleted: '', reason: '', workDescription: '', partsUsed: '', completedBy: ''
    });

    // const [addAnnual, { loading, error }] = useMutation(ADD_ANNUAL);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuxillaryMotor((prevAuxillaryMotor) => ({
            ...prevAuxillaryMotor,
            [name]: value,
        }))
    };

    // const submit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await addAnnual({
    //             variables: {
    //                 ...annual,
    //             }
    //         });
    //     } catch (error) {
    //         console.error("and error has occured while adding an annual")
    //     }
    // };

    return (
        <div className='form-container'>
            <form className="form" 
            // onSubmit={submit}
            >
                <label className='label'>DATE COMPLETED:</label>
                <input className="input" type="text" name="dateCompleted" value={auxillaryMotor.dateCompleted} onChange={handleChange} require />
                <label className="label">REASON:</label>
                <input className="input" type="text" name="reason" value={auxillaryMotor.reason} onChange={handleChange} require />
                <label className="label">WORK DESCRIPTION:</label>
                <input className="input" type="text" name="workDescription" value={auxillaryMotor.workDescription} onChange={handleChange} require />
                <label className="label">PARTS USED:</label>
                <input className="input" type="text" name="notes" value={auxillaryMotor.partsUsed} onChange={handleChange} require />
                <label className="label">COMPLETED BY:</label>
                <input className="input" type="text" name="completedBy" value={auxillaryMotor.completedBy} onChange={handleChange} require />
                {/* {recipe.ingredients.map((ingredient, index) => (
                    <input
                        className="input"
                        key={index}
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleChange(index, e.target.value)}
                        required
                    />
                ))} */}
                {/* <button className="button" type="submit">Add Annual</button> */}
            </form>
        </div>
    );
};

export default AuxillaryMotorForm;