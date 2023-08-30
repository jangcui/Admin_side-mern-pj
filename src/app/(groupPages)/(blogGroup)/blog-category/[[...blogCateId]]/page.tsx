'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '~/reduxCtrl/store';
import InputCustom from '~/components/InputCustom';
import { createBlogCate, getBlogCate, updateABlogCate } from '~/reduxCtrl/feature/blogCateStage/blogCateService';
import { resetBlogCateState } from '~/reduxCtrl/feature/blogCateStage/blogCateSlice';
import { OptionType } from '~/reduxCtrl/feature/type';

const blogCateSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
});

function BlogCategory() {
    const dispatch = useDispatch<AppDispatch>();
    const blogCateState = useSelector((state: RootState) => state.blogCateData);
    const { isLoading, blogCate } = blogCateState;

    const navigate = useRouter();
    const pathname = useParams();
    const blogCateId = pathname?.blogCateId;

    useEffect(() => {
        if (blogCateId !== undefined) {
            dispatch(getBlogCate(blogCateId[0]));
        } else {
            dispatch(resetBlogCateState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogCate?.title || '',
        },
        validationSchema: blogCateSchema,
        onSubmit: async (values: Omit<OptionType, 'id' | '_id'>) => {
            if (blogCateId !== undefined) {
                await dispatch(updateABlogCate({ id: blogCateId[0], title: formik.values.title }));
                formik.resetForm();
                dispatch(resetBlogCateState());
            } else {
                await dispatch(createBlogCate(values));
                dispatch(resetBlogCateState());
                formik.resetForm();
            }
            navigate.push('/blog-category-list');
        },
    });
    return (
        <div className="wrapper">
            <h1 className="title">{blogCateId !== undefined ? 'Edit' : 'Add'} Blog Category</h1>
            <form className="form" action="" onSubmit={formik.handleSubmit}>
                <InputCustom
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    placeholder="Enter blog category Title"
                    lazyLoad={isLoading}
                />
                <p className="text-error">{formik.touched.title && formik.errors.title}</p>

                <button className="py-6 px-10 bg-primary rounded-2xl text-white mt-10" type={'submit'}>
                    {blogCateId !== undefined ? 'Update' : 'Add'} Blog Category
                </button>
            </form>
        </div>
    );
}

export default BlogCategory;
