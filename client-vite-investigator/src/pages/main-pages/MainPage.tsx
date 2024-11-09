import  {FC} from "react";
import {   useNavigate  } from 'react-router-dom';

import {  Container,  } from 'react-bootstrap';

import './MainPage.scss'
// import Images from "../../components/images/Images";
import { Outlet } from "react-router-dom";

const MainPage: FC = () => {
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
                    
                        <div onClick={() => navigate('/main')}>Персональная информация</div>
                        <div onClick={() => navigate('/main/y-d')}>Уголовные дела</div>
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
                        {/* <Images/>
                        <div>Бритвин Андрей Дмитриевич</div>
                        <div>Следователь</div>
                        <div>Следственный Отдел</div>
                        <div>Отдел ОМВД России по г. Анапе</div>
                        <div>Старший лейтенант юстиции</div> */}

                        {/* <div style={{display: 'flex', justifyContent: "center", }}>
                            <div>Уголовные дела</div>
                            <div>Материаоы КУСП</div>
                        </div> */}
                        
                    </div>
                    <div className="block block2 block-three">
                        <div>Календарь</div>
                        <div>Уведомления</div>
                    </div>
                </div>
        </Container>
    )
}

export default MainPage