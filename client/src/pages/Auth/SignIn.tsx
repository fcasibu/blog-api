import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Form, { FormControl, Input } from '../../components/Form';
import useForm from '../../hooks/useForm';
import image from '../../assets/sign-in.png';
import s from './Auth.module.css';

const initialState = {
  email: '',
  password: ''
};

export default function SignIn() {
  const { signIn, verifyUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { formValues, changeHandler, errors, setErrors } =
    useForm(initialState);

  // TODO: Refactor submitHandler
  const submitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await signIn(formValues.email, formValues.password);

      if (response.data.errors) return setErrors(response.data.errors);

      localStorage.setItem('token', response.data.token);

      await verifyUser();
      navigate('/');
    } catch (err) {
      switch (err.response.data.message) {
        case 'Invalid Password':
          setErrors([{ param: 'password', msg: 'Invalid Password' }]);
          break;
        case 'User does not exist':
          setErrors([
            { param: 'email', msg: 'The email you entered does not exist' }
          ]);
          break;
        default:
          throw new Error('Unexpected message');
      }
    }
  };

  return (
    <div>
      <h2>Sign In to gain access to features!</h2>
      <div>
        <div className={s['image-container']}>
          <img src={image} alt="" />
        </div>
        <Form onSubmit={submitHandler}>
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
