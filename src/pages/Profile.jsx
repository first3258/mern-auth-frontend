import { useState, useEffect } from "react"
import { Form, Button, FormLabel } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from "../components/Loader"
import { setCredentials } from "../slices/authSlice"
import { useUpdateMutation } from "../slices/userApiSlice"

const Profile = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    const [updateProfile, { isLoading }] = useUpdateMutation()

    useEffect(() => {
        setName(userInfo.name)
    }, [userInfo.setName])

    const submit = async (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            toast.error('Password not match')
        } else {
          try {
            const res = await updateProfile({
              _id: userInfo._id,
              email: userInfo.email,
              name,
              password
            }).unwrap()
            dispatch(setCredentials({...res}))  
            toast.success('Profile updated')
          } catch (error) {
            toast.error(err?.data?.message || error.error)
          }
        }
    }
    return (
        <FormContainer>
            <h2>Update Profile</h2>
            <Form onSubmit={ submit }>
                <Form.Group className="my-2" controlId="name">
                    <FormLabel>Name</FormLabel>
                    <Form.Control 
                        type="text" placeholder="Enter Name" value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    Update
                </Button>
            </Form>
        </FormContainer>
    )
}

export default Profile