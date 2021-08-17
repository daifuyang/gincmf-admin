import { authRequest } from '@/utils/request';

export async function getThemeFiles(params) {
    return authRequest('/api/admin/v1/themeFile/list', {
        method: 'GET',
        params,
    });
}
