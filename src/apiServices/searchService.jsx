import * as request from '../utlis/request';

export const search = async () => {
    try {
        const res = await request.get('sinhviens');

        return res;
    } catch (error) {
        console.log(error);
    }
}