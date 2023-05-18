import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from "../components/FormContainer"
import { useLoginMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from 'react-toastify'
import Loader from "../components/Loader"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading}] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/')
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
    return (
        <FormContainer>
            <h2>Sign In</h2>
            <Form onSubmit={ submit }>
                <Form.Group className="my-2" controlId="email">
                    <FormLabel>Email address</FormLabel>
                    <Form.Control 
                        type="email" placeholder="Enter Email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <FormLabel>Password</FormLabel>
                    <Form.Control 
                        type="password" placeholder="Enter Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {isLoading && <Loader/>}
                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>

                <Row className="py-3">
                    <Col>
                        <span style={{color: 'grey'}}>New Customer ? </span><Link to="/register">Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default Login