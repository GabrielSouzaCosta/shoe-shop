import React, { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

type ProductsProps =  {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function RadioInputs ({handleClick}: ProductsProps ) {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Sport', value: '1', variant: "outline-success" },
    { name: 'Casual', value: '2',  variant: "outline-warning" },
    { name: 'Sandals', value: '3',  variant: "outline-dark" },
    { name: 'Heels', value: '4',  variant: "outline-danger" },
    { name: 'Social', value: '5',  variant: "outline-info" },
    { name: 'Boots', value: '6',  variant: "outline-light text-dark" },
  ];

  return (
  <>
      <ToggleButtonGroup className='text-uppercase row w-100 px-3 my-1 mx-auto' type="radio" name="options">
      <div className='d-flex m-2 align-items-end'>
          <h3 className='btn btn-warning rounded text-light fs-3 text-center mx-auto'>categories</h3>
          <button onClick={handleClick} className='btn btn-danger rounded-circle fw-bold text-end'>X</button>
      </div>
      {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={radio.variant}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
            className="col-6 fw-bold"
          >
            {radio.name}
          </ToggleButton>
      ))}
      </ToggleButtonGroup>
  </>
  )
}
export default RadioInputs
