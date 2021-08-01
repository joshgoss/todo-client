import { useForm } from "react-hook-form";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {Form, Input, Button} from '../../components';

import {login} from './accountSlice';

const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, formState, handleSubmit} = useForm({
        mode: 'all'
    }); 

    const {isValid, isSubmitting} = formState;
    const onSubmit = async (d) => {
        const res = await dispatch(login(d));

        if (res.payload) {
            history.push('/')
        }
        
        return res;
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label='Username'
                width={1} 
                placeholder='Username...'
                required={true}
                {...register(
                    'username', 
                    { required: "This field is required" }
                )} 
            />

            <Input
                label='Password'
                placeholder='Password...'
                width={1}
                required={true}
                {...register(
                    'password', 
                    { required: "This field is required" }
                )} 
            />

            <div>Don't have an account? <Link to="/login"> Create an account</Link></div>

            <Button disabled={isSubmitting || !isValid} loading={isSubmitting} primary type='submit'>Login</Button>
        </Form>
    );
}

export default LoginForm;