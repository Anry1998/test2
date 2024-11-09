import  {FC} from "react";
import {   useNavigate  } from 'react-router-dom';

import {  Container,  } from 'react-bootstrap';

// import Images from "../../components/images/Images";
import { Outlet } from "react-router-dom";

const EmployesPage: FC = () => {
    const navigate = useNavigate()
    return(
        <Container>
                <div className="wrapper">
                    <div className="block block-one">Функции</div>
                    <div className="block block-two">Главная</div>
                    <div className="block block-three">Вспомогательная</div>
                </div>
                <div className="wrapper">
                    <div className="block block2 block-one">
                    
                        <div onClick={() => navigate('/employes')}>Найти</div>
                        <div onClick={() => navigate('/employes/create')}>Создать</div>
                        <div>Опции</div>
                        <div>Опции</div>
                        <div>Опции</div>
                        <div>Опции</div>
                        <div>Опции</div>
                        <div>Опции</div>
                        <div>Опции</div>
                    </div>
                    <div className="block block2 block-two">
                        <Outlet/> 
                    </div>
                    <div className="block block2 block-three">
                        <div>Календарь</div>
                        <div>Уведомления</div>
                    </div>
                </div>
        </Container>
    )
}

export default EmployesPage