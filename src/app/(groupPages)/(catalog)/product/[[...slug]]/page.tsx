'use client';

import type { SelectProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Select as SelectMulti } from 'antd';
import Dropzone from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai';
import * as Yup from 'yup';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { AppDispatch, RootState } from '~/reduxCtrl/store';
import InputCustom from '~/components/InputCustom';
import { ImgType, OptionType, ProductType } from '~/reduxCtrl/feature/type';
import { getAllBrands } from '~/reduxCtrl/feature/brandStage/brandService';
import { getAllProdCates } from '~/reduxCtrl/feature/prodCateStage/prodCateService';
import { getAllColors } from '~/reduxCtrl/feature/colorStage/colorService';
import {
    createProduct,
    getAProduct,
    getAllProducts,
    updateAProduct,
} from '~/reduxCtrl/feature/productStage/productService';
import { uploadImages } from '~/reduxCtrl/feature/uploadImg/uploadImgService';
import { resetProductState } from '~/reduxCtrl/feature/productStage/productSlice';

const productSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    brand: Yup.string().required('Brand is required'),
    tags: Yup.string().required('Tags is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number().positive().integer().required('Price is required'),
    quantity: Yup.number().positive().integer().required('Quantity is required'),
    color: Yup.array().required('Color is required'),
    images: Yup.array().required('Images is required'),
});

