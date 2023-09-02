'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { createColor, getColor, updateAColor } from '~/reduxCtrl/feature/colorStage/colorService';
import { resetColorState } from '~/reduxCtrl/feature/colorStage/colorSlice';
import { OptionType } from '~/reduxCtrl/feature/type';
import InputCustom from '~/components/InputCustom';

const colorSchema = Yup.object().shape({
    title: Yup.string().required('Color is required'),
});

function Color({ params }: { params: { colorId: string } }) {
    const dispatch = useDispatch<AppDispatch>();
    const colorState = useSelector((state: RootState) => state.colorData);
    const { isLoading, color } = colorState;

    const navigate = useRouter();

    useEffect(() => {
        if (params.colorId !== undefined) {
            dispatch(getColor(params.colorId[0]));
        } else {
            dispatch(resetColorState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: color?.title || '',
        },
        validationSchema: colorSchema,
        onSubmit: (values: Omit<OptionType, 'id' | '_id'>) => {
            if (params.colorId !== undefined) {
                dispatch(updateAColor({ id: params.colorId[0], title: formik.values.title }));
                dispatch(resetColorState());
                formik.resetForm();
            } else {
                formik.resetForm();
                dispatch(createColor(values));
            }
            navigate.push('/color-list');
        },
    });
    return (
        <div className="wrapper">
            <h1 className="title"> {params.colorId !== undefined ? 'Edit' : 'Add'} Color</h1>
            <form className="form" action="" onSubmit={formik.handleSubmit}>
                <h2 className={`mb-3 font-semibold`}>{formik.values.title}</h2>
                <InputCustom
                    type={'color'}
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    className="h-[80px]"
                    placeholder="Enter Color Title"
                    lazyLoad={isLoading}
                />
                <p className="text-error">{formik.touched.title && formik.errors.title}</p>

                <button className="py-6 px-10 bg-primary rounded-2xl text-white mt-10" type={'submit'}>
                    {params.colorId !== undefined ? 'Update' : 'Add'} Color
                </button>
            </form>
        </div>
    );
}
export default Color;
