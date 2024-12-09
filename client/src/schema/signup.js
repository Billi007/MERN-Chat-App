import * as yup from 'yup'

const signupSchema = yup.object().shape({
    email: yup
    .string()
    .email('Invalid email address.')
    .required('Email is required.'),

    password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required."),

    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match.')
    .required('Password is required.'),

    username: yup
    .string().required('Username is required.')
    .min(3, "Username must be at least 3 characters"),

    fullname: yup
    .string().required('Full name is required.'),

    gender: yup
    .string().required('Gender is required.')
  })
  

  export default signupSchema