'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { createCoupon, getCoupon, updateACoupon } from '~/reduxCtrl/feature/couponStage/couponService';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { resetCouponState } from '~/reduxCtrl/feature/couponStage/couponSlice';
import { CouponType } from '~/reduxCtrl/feature/type';
import InputCustom from '~/components/InputCustom';

const couponSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    expiry: Yup.date().required('Expiry is required'),
    discount: Yup.number().positive().integer().required('Discount is required'),
});

function AddCoupon({ params }: { params: { couponId: string } }) {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, coupon } = useSelector((state: RootState) => state.couponData);

    const navigate = useRouter();

    useEffect(() => {
        if (params.couponId !== undefined) {
            dispatch(getCoupon(params.couponId[0]));
        } else {
            dispatch(resetCouponState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: coupon?.name ? coupon?.name : '',
            expiry: coupon?.expiry ? new Date(coupon.expiry).toISOString().substring(0, 10) : '',
            discount: coupon?.discount ? coupon?.discount : 0,
        },
        validationSchema: couponSchema,
        onSubmit: async (values: Omit<CouponType, '_id'>) => {
            if (params.couponId !== undefined) {
                await dispatch(updateACoupon({ id: params.couponId[0], data: values }));
                navigate.push('/coupon-list');
            } else {
                await dispatch(createCoupon(values));
                formik.resetForm();
            }
        },
    });

    return (
        <div className="wrapper">
            <h1 className="title">{params.couponId !== undefined ? 'Edit' : 'Create'} Coupon</h1>
            <form className="form" action="" onSubmit={formik.handleSubmit}>
                <div className="mb-10">
                    <h4 className="mb-2">Name:</h4>
                    <InputCustom
                        type={'text'}
                        value={formik.values.name}
                        onChange={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                        className="input"
                        placeholder="Enter Name Coupon"
                        lazyLoad={isLoading}
                    />
                    <p className="text-error">{formik.touched.name && formik.errors.name}</p>
                </div>
                <div className="mb-10">
                    <h4 className="mb-2">Expiry :</h4>
                    <InputCustom
                        type={'date'}
                        value={formik.values.expiry.toString()}
                        onChange={formik.handleChange('expiry')}
                        onBlur={formik.handleBlur('expiry')}
                        className="input"
                        placeholder="Enter Expiry"
                    />
                    <p className="text-error">{formik.touched.expiry && formik.errors.expiry}</p>
                </div>
                <div className="mb-10">
                    <h4 className="mb-2">Percent Discount(%) :</h4>
                    <InputCustom
                        type={'number'}
                        value={formik.values.discount}
                        onChange={formik.handleChange('discount')}
                        className="input"
                        onBlur={formik.handleBlur('discount')}
                        placeholder="Enter Expiry"
                        lazyLoad={isLoading}
                    />
                    <p className="text-error">{formik.touched.discount && formik.errors.discount}</p>
                </div>
                <button type={'submit'} className="py-6 px-10 bg-primary rounded-2xl text-white mt-10">
                    {params.couponId !== undefined ? 'Update' : 'Create'} Coupon
                </button>
            </form>
        </div>
    );
}

export default AddCoupon;
