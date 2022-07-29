import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useAppDispatch } from '../redux/hooks/hooks'
import { addToCart } from '../redux/slices/CartSlice'

type Props = {
    id: number,
    slug: string,
    name: string,
    price: number,
    image: string
  }
  
const ShoesCard = ({
    id,
    slug,
    name,
    price,
    image
    }: Props) => 
    
    {

    const dispatch = useAppDispatch()

    function addProductToCart() {
        dispatch(addToCart({id, name, price, quantity: 1, image}))
        }

    return (
        <div className='shoes-card col-12 col-md-6 col-lg-3'>
            <div className='bg-light header' style={{background: `url('${'http://localhost:8000'+image}') no-repeat center`, backgroundSize: "auto 97%", minHeight: "400px"}}>
            </div>
            <div className='body text-center pb-2' style={{background: "#ffffff no-repeat bottom", minHeight: "15%"}}>
                <h2 className='text-dark text-capitalize px-1 pt-1'>
                {name}
                </h2>
                <span className='text-dark fs-3'>
                ${price}
                <Link to={"/shoes/"+slug}>
                    <Button variant='danger' className='ms-3 mb-1 text-uppercase fw-bold'>
                        See Details
                    </Button>
                </Link>
                <FontAwesomeIcon onClick={addProductToCart} icon={faCartPlus} className="text-warning ps-3" style={{zIndex: "100"}}/>
                </span>
            </div>
        </div>
        )
    }


export default ShoesCard