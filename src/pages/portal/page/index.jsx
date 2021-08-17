import React, { useState, useRef } from 'react';
import { Button, Popconfirm, Divider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getPortals, deletePortal, deletePortals } from '@/services/portal';
import { history } from 'umi';

const statusObj = { enable: 1, disable: 0 };
const status = ['停用', '启用'];

const Index = () => {
    const [total, setTotal] = useState(0);
    const ref = useRef();
    // 确认删除
    const confirmDelete = async (id) => {
        console.log('id', id);
        const result = await deletePortal(id);
        if (result.code === 1) {
            ref.current.reload();
            message.success(result.msg);
            return;
        }
        message.error(result.msg);
    };
    // 批量删除
    const handleBatch = async (selectedRowKeys) => {
        console.log('selectedRowKeys', selectedRowKeys);

        const result = await deletePortals({ ids: selectedRowKeys });
        if (result.code === 1) {
            ref.current.reload();
            message.success(result.msg);
            return;
        }
        message.error(result.msg);
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            search: false,
        },
        {
            title: '标题',
            dataIndex: 'post_title',
            key: 'post_title',
            width: 200,
            search: false,
        },
        {
            title: '作者',
            dataIndex: 'user_login',
            key: 'user_login',
            width: 100,
            search: false,
        },
        {
            title: '发布时间',
            dataIndex: 'published_time',
            key: 'published_time',
            width: 100,
            search: false,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
        },
        {
            title: '操作',
            width: 100,
            dataIndex: 'option',
            valueType: 'option',
            render: (_, item) => (
                <>
                    <a
                        onClick={() => {
                            history.push(`/portal/page/edit/${item.id}`);
                        }}
                    >
                        编辑
                    </a>

                    <Divider type="vertical" />

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
        tempParams.post_type = 2;
        tempParams.status = statusObj[params.status];
        const result = await getPortals(tempParams);
        let data = [];
        setTotal(0);
        if (result.code === 1) {
            data = result.data.data;
            data.map((v) => {
                const temp = v;
                temp.status = status[v.status];
                return temp;
            });
            setTotal(result.data.total);
        } else {
            message.error(result.msg);
        }
        return { data };
    };

    return (
        <PageHeaderWrapper>
            <ProTable
                columns={columns}
                rowKey="id"
                pagination={{ total: total, pageSize: 10 }}
                rowSelection={{}}
                headerTitle="页面列表"
                request={getData}
                actionRef={ref}
                toolBarRender={(_, { selectedRowKeys }) => [
                    <Button
                        key="add"
                        type="primary"
                        onClick={() => {
                            history.push('/portal/page/add');
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                    selectedRowKeys && selectedRowKeys.length > 0 && (
                        <Popconfirm
                            key="del"
                            title="您确定全部删除吗?"
                            okText="确认"
                            cancelText="取消"
                            onConfirm={() => {
                                handleBatch(selectedRowKeys);
                            }}
                            placement="topRight"
                        >
                            <Button danger>批量删除</Button>
                        </Popconfirm>
                    ),
                ]}
            />
        </PageHeaderWrapper>
    );
};
export default Index;
