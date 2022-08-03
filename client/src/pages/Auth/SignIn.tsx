import * as React from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import Form, { FormControl, Input } from '../../components/Form';
import useForm from '../../hooks/useForm';
import image from '../../assets/sign-in.png';
import s from './Auth.module.css';
import handleAuthError from '../../utils/handleAuthError';
import useAuth from '../../hooks/useAuth';

const initialState = {
  email: '',
  password: ''
};

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn, verifyUser } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const { formValues, errors, changeHandler, setErrors } =
    useForm(initialState);

  const submitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await signIn(formValues.email, formValues.password);

      if (response.data.errors) return setErrors(response.data.errors);

      localStorage.setItem('token', response.data.token);
      setIsLoading(true);
      await verifyUser();
      navigate('/');
    } catch (err) {
      setErrors(handleAuthError(err as AxiosError));
    }
  };

  return (
    <div>
      <h2>Sign In to gain access to features!</h2>
      <div>
        <div className={s['image-container']}>
          <img src={image} alt="" />
        </div>
        <Form onSubmit={submitHandler} isLoading={isLoading}>
          <FormControl id="email" label="Email Address" errors={errors}>
            <Input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={changeHandler}
            />
          </FormControl>
          <FormControl id="password" label="Password" errors={errors}>
            <Input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={changeHandler}
            />
          </FormControl>
        </Form>
      </div>
    </div>
  );
}
