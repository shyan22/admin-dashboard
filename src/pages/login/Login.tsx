import { EyeOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, notification, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import commonService from '../../services/CommonService';

type LoginProps = {
    onSuccess: () => void
    onError: (message: string) => void
}

const Login = (props: LoginProps) => {
    const {
        onSuccess,
        onError
    } = props
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false)

    const onLogin = (values: any) => {
        setIsLoading(true);
        commonService.login(values.email, values.password)
            .then(response => {
                if (response) onSuccess();
            })
            .catch(err => {
                notification.error({
                    message: err.response.data.error
                })
                onError(err.response.data.error)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    useEffect(() => {
        form.resetFields();
    }, [showRegisterForm])

    const onRegister = (values: any) => {
        setIsLoading(true);
        commonService.register(values.email, values.password)
            .then(response => {
                if (response) {
                    onSuccess();
                    setShowRegisterForm(false);
                }
            })
            .catch(err => {
                notification.error({
                    message: err.response.data.error
                })
                onError(err.response.data.error)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <Row justify={'center'} align={'middle'} style={{ position: 'absolute', height: '100%', width: '100%', background: '#363740' }}>
            <div style={{ background: 'white', width: 400, borderRadius: '5px' }}>
                <Row style={{ padding: '20px 10px' }}>
                    <Col span={24} style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <div
                            className="logo"
                            style={{
                                height: 50,
                                background: 'rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            Logo
                        </div>
                        <h3>Dashboard Kit</h3>
                        <h1>{showRegisterForm ? "Sign Up" : "Log In"} to Dashboard Kit</h1>
                        <h4>Enter your email and password below</h4>
                    </Col>
                    <Col span={24} style={{ padding: '0px 10px' }}>
                        <Form form={form} colon={false} requiredMark={false} layout={'vertical'} onFinish={showRegisterForm ? onRegister : onLogin}>
                            <Form.Item
                                name={'email'}
                                label={'EMAIL'}
                                rules={[
                                    { type: 'email', required: true, message: 'Email is required' }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={'password'}
                                label={'PASSWORD'}
                                rules={[
                                    { required: true, message: 'Password is required' },
                                    { min: 8, message: 'Password too short' }
                                ]}
                            >
                                <Input type='password' />
                            </Form.Item>
                            <Button type='primary' htmlType='submit' block shape='round' loading={isLoading}>{showRegisterForm ? "Sign Up" : "Login"}</Button>
                            {showRegisterForm && <Button type='default' htmlType='reset' block shape='round' onClick={() => setShowRegisterForm(false)}>Cancel</Button>}
                        </Form>
                    </Col>
                    {
                        !showRegisterForm &&
                        <Col span={24} style={{ textAlign: 'center', marginTop: '20px' }}>
                            Don't have an account? <a onClick={() => setShowRegisterForm(true)}>Sign up</a>
                        </Col>
                    }
                </Row>
            </div>
        </Row>
    )
}

export default Login;