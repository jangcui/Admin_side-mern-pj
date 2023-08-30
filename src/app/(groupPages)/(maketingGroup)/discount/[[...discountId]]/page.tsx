'use client';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { useEffect } from 'react';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { useParams, useRouter } from 'next/navigation';
import { createDiscount, getDiscount, updateADiscount } from '~/reduxCtrl/feature/discountStage/discountService';
import { resetDiscountState } from '~/reduxCtrl/feature/discountStage/discountLice';
import InputCustom from '~/components/InputCustom';
import { DiscountType } from '~/reduxCtrl/feature/type';

const couponSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    expiry: Yup.date().required('Expiry is required'),
    percentage: Yup.number().positive().integer().required('Discount is required'),
});

function CreateDiscount() {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, discount } = useSelector((state: RootState) => state.discountData);

    const navigate = useRouter();
    const pathname = useParams();
    const discountId = pathname?.discountId;

    useEffect(() => {
        if (discountId !== undefined) {
            dispatch(getDiscount(discountId[0]));
        } else {
            dispatch(resetDiscountState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: discount?.name ? discount?.name : '',
            expiry: discount?.expiry ? new Date(discount.expiry).toISOString().substring(0, 10) : '',
            percentage: discount?.percentage ? discount?.percentage : 0,
        },
        validationSchema: couponSchema,
        onSubmit: async (values: Omit<DiscountType, '_id'>) => {
            if (discountId !== undefined) {
                await dispatch(updateADiscount({ id: discountId[0], data: values }));
                navigate.push('/discount-list');
            } else {
                await dispatch(createDiscount(values));
                formik.resetForm();
            }
        },
    });

    return (
        <div className="wrapper">
            <h1 className="title">{discountId !== undefined ? 'Edit' : 'Create New'} discount</h1>
            <form className="form" action="" onSubmit={formik.handleSubmit}>
                <div className="mb-10">
                    <h4 className="mb-2">Name:</h4>
                    <InputCustom
                        type={'text'}
                        value={formik.values.name}
                        onChange={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                        placeholder="Enter Discount Code"
                        lazyLoad={isLoading}
                    />
                    <p className="text-error">{formik.touched.name && formik.errors.name}</p>
                </div>
                <div className="mb-10">
                    <h4 className="mb-2">Expiry :</h4>
                    <InputCustom
                        type={'date'}
                        value={formik?.values?.expiry}
                        onChange={formik.handleChange('expiry')}
                        onBlur={formik.handleBlur('expiry')}
                        placeholder="Enter Expiry"
                    />
                    <p className="text-error">{formik.touched.expiry && formik.errors.expiry}</p>
                </div>
                <div className="mb-10">
                    <h4 className="mb-2">Percent Discount(%) :</h4>
                    <InputCustom
                        type={'number'}
                        value={formik.values.percentage}
                        onChange={formik.handleChange('percentage')}
                        onBlur={formik.handleBlur('percentage')}
                        placeholder="Enter Expiry"
                        lazyLoad={isLoading}
                    />
                    <p className="text-error">{formik.touched.percentage && formik.errors.percentage}</p>
                </div>
                <button className="py-6 px-10 bg-primary rounded-2xl text-white mt-10" type={'submit'}>
                    {discountId !== undefined ? 'Update' : 'Create New'} Coupon
                </button>
            </form>
        </div>
    );
}

export default CreateDiscount;
