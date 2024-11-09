import  {FC,useState} from "react";
import { NavLink, useNavigate } from "react-router-dom"

import { Card, Container, Form, Button , } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useAuthStore } from "../store/ayth-store/auth.store";
import { useSettingsStore } from "../store/settingsStore/settings.store";
import DarkModeToggleSwitch from "../components/dark-mode-toggle-switch/DarkModeToggleSwitch";

import 'bootstrap/dist/css/bootstrap.min.css';
import './public-pages/public-pages.scss'
import './public-pages/public-pages.scss'

interface LoginData {
    email: string;
    password: string;
} 

const LoginPage: FC = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Некоректный адрес электронной почты').required('Поле обязательно к заполнению'),
        password: Yup.string().min(6, 'Не менее 6 символов').max(15, 'Не более 15 символов').required('Поле обязательно к заполнению')
        .matches(/((?=.*\d)(?=.*[a-z] || ?=.*[а-я])(?=.*[A-Z] || ?=.*[А-Я])(?=.*[\W]).{6,15})/, "Aa1!"),
    });

    const { login}  = useAuthStore(state => state)

    // const nav = () => {
    //     if (isAuth) {
    //         navigate('/main')
    //     }
    // }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginData>({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema)
      })


    const navigate = useNavigate()

    const submit: SubmitHandler<LoginData> = async () => {

        await login(email, password)
        navigate('/main')
        // nav()
   
    }

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState(false);

    const {appThemeLight}  = useSettingsStore(state => state)

    return(
            <Container >
                <Card className={`${!appThemeLight ? '' : ''} card-main`}>
                    <h1 className="text-center mb-3 text-style">Вход</h1>
                    <Form onSubmit={handleSubmit(submit)} className="forms-list">
                        <Form.Group className="min-height-form" controlId="exampleForm.ControlInput1">
                            <div className="form-div">
                            <Form.Control 
                                {...register('email')}
                                className="input-control"
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                type="text" 
                                placeholder="Введите Email" 
                                autoComplete="new-password"
                                
                            />
                            <div className="error-div">{errors.email?.message}</div>
                            </div>
                        </Form.Group>
                        <Form.Group className="min-height-form" controlId="exampleForm.ControlInput1">
                            <div className="form-div">
                            <Form.Control 
                                {...register('password')}
                                className="input-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Введите пароль" 
                                autoComplete="new-password"
                                // autoComplete="off"
                            />
                            <div className={'position-eye-icon'}><i onClick={() => setShowPassword(!showPassword)} 
                            className={`offset-fa-eye fa  fa-eye ${!showPassword || 'fa-eye-slash'} `} 
                            id="togglePassword"></i></div>
                            
                            <div className="error-div">{errors.password?.message}</div>
                            </div>
                        </Form.Group>
                        <div className="button-auth-row">
                            <div className="text-small"> Нет аккаунта?<NavLink to={'/registration'}>Зарегистрируйтесь</NavLink></div>
                            <Button  type="submit" variant="primary">Войти</Button>{''}
                        </div>
                    </Form>
                    <div className="dark-mode-btn-position">
                        <DarkModeToggleSwitch/>
                    </div> 
                </Card> 
            </Container>
    )
}

export default LoginPage