'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';

import InputCustom from '~/components/InputCustom';
import { login } from 'src/reduxCtrl/feature/auth/authService';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { useRouter } from 'next/navigation';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Email should be valid').required('Email is required'),
    password: Yup.string().required('Password is required'),
});
function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, isSuccess, isError, message } = useSelector((state: RootState) => state.auth);
    const route = useRouter();
    const formik = useFormik({
        initialValues: {
            email: 'Admin@gmail.com',
            password: 'admin123',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            const result = await dispatch(login(values));
            if (result.payload) {
                route.push('/');
            } else {
                return;
            }
        },
    });
    return (
        <div className="bg-gradient-to-b from-gray-blue to-light-blue min-h-screen w-full flex justify-center items-center">
            <div className="w-5/6 md:w-2/3 lg:w-2/5 xl:w-2/6">
                <form className="bg-gray p-10 mb-3 rounded-lg" onSubmit={formik.handleSubmit}>
                    <h2 className="text-7xl font-bold mb-2"> Login</h2>
                    <p className=" text-gray-blue mb-5">Please login to use the features</p>
                    <p className="text-error text-xl mb-2">
                        {isSuccess === false && isError === true && message != ''
                            ? `${message}, please try again.`
                            : ''}
                    </p>
                    <div className="col-12 mb-4">
                        <InputCustom
                            defaultValue={formik.values.email}
                            onChange={formik.handleChange('email')}
                            className="input"
                            type={'text'}
                            placeholder={'Email'}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="text-error text-xl mt-2">{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <div className="col-12 mb-4">
                        <InputCustom
                            pwdStyle={true}
                            defaultValue={formik.values.password}
                            onChange={formik.handleChange('password')}
                            className="input"
                            type={'password'}
                            placeholder={'Enter Password'}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <p className="text-error text-xl mt-2">{formik.errors.password}</p>
                        ) : null}
                    </div>
                    <div className="text-center mt-4">
                        <button
                            disabled={isLoading}
                            className="mt-5 py-4 px-10 bg-primary rounded-full text-white"
                            type={'submit'}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
