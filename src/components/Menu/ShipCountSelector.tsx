import React from 'react'

type Props = {
    label: string;
    value: number;
    optionValues: number[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>, count: number) => void;
}

export default function ShipCountSelector({ label, value, optionValues, onChange }: Props) {

    const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const count = parseInt(e.target.value);
        onChange(e, count);
    };

    return (
        <>
            <label>
                {label}
                <select value={value} onChange={handleCountChange}>
                    {optionValues.map(val => <option value={val} key={val}>{val}</option>)}
                </select>
            </label>
            <br />
        </>
    );
}
