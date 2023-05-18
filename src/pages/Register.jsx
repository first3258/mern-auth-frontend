import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col, FormLabel } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from "../components/Loader"
import { useRegisterMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"

const Register = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        if(userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submit = async (e) => {
        e.preventDefault()
        if(!password || !confirmPassword || !name || !email) {
            toast.error('Invalid data')
        }
        if (password != confirmPassword) {
            toast.error('Password not match')
        } else {
            try {
                const res = await register({email, name, password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate('/')
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
    return (
        <FormContainer>
            <h2>Sign Up</h2>
            <Form onSubmit={ submit }>
                <Form.Group className="my-2" controlId="name">
                    <FormLabel>Name</FormLabel>
                    <Form.Control 
                        type="text" placeholder="Enter Name" value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

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
                <Form.Group className="my-2" controlId="confirmPassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <Form.Control 
                        type="password" placeholder="Confirm Password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {isLoading && <Loader/>}
                <Button type="submit" variant="primary" className="mt-3">
                    Sign Up
                </Button>

                <Row className="py-3">
                    <Col>
                        <span style={{color: 'grey'}}>Already Have an Account ? </span><Link to="/login">Sign In</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default Register