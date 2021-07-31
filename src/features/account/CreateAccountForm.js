import {useState} from 'react';
import {get} from 'lodash';
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom';

import {api, debounce} from '../../utils/index';
import {Form, Input, Button} from '../../components';


function CreateAccountForm() {
    const [checkingUsername, setCheckingUsername] = useState(false);
    const { register, formState, handleSubmit } = useForm({
        mode: 'all'
    }); 
    const {errors} = formState;
    const onSubmit = data => {
        
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input 
                autoComplete='off'
                label='Username' 
                {...register(
                    'username', 
                    {
                        required: "This field is required",
                        minLength: {value: 3, message: "Value too short"},
                        pattern:  {value: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, message: 'Invalid username'},
                        validate: {
                            usernameTaken: debounce(async function (v) {
                                setCheckingUsername(true);
                                const res = await api.get(`/users/username-exists/${v}`);
                                setCheckingUsername(false);
                                return res.exists ? "Username already taken" : undefined;
                            }, 1500)
                        }
                    }
                )} 
                loading={checkingUsername}
                error={get(errors, 'username.message')} 
                required={true}
                placeholder='Username...'
                width={1}
            />
            <Input 
                autoComplete='new-password'
                label='Password' 
                {...register(
                    'password', 
                    {
                        required: true,
                        minLength: {value: 6, message: 'Password is too short'}
                    }
                )} 
                error={get(errors, 'password.message')}
                placeholder='Password...'
                required={true}
                type='password'
                width={2} 
            />
            <Input 
                autoComplete='new-password'
                label='Confirm Password' 
                {...register('password_confirmation')} 
                error={get(errors, 'password_confirmation.message')} 
                required={true} 
                placeholder='Confirm Password...'
                type='password'
                width={2}
            />
            <Input 
                label='First Name' 
                {...register('first_name')} 
                error={get(errors, 'first_name.message')} 
                placeholder='First Name...'
                width={2}
            />
            <Input 
                label='Last Name' 
                {...register('last_name')} 
                error={get(errors, 'last_name.message')} 
                placeholder='Last Name...'
                width={2}
            />

            <div>Already have an account? <Link to="/login">Login here</Link></div>

            <Button primary type='submit'>Create Account</Button>
        </Form>
    );
}

export default CreateAccountForm;