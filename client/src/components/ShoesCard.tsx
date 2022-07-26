import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

type Props = {
    slug: string,
    name: string,
    price: number,
    image: string
  }
  
const ShoesCard = ({
    slug,
    name,
    price,
    image
    }: Props) => 
    (
        <Link to={"/shoes/"+slug}  className='shoes-card col-3'>
        <div className='bg-light header' style={{background: `url('${'http://localhost:8000'+image}') no-repeat center`, backgroundSize: "auto 97%", minHeight: "400px"}}>
        </div>
        <div className='body text-center pb-2' style={{background: "#ffffff no-repeat bottom", minHeight: "15%"}}>
            <h2 className='text-dark text-capitalize px-1 pt-1'>
            {name}
            </h2>
            <span className='text-dark fs-3'>
            ${price}
            <Button variant='danger' className='ms-3 mb-1 text-uppercase fw-bold'>
                See Details
            </Button>
            <FontAwesomeIcon icon={faCartPlus} className="text-warning ps-3" />
            </span>
        </div>
        </Link>
    )

export default ShoesCard