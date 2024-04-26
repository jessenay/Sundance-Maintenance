import { useState } from 'react';
import { useMutation } from '@apollo/client';

const ChairsForm = ({ onAdd }) => {
    const [chairs, setChairs] = useState({
        dateCompleted: '', reason: '', workDescription: '', partsUsed: '', completedBy: ''
    });

    // const [addAnnual, { loading, error }] = useMutation(ADD_ANNUAL);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChairs((prevChairs) => ({
            ...prevChairs,
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
                <input className="input" type="text" name="dateCompleted" value={chairs.dateCompleted} onChange={handleChange} require />
                <label className="label">REASON:</label>
                <input className="input" type="text" name="reason" value={chairs.reason} onChange={handleChange} require />
                <label className="label">WORK DESCRIPTION:</label>
                <input className="input" type="text" name="workDescription" value={chairs.workDescription} onChange={handleChange} require />
                <label className="label">PARTS USED:</label>
                <input className="input" type="text" name="notes" value={chairs.partsUsed} onChange={handleChange} require />
                <label className="label">COMPLETED BY:</label>
                <input className="input" type="text" name="completedBy" value={chairs.completedBy} onChange={handleChange} require />
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

export default ChairsForm;