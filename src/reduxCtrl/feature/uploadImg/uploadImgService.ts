import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';

export const uploadImages = createAsyncThunk('image/upload', async (data: File[]) => {
    const formData: FormData = new FormData();
    for (let i = 0; i < data.length; i++) {
        formData.append('images', data[i]);
    }

    try {
        const response: Response = await fetch(`${process.env.BASE_URL}/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${request.getToken()}`,
            },
            credentials: 'include',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi khi upload ảnh. Status code: ${response.status}. Lỗi: ${JSON.stringify(errorData)}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
        throw error;
    }
});
