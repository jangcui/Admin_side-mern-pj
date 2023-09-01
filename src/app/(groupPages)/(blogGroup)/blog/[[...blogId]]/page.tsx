'use client';

import { useState, useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

import InputCustom from '~/components/InputCustom';
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { ImgType, OptionType } from '~/reduxCtrl/feature/type';
import { useParams, useRouter } from 'next/navigation';
import { resetBlogState } from '~/reduxCtrl/feature/blogState/blogSlice';
import { uploadImages } from '~/reduxCtrl/feature/uploadImg/uploadImgService';
import { createBlog, getBlog, updateABlog } from '~/reduxCtrl/feature/blogState/blogService';
import { getAllBlogCates } from '~/reduxCtrl/feature/blogCateStage/blogCateService';
import images from 'public/asset/images';

const blogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    images: Yup.array().required('Images is required'),
});

function CreateBlog() {
    const dispatch = useDispatch<AppDispatch>();

    const blogCateState = useSelector((state: RootState) => state.blogCateData.blogCateList);
    const blogState = useSelector((state: RootState) => state.blogData);
    const uploadState = useSelector((state: RootState) => state.uploadImg);
    const { isLoading, blog } = blogState;

    const [imgConvert, setImgConvert] = useState<string[]>([]);
    const [imgUrl, setImgUrl] = useState<ImgType[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    //get pathname
    const pathname = useParams();
    const blogId = pathname?.blogId;
    const navigate = useRouter();

    ////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getAllBlogCates());
    }, [dispatch]);

    useEffect(() => {
        if (blogId !== undefined) {
            dispatch(getBlog(blogId[0]));
        } else {
            setImgUrl([]);
            setImgConvert([]);
            dispatch(resetBlogState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (blog.images) {
            setImgUrl(blog.images.map((item: ImgType) => item));
            setImgConvert(blog.images.map((item: ImgType) => item.url));
        }
    }, [blog]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blog?.title ? blog.title : '',
            description: blog?.description ? blog.description : '',
            category: blog?.category ? blog.category : '',
            images: blog?.images ? blog.images : [],
        },
        validationSchema: blogSchema,
        onSubmit: async (values) => {
            if (files && files.length > 0) {
                const response: Response = await dispatch(uploadImages(files));
                const imgValue = await response.payload;
                formik.values.images = [...imgUrl, ...imgValue.map((item: ImgType) => item)];
                setImgUrl([...imgUrl, ...imgValue.map((item: ImgType) => item)]);
            } else {
                formik.values.images = imgUrl;
            }
            if (blogId !== undefined) {
                const blogUpdate = await dispatch(updateABlog({ id: blogId[0], body: values }));
                if (blogUpdate) {
                    navigate.push('/blog-list');
                }
            }
            if (blogId === undefined) {
                const product = await dispatch(createBlog(values));
                if (product) {
                    setFiles([]);
                    setImgConvert([]);
                    setImgUrl([]);
                    formik.resetForm();
                }
            }
        },
    });
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const url = reader.result as string;
            setImgConvert((prev) => [...prev, url]);
        };
        setFiles((prev) => [...prev, file]);
    }, []);

    return (
        <div className="h-full mb-[50px]">
            <h1 className="title">{blogId !== undefined ? 'Edit' : 'Add'} Blog</h1>
            <form className="flex flex-col gap-10" action="" onSubmit={formik.handleSubmit}>
                <div className="w-full">
                    <p className="my-3 font-semibold">Title:</p>
                    <InputCustom
                        type={'text'}
                        value={formik.values.title}
                        onChange={formik.handleChange('title')}
                        onBlur={formik.handleBlur('title')}
                        name="title"
                        lazyLoad={isLoading || uploadState.isLoading}
                    />
                    <span className="text-error text-xl mt-2">{formik.touched.title && formik.errors.title}</span>
                </div>
                <div className="w-full">
                    <p className="my-3 font-semibold">Category:</p>

                    <select
                        name={'category'}
                        id=""
                        className="w-full p-4"
                        value={formik.values.category}
                        onChange={formik.handleChange('category')}
                        onBlur={formik.handleBlur('category')}
                    >
                        <option>Select Category</option>
                        {blogCateState &&
                            blogCateState?.map((el: OptionType, index: number) => (
                                <option key={index} value={el.title}>
                                    {el.title}
                                </option>
                            ))}
                    </select>
                    <p className="text-error text-xl mt-2">{formik.touched.category && formik.errors.category}</p>
                </div>
                <div className="w-full">
                    <p className="my-3 font-semibold">Description:</p>
                    <ReactQuill
                        className="h-[150px] mb-[50px] rounded"
                        value={formik.values.description}
                        onBlur={() => formik.handleBlur('description')}
                        onChange={formik.handleChange('description')}
                    />
                    <p className="text-error text-xl mt-2">{formik.touched.description && formik.errors.description}</p>
                </div>
                <div className="w-full">
                    <p className="mt-3 mb-6 font-semibold">Images product appear in here:</p>
                </div>
                <div className="flex flex-wrap gap-10">
                    {imgConvert &&
                        imgConvert?.map((url: string, index) => (
                            <div className="relative overflow-hidden rounded" key={index}>
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 z-10"
                                    onClick={() => {
                                        setFiles((prev) => {
                                            const newFiles = [...prev];
                                            newFiles.splice(index, 1);
                                            return newFiles;
                                        });
                                        setImgConvert((prev) => {
                                            const newImgConvert = [...prev];
                                            newImgConvert.splice(index, 1);
                                            return newImgConvert;
                                        });
                                        setImgUrl((prev) => {
                                            const newImgUrl = [...prev];
                                            newImgUrl.splice(index, 1);
                                            return newImgUrl;
                                        });
                                    }}
                                >
                                    <AiOutlineClose className=" text-white icon cursor-pointer" />
                                </button>
                                <div className="w-[200px] h-[250px]">
                                    <Image
                                        alt="image"
                                        src={url || images.errorImage}
                                        fill={true}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
                <div className="w-full">
                    <Dropzone onDrop={onDrop} maxFiles={10}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div
                                    {...getRootProps()}
                                    className="h-[100px] bg-white flex flex-col justify-center items-center cursor-pointer"
                                >
                                    <input {...getInputProps()} />
                                    <p className="text-xxl mb-4">
                                        Drag drop some files here, or click to select files.
                                    </p>
                                    <p className="text-center">
                                        <AiOutlineFileImage className="icon" />
                                    </p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>

                <div className="w-full text-center">
                    <button className="py-6 px-10 bg-primary rounded-2xl text-white" type={'submit'}>
                        {blogId !== undefined ? 'Update' : 'Add'} Blog
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateBlog;
