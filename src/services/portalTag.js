import { authRequest } from '@/utils/request';

export async function getPortalTags(params) {
    return authRequest('/api/admin/v1/portal/tag', {
        method: 'GET',
        params,
    });
}

export async function deletePortalTag(id, params) {
    return authRequest(`/api/admin/v1/portal/tag/${id}`, {
        method: 'DELETE',
        data: params,
    });
}
