import { useState } from 'react';
import { useMutation } from '@apollo/client';

const ElectricalForm = ({ onAdd }) => {
    const [electrical, setElectrical] = useState({
        dateCompleted: '', reason: '', workDescription: '', partsUsed: '', completedBy: ''
    });

    // const [addAnnual, { loading, error }] = useMutation(ADD_ANNUAL);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setElectrical((prevElectrical) => ({
            ...prevElectrical,
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
            <form className="annualForm" 
            // onSubmit={submit}
            >
                <label className='label'>DATE COMPLETED:</label>
                <input className="input" type="text" name="dateCompleted" value={electrical.dateCompleted} onChange={handleChange} require />
                <label className="label">REASON:</label>
                <input className="input" type="text" name="reason" value={electrical.reason} onChange={handleChange} require />
                <label className="label">WORK DESCRIPTION:</label>
                <input className="input" type="text" name="workDescription" value={electrical.workDescription} onChange={handleChange} require />
                <label className="label">PARTS USED:</label>
                <input className="input" type="text" name="notes" value={electrical.partsUsed} onChange={handleChange} require />
                <label className="label">COMPLETED BY:</label>
                <input className="input" type="text" name="completedBy" value={electrical.completedBy} onChange={handleChange} require />
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
                <button className="button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ElectricalForm;