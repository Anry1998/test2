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

interface RegistarationData {
    email: string;
    password: string;
    checkPassword: string;
} 

const LoginPage: FC = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Некоректный адрес электронной почты').required('Поле обязательно к заполнению'),
        password: Yup.string().min(6, 'Не менее 6 символов').max(15, 'Не более 15 символов').required('Поле обязательно к заполнению')
        .matches(/((?=.*\d)(?=.*[a-z] || ?=.*[а-я])(?=.*[A-Z] || ?=.*[А-Я])(?=.*[\W]).{6,15})/, "Aa1!"),
        checkPassword: Yup.string().required('Поле обязательно к заполнению')
    });

    const {isAuth, registration}  = useAuthStore(state => state)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')


    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<RegistarationData>({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema)
      })
    const submit: SubmitHandler<RegistarationData> = () => {
        if (password === checkPassword) {
            registration(email, password)
        }

        if (isAuth) {
            navigate('/main')
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showCheckPassword, setShowCheckPassword] = useState(false);
    const {appThemeLight}  = useSettingsStore(state => state)

    return(
            <Container >
                <Card className={`${!appThemeLight ? 'bg-secondary' : ' bg-warning '} card-main`}>
                    <h1 className="text-center mb-3 text-style">Регистрация</h1>
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
                            />
                            <div className={'position-eye-icon'}><i onClick={() => setShowPassword(!showPassword)} 
                            className={`offset-fa-eye fa  fa-eye ${!showPassword || 'fa-eye-slash'} `} 
                            id="togglePassword"></i></div>
                            
                            <div className="error-div">{errors.password?.message}</div>
                            </div>
                        </Form.Group>
                        <Form.Group className="min-height-form" controlId="exampleForm.ControlInput1">
                            <div className="form-div">
                            <Form.Control 
                                {...register('checkPassword', {
                                    validate: (val: string) => {
                                        if (watch('password') != val) {
                                            return 'Пароли не совпадают'
                                        }
                                    }
                                })}
                                className="input-control"
                                value={checkPassword}
                                onChange={e => setCheckPassword(e.target.value)}
                                type={showCheckPassword ? 'text' : 'password'}
                                placeholder="Введите пароль повторно" 
                                autoComplete="new-password"
                            />
                            <div className={'position-eye-icon'}><i onClick={() => setShowCheckPassword(!showPassword)} 
                            className={`offset-fa-eye fa  fa-eye ${!showPassword || 'fa-eye-slash'} `} 
                            id="togglePassword"></i></div>
                            {
                                ( password !== checkPassword ? <div className="error-div">Пароли не совпадают</div> : '')
                                ||  <div className="error-div">{errors.checkPassword?.message}</div>  
                            }
                            
                            </div>
                        </Form.Group>
                        <div className="button-auth-row">
                            <div className="text-small">Есть аккаунт?<NavLink to={'/'}>Войдите</NavLink></div>
                            <Button  type="submit" variant="primary">Регистрация</Button>{''}
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