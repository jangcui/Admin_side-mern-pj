'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';

import { AppDispatch, RootState } from '~/reduxCtrl/store';
import InputCustom from '~/components/InputCustom';
import { resetProdCateState } from '~/reduxCtrl/feature/prodCateStage/prodCateSlice';
import { createProdCate, getProdCate, updateAProdCate } from '~/reduxCtrl/feature/prodCateStage/prodCateService';
import { OptionType } from '~/reduxCtrl/feature/type';

const productCateSchema = Yup.object().shape({
    title: Yup.string().required('Category is required'),
});

function Category() {
    const dispatch = useDispatch<AppDispatch>();
    const categoryState = useSelector((state: RootState) => state.prodCateData);
    const { isLoading, prodCate } = categoryState;

    const navigate = useRouter();
    const pathname = useParams();
    const categoryId = pathname?.categoryId;

    useEffect(() => {
        if (categoryId !== undefined) {
            dispatch(getProdCate(categoryId[0]));
        } else {
            dispatch(resetProdCateState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: prodCate?.title || '',
        },
        validationSchema: productCateSchema,
        onSubmit: async (values: Omit<OptionType, 'id' | '_id'>) => {
            if (categoryId !== undefined) {
                await dispatch(updateAProdCate({ id: categoryId[0], title: formik.values.title }));
                formik.resetForm();
                dispatch(resetProdCateState());
            } else {
                await dispatch(createProdCate(values));
                dispatch(resetProdCateState());
                formik.resetForm();
            }
            navigate.push('/category-list');
        },
    });
    return (
        <div className="wrapper">
            <h1 className="title"> {categoryId !== undefined ? 'Edit' : 'Add'} Product Category</h1>
            <form className="form" action="" onSubmit={formik.handleSubmit}>
                <InputCustom
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    placeholder="Enter Product Category"
                    lazyLoad={isLoading}
                />
                <p className="error">{formik.touched.title && formik.errors.title}</p>
                <button className="py-6 px-10 bg-primary rounded-2xl text-white mt-10" type={'submit'}>
                    {categoryId !== undefined ? 'Update' : 'Add'} Product Category
                </button>
            </form>
        </div>
    );
}

export default Category;