function Product() {
    const dispatch = useDispatch<AppDispatch>();

    const brandState = useSelector((state: RootState) => state.brandData.brandList);
    const prodCateState = useSelector((state: RootState) => state.prodCateData.prodCateList);
    const colorState = useSelector((state: RootState) => state.colorData.colorList);
    const uploadState = useSelector((state: RootState) => state.uploadImg);
    const { product, isLoading, isSuccess, message, isError } = useSelector((state: RootState) => state.productData);

    const [color, setColor] = useState<string[]>([]);

    const [imgConvert, setImgConvert] = useState<string[]>([]);
    const [imgUrl, setImgUrl] = useState<ImgType[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    const navigate = useRouter();
    //get pathname
    const pathname = useParams();
    const slug = pathname?.slug;

    ///////////////////////////////////////
    useEffect(() => {
        dispatch(getAllBrands());
        dispatch(getAllProdCates());
        dispatch(getAllColors());
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if (slug !== undefined) {
            dispatch(getAProduct(slug[0]));
        } else {
            setImgUrl([]);
            setImgConvert([]);
            dispatch(resetProductState());
            setColor([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (product?.images) {
            setImgUrl(product?.images.map((item: ImgType) => item));
            setImgConvert(product?.images.map((item: ImgType) => item.url));
        }
    }, [product]);

    const colorOpt: SelectProps['options'] = [];
    colorState?.forEach((color: OptionType) => {
        colorOpt.push({
            label: color?.title,
            value: color?.id,
        });
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: product?.title ? product?.title : '',
            description: product?.description ? product?.description : '',
            brand: product?.brand ? product?.brand : '',
            tags: product?.tags ? product?.tags : '',
            price: product?.price ? product?.price : 0,
            quantity: product?.quantity ? product?.quantity : 0,
            category: product?.category ? product?.category : '',
            color: product.color && slug !== undefined ? color : [''],
            images: product.images ? product?.images : [],
        },
        validationSchema: productSchema,
        onSubmit: async (values: Omit<ProductType, 'slug' | 'sold' | '_id'>, { setFieldValue }) => {
            if (files && files.length > 0) {
                const response = await dispatch(uploadImages(files));
                const imgValue = await response.payload;
                setFieldValue('images', [...imgUrl, ...imgValue.map((item: ImgType) => item)]);
                setImgUrl([...imgUrl, ...imgValue.map((item: ImgType) => item)]);
            } else {
                setFieldValue('images', imgUrl);
            }
            if (slug !== undefined) {
                const productUpdate = await dispatch(updateAProduct({ id: product._id || '', body: values }));

                if (productUpdate) {
                    navigate.push('/product-list');
                    formik.resetForm();
                }
            }
            if (slug === undefined) {
                const result = await dispatch(createProduct(values));
                if (result.meta.requestStatus === 'fulfilled') {
                    setColor([]);
                    setFiles([]);
                    setImgConvert([]);
                    setImgUrl([]);
                    formik.resetForm();
                } else {
                    return;
                }
            }
        },
    });

    return (
        <div className="h-full mb-[50px]">
            <h1 className="title">{slug !== undefined ? 'Edit' : 'Add'} Product</h1>
            {isError === true && isSuccess === false && message != '' ? (
                <p className="text-error text-center text-2xl mt-2">{message}</p>
            ) : (
                ''
            )}
            <form className="flex flex-col gap-10" action="" onSubmit={formik.handleSubmit}>
                <div className="w-full">
                    <p className="my-3 font-semibold">Title:</p>
                    <InputCustom
                        type={'text'}
                        value={formik.values.title}
                        onChange={formik.handleChange('title')}
                        className=""
                        onBlur={formik.handleBlur('title')}
                        name="title"
                        lazyLoad={isLoading || uploadState.isLoading}
                    />
                    <p className="text-error text-xl mt-2">{formik.touched.title && formik.errors.title}</p>
                </div>
                <div className="w-full">
                    <p className="my-3 font-semibold">Description:</p>
                    <ReactQuill
                        className="h-[120px] mb-[50px] rounded"
                        value={formik.values.description}
                        onBlur={() => formik.handleBlur('description')}
                        onChange={formik.handleChange('description')}
                    />
                    <p className="text-error text-xl mt-2">{formik.touched.description && formik.errors.description}</p>
                </div>
                <div className="w-full flex flex-wrap">
                    <div className="w-full md:w-2/4 lg:w-1/3 pr-10">
                        <p className="my-3 font-semibold"> Select Tags:</p>
                        <select
                            name={'tags'}
                            id=""
                            className="w-full p-4 "
                            value={formik.values.tags}
                            onChange={formik.handleChange('tags')}
                            onBlur={formik.handleBlur('tags')}
                        >
                            <option value="popular">Popular</option>
                            <option value="featured ">Featured </option>
                            <option value="special">Special</option>
                        </select>
                        <p className="text-error text-xl mt-2">{formik.touched.tags && formik.errors.tags}</p>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-1/3 pr-10">
                        <p className="my-3 font-semibold">Select Brand:</p>
                        <select
                            name={'brand'}
                            id=""
                            className="w-full p-4 "
                            value={formik.values.brand}
                            onChange={formik.handleChange('brand')}
                            onBlur={formik.handleBlur('brand')}
                        >
                            <option value="">Select a Brand</option>
                            {brandState &&
                                brandState.map((el: OptionType, index: number) => (
                                    <option key={index} value={el.title}>
                                        {el.title}
                                    </option>
                                ))}
                        </select>
                        <p className="text-error text-xl mt-2">{formik.touched.brand && formik.errors.brand}</p>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-1/3 pr-10">
                        <p className="my-3 font-semibold">Select Category:</p>
                        <select
                            name={'category'}
                            id=""
                            value={formik.values.category}
                            onChange={formik.handleChange('category')}
                            onBlur={formik.handleBlur('category')}
                            className="w-full p-4"
                        >
                            <option value="">Select a category</option>
                            {prodCateState &&
                                prodCateState?.map((el: OptionType, index: number) => (
                                    <option key={index} value={el.title}>
                                        {el.title}
                                    </option>
                                ))}
                        </select>
                        <p className="text-error text-xl mt-2">{formik.touched.category && formik.errors.category}</p>
                    </div>
                </div>

                <div className="w-full flex flex-wrap">
                    <div className="w-full sm:w-2/4 lg:w-1/3 pr-10">
                        <p className="my-3 font-semibold">Price($):</p>
                        <InputCustom
                            type={'number'}
                            value={+formik.values.price}
                            name={'price'}
                            lazyLoad={isLoading || uploadState.isLoading}
                            className=""
                            onChange={formik.handleChange('price')}
                            onBlur={formik.handleBlur('price')}
                        />
                        <p className="text-error text-xl mt-2">{formik.touched.price && formik.errors.price}</p>
                    </div>
                    <div className="w-full sm:w-2/4 lg:w-1/3 pr-10">
                        <p className="my-3 font-semibold">Quantity:</p>
                        <InputCustom
                            type={'number'}
                            value={+formik.values.quantity}
                            onChange={formik.handleChange('quantity')}
                            name={'quantity'}
                            onBlur={formik.handleBlur('quantity')}
                            lazyLoad={isLoading || uploadState.isLoading}
                        />
                        <p className="text-error text-xl mt-2">{formik.touched.quantity && formik.errors.quantity}</p>
                    </div>
                </div>
                <div className="w-full sm:w-1/3 pr-10">
                    <p className="my-3 font-semibold"> Select Colors:</p>
                    <SelectMulti
                        loading={isLoading || uploadState.isLoading}
                        mode="multiple"
                        className="w-full text-xxl"
                        allowClear
                        value={color}
                        onChange={(value) => {
                            setColor([...value]);
                            formik.setFieldValue('color', value);
                        }}
                        options={colorOpt}
                    />
                    <p className="text-error text-xl">{formik.touched.color && formik.errors.color}</p>
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
                                    <Image alt="image" src={url} fill={true} style={{ objectFit: 'cover' }} />
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
                    <button
                        disabled={isLoading}
                        className="py-6 px-10 bg-primary rounded-2xl text-white"
                        type={'submit'}
                    >
                        {slug !== undefined ? 'Update' : 'Add'} Product
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Product;
