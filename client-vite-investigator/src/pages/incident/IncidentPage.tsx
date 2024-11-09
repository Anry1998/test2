import {FC} from "react";





import Container from 'react-bootstrap/Container';
import { Outlet, useNavigate } from "react-router-dom";


const IncidentPage: FC = () => {

    const navigate = useNavigate()

    // const navigateCreateEmployeElement = () => {
    //     navigate('/incident/create')
    // }


    return(

        <div >
            <Container   className=''>
                <div>IncidentPage</div>
                <div onClick={() => navigate('/incident/create')}>Новый КУСП</div>
                <div onClick={() => navigate('/incident/search')}>Поиск</div>
                {/* <div onClick={() => navigate('/incident/create')}>Передать по подследственности</div> */}
                <Outlet/>
            </Container>

        </div>
    )
}

export default IncidentPage




