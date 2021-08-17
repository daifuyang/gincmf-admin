import { authRequest } from '@/utils/request';

export async function getPortals(params) {
    return authRequest('/api/admin/v1/portal/article', {
        method: 'GET',
        params,
    });
}

export async function getPortal(id, params) {
    return authRequest(`/api/admin/v1/portal/article/${id}`, {
        method: 'GET',
        params,
    });
}

export async function getPage(id, params) {
    return authRequest(`/api/admin/v1/portal/page/${id}`, {
        method: 'GET',
        params,
    });
}

export async function addPortal(params) {
    return authRequest('/api/admin/v1/portal/article', {
        requestType:'json',
        method: 'POST',
        data: params,
    });
}

export async function updatePortal(id, params) {
    return authRequest(`/api/admin/v1/portal/article/${id}`, {
        requestType:'json',
        method: 'POST',
        data: params,
    });
}

export async function deletePortal(id, params) {
    return authRequest(`/api/admin/v1/portal/article/${id}`, {
        method: 'DELETE',
        data: params,
    });
}

export async function deletePortals(params) {
    return authRequest('/api/admin/v1/portal/article', {
        method: 'DELETE',
        params,
    });
}
