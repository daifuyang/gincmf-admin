import React from 'react';
import { Card } from 'antd';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import PostForm from './components/PostForm';

const Add = (props) => {
    const { id } = props.match.params;

    return (
        <PageHeaderWrapper
            onBack={() => {
                history.push('/portal/index');
            }}
        >
            <Card>
                <PostForm editId={id} />
            </Card>
        </PageHeaderWrapper>
    );
};

export default Add;
