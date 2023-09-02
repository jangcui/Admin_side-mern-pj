'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { createBrand, getBrand, updateABrand } from '~/reduxCtrl/feature/brandStage/brandService';
import { resetBrandState } from '~/reduxCtrl/feature/brandStage/brandSlice';
import InputCustom from '~/components/InputCustom';
import { OptionType } from '~/reduxCtrl/feature/type';

const brandSchema = Yup.object().shape({
    title: Yup.string().required('Brand is required'),
});

function Brand({ params }: { params: { brandId: string } }) {
    const dispatch = useDispatch<AppDispatch>();
    const brandState = useSelector((state: RootState) => state.brandData);

    const navigate = useRouter();

    const { isLoading, brand } = brandState;

    useEffect(() => {
        if (params.brandId !== undefined) {
            dispatch(getBrand(params.brandId[0]));
        } else {
            dispatch(resetBrandState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brand?.title || '',
        },
        validationSchema: brandSchema,
        onSubmit: async (values: Omit<OptionType, 'id' | '_id'>) => {
            if (params.brandId !== undefined) {
                await dispatch(updateABrand({ id: params.brandId[0], title: formik.values.title }));
                formik.resetForm();
                navigate.push('/brand-list');
                dispatch(resetBrandState());
            } else {
                await dispatch(createBrand(values));
                formik.resetForm();
                dispatch(resetBrandState());
            }
        },
    });

    return (
        <div>
            <h1 className="title">{params.brandId !== undefined ? 'Edit' : 'Add'} Brand.</h1>
            <form className="form" action="" onSubmit={formik.handleSubmit}>
                <p className="my-3 font-semibold">Name Brand:</p>
                <InputCustom
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    className="input"
                    placeholder="Enter Brand Title"
                    lazyLoad={isLoading}
                />
                <p className="error">{formik.touched.title && formik.errors.title}</p>
                <button className="py-6 px-10 bg-primary rounded-2xl text-white mt-10" type={'submit'}>
                    {params.brandId !== undefined ? 'Update' : 'Add'} Brand.
                </button>
            </form>
        </div>
    );
}

export default Brand;
