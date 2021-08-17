import React from 'react';
import { Card } from 'antd';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import PostForm from './components/PostForm';

const Add = () => {
    return (
        <PageHeaderWrapper
            onBack={() => {
                history.push('/portal/index');
            }}
        >
            <Card>
                <PostForm />
            </Card>
        </PageHeaderWrapper>
    );
};

export default Add;
