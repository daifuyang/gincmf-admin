import React, { useEffect, useState } from 'react';
import { Form, Select, Row, Col } from 'antd';

import { getThemeFiles } from '@/services/themeFile';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
    },
};

const Tpl = (props) => {
    const [tpl, setTpl] = useState({
        list: [],
        article: [],
    });

    const { onFormChange, form, formData } = props;
    useEffect(() => {
        // 编辑
        if (formData) {
            form.setFieldsValue(formData);
        }
    }, [formData]);

    useEffect(() => {
        const init = async () => {
            const result = await getThemeFiles({ theme: 'leshy' });
            if (result.code === 1) {
                setTpl(result.data);
            }
        };
        init();
    }, []);

    return (
        <Row>
            <Col span={12}>
                <Form form={form} onValuesChange={onFormChange} {...formItemLayout}>
                    <Form.Item
                        label="列表模板"
                        name="list_tpl"
                        rules={[{ required: true, message: '列表模板不能为空!' }]}
                    >
                        <Select placeholder="请选择模板">
                            {tpl.list.map((item, index) => (
                                <Option key={index} value={item.file}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="文章模板"
                        name="one_tpl"
                        rules={[{ required: true, message: '文章模板不能为空!' }]}
                    >
                        <Select placeholder="请选择模板">
                            {tpl.article.map((item, index) => (
                                <Option key={index} value={item.file}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Tpl;
