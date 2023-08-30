'use client';

import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading3Quarters } from 'react-icons/ai';

interface InputProps<T> {
    value?: T | number | string | Date;
    defaultValue?: T | number | string | Date;
    onChange: (value: T) => void;
    onBlur?: (e: React.FocusEvent<any>) => void;
    placeholder?: string;
    className?: string;
    name?: string;
    type?: string;
    min?: number;
    pwdStyle?: boolean;
    lazyLoad?: boolean;
    disabled?: boolean;
}

function InputCustom<T>(props: InputProps<T>) {
    const {
        value,
        defaultValue,
        onChange,
        placeholder,
        name,
        className,
        type,
        pwdStyle = false,
        min,
        lazyLoad = false,
        disabled = false,
        onBlur,
    } = props;
    const [hidden, setHidden] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value as unknown as T);
    };

    return (
        <>
            {!pwdStyle ? (
                <div className="w-full relative">
                    <input
                        className={className}
                        type={type}
                        name={name}
                        value={value as unknown as string}
                        defaultValue={defaultValue as unknown as string}
                        onChange={handleChange}
                        placeholder={placeholder}
                        // className={cx('input', className)}
                        onBlur={onBlur}
                        disabled={disabled}
                        min={min}
                    />
                    {lazyLoad && (
                        <div className="absolute top-[10px] right-[20px] animate-spin">
                            <AiOutlineLoading3Quarters className="w-[18px] h-[18px]" />
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full relative">
                    <input
                        type={hidden ? 'text' : 'password'}
                        value={value as unknown as string}
                        defaultValue={defaultValue as unknown as string}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={className}
                        autoComplete="true"
                    />
                    <button
                        className="absolute right-10 z-10 bottom-1/4 top-1/4 cursor-pointer"
                        onClick={() => setHidden(!hidden)}
                        type={'button'}
                    >
                        {!hidden ? <AiFillEye className="icon" /> : <AiFillEyeInvisible className="icon" />}
                    </button>
                </div>
            )}
        </>
    );
}

export default InputCustom;
