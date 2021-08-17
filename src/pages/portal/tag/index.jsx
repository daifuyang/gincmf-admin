import React, { useRef } from 'react';
import { Popconfirm, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getPortalTags, deletePortalTag } from '@/services/portalTag';

const statusObj = { enable: 1, disable: 0 };
const status = ['停用', '启用'];

const Category = () => {
    const ref = useRef();
    // 确认删除
    const confirmDelete = async (id) => {
        const result = await deletePortalTag(id);
        if (result.code === 1) {
            message.success(result.msg);
            ref.current.reload();
            return;
        }
        message.error(result.msg);
    };
    // 批量删除
    const handleBatch = async () => {};
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            search: false,
        },
        {
            title: '标签',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '文章数',
            dataIndex: 'post_count',
            key: 'post_count',
            search: false,
        },
        {
            title: '操作',
            width: 120,
            dataIndex: 'option',
            valueType: 'option',
            render: (_, item) => (
                <>
                   
                   
                    <Popconfirm
                        title="您确定删除吗?"
                        okText="确认"
                        cancelText="取消"
                        onConfirm={() => confirmDelete(item.id)}
                        placement="topRight"
                    >
                        <a style={{ color: '#ff4d4f' }}>删除</a>
                    </Popconfirm>

                </>
            ),
        },
    ];

    const getData = async (params) => {
        const tempParams = params;
        tempParams.status = statusObj[params.status];
        const result = await getPortalTags(tempParams);
        let data = [];
        if (result.code === 1) {
            data = result.data.data;
            if(data) {
                data.map((v) => {
                    const temp = v;
                    temp.status = status[v.status];
                    return temp;
                });
            }
        }
        return { data };
    };
    return (
        <PageHeaderWrapper>
            <ProTable
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                headerTitle="标签管理"
                request={getData}
                actionRef={ref}
            />
        </PageHeaderWrapper>
    );
};
export default Category;
