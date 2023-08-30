export type AuthType = {
    _id: string;
    fist_name: string;
    last_name: string;
    email: string;
    mobile: string;
};

export type IncomeType = {
    _id: {
        month?: string;
    };
    amount: number;
    count: number;
};

export type OptionType = {
    _id: string;
    id?: string;
    title: string;
};

export type UserType = {
    id: string;
    fist_name: string;
    last_name: string;
    email: string;
    role: string;
    mobile: string;
    isDelete: boolean;
    isBlocked: boolean;
};

export type ImgType = {
    url: string;
    asset_id?: string;
    public_id?: string;
};

export type ProductType = {
    _id: string;
    isDelete?: boolean;
    deleteDate?: Date;
    __v?: number | string;
    updatedAt?: Date;
    discountCode?: DiscountType;
    slug: string;
    color: string[];
    tags: string;
    title: string;
    sold: number;
    images: ImgType[];
    description: string;
    price: number;
    quantity: number;
    category: string;
    brand: string;
};

export interface OrderItemType {
    productId: ProductType;
    color: OptionType;
    quantity: number;
    price: number;
}
export interface ShippingInfo {
    address: string;
    city: string;
    state: string;
    country: string;
}

export interface OrderType {
    totalPrice: number;
    orderItems: OrderItemType[];
    shipping: ShippingInfo;
    user: {
        fist_name: string;
        last_name: string;
        mobile: number;
        email: string;
    };
}

export interface OrderListType {
    createdAt: Date;
    user: {
        fist_name: string;
        last_name: string;
    };
    dPrice: number;
    id: string;
    status: string;
}

export interface BlogType {
    _id: string;
    title: string;
    description: string;
    numView: number;
    category: string;
    like: number;
    author: string;
    dislike: number;
    images: ImgType[];
    deleteDate?: Date;
}

export interface DiscountType {
    _id: string;
    name: string;
    percentage: number;
    expiry: string;
}

export interface CouponType {
    _id: string;
    name: string;
    discount: number;
    expiry: string;
}

export interface TrashProductType {
    _id: string;
    title: string;
    brand: string;
    price: number;
    category: string;
    quantity: number;
    sold: number;
    deleteDate: string;
}

export interface TrashCustomerType {
    _id: string;
    fist_name: string;
    last_name: string;
    mobile: number;
    deleteDate: string;
    address: string;
}
export interface TrashBlogType {
    _id: string;
    title: string;
    category: string;
    numViews: number;
    likes: number;
    dislikes: number;
    author: string;
    deleteDate: string;
}
export interface EnquiryStageType {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    comment: string;
    status: string;
}
