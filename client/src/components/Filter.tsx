import React from 'react'
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

type ProductsProps =  {
  filter: number
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleClearFilter: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Filter (
  {
  filter,
  handleClick,
  handleFilterChange,
  handleClearFilter
  }: ProductsProps ) {

  const radios = [
    { name: 'Sport', value: 1, variant: "outline-success" },
    { name: 'Casual', value: 2,  variant: "outline-warning" },
    { name: 'Sandals', value: 3,  variant: "outline-dark" },
    { name: 'Heels', value: 4,  variant: "outline-danger" },
    { name: 'Social', value: 5,  variant: "outline-info" },
    { name: 'Boots', value: 6,  variant: "outline-light text-dark" },
  ];

  return (
  <>
      <ToggleButtonGroup className='text-uppercase row w-100 px-3 my-1 mx-auto' type="radio" name="options">
        <div className='d-flex m-2 align-items-center'>
            <h3 className='btn btn-warning rounded text-light fs-4 me-auto'>categories</h3>
            <div className='d-flex align-items-center'>
              <Button variant="dark" onClick={handleClearFilter} className="me-2 text-uppercase rounded-pill fw-bold">
                Clear
              </Button>
              <Button variant="danger" onClick={handleClick} className='rounded-circle fw-bold'>
                X
              </Button>
            </div>
        </div>
        {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={radio.variant}
              name="radio"
              value={radio.value}
              onChange={handleFilterChange}
              checked={radio.value === filter}
              className="col-6 fw-bold"
            >
              {radio.name}
            </ToggleButton>
        ))}
      </ToggleButtonGroup>
  </>
  )
}
export default Filter
