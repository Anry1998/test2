

import  {FC} from "react";

import {  Container,  } from 'react-bootstrap';

// import './MainPage.scss'
import Images from "../../components/images/Images";

const PersonalInfo: FC = () => {

    return(
        <Container>
 
                    <div className="block block2 block-two">
                        <Images/>
                        <div>Бритвин Андрей Дмитриевич</div>
                        <div>Следователь</div>
                        <div>Следственный Отдел</div>
                        <div>Отдел ОМВД России по г. Анапе</div>
                        <div>Старший лейтенант юстиции</div>
                    </div>
        </Container>
    )
}

export default PersonalInfo