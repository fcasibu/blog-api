import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Form, { FormControl, Input } from '../../components/Form';
import { AuthContext } from '../../context/AuthProvider';
import useForm from '../../hooks/useForm';
import image from '../../assets/sign-up.png';
import s from './Auth.module.css';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

export default function SignUp() {
  const { signUp } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const { formValues, changeHandler, errors, setErrors } =
    useForm(initialState);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await signUp(formValues);
    setIsLoading(false);

    if (response.data.errors) return setErrors(response.data.errors);

    navigate('/signin');
  };

  return (
    <>
      <h2>Sign Up to gain access to features</h2>
      <div>
        <div className={s['image-container']}>
          <img src={image} alt="" />
        </div>
        <Form onSubmit={submitHandler} isLoading={isLoading}>
          <FormControl id="username" label="Username" errors={errors}>
            <Input
              type="text"
              id="username"
              name="username"
              value={formValues.username}
              onChange={changeHandler}
            />
          </FormControl>
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
          <FormControl
            id="passwordConfirm"
            label="Confirm Password"
            errors={errors}
          >
            <Input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formValues.passwordConfirm}
              onChange={changeHandler}
            />
          </FormControl>
        </Form>
      </div>
    </>
  );
}
