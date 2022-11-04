import { UserOutlined } from '@ant-design/icons';
import { Card, Layout, Menu } from 'antd';
import React from 'react';
import logo from '../assets/react.svg'
import commonService from '../services/CommonService';

const { Header, Sider, Content } = Layout

type MainLayoutProps = {
    onLogout: () => void
    children: React.ReactNode | React.ReactNode[]
}

const MainLayout = (props: MainLayoutProps) => {

    const onLogout = () => {
        commonService.logout().then(() => props.onLogout())

    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider key={'sider'}>
                <div
                    className="logo"
                    style={{
                        height: '32px',
                        margin: '16px',
                        background: 'rgba(255, 255, 255, 0.3)'
                    }}
                >
                    Logo
                </div>
                <Menu
                    theme='dark'
                    defaultSelectedKeys={['users']}
                    items={[
                        {
                            key: 'users',
                            icon: <UserOutlined />,
                            title: 'Users',
                            label: 'Users'
                        }
                    ]}
                />
            </Sider>
            <Layout key={'content'}>
                <Content>
                    <Card
                        title={"Users"}
                        headStyle={{ background: 'transparent' }}
                        bodyStyle={{ background: 'white', margin: '10px', padding: 0 }}
                        style={{ background: 'transparent' }}
                        extra={[
                            <a key={'logout'} onClick={onLogout}>Logout</a>,
                            <UserOutlined style={{ marginLeft: '8px' }} key={'user'} />
                        ]}
                    >
                        {props.children}
                    </Card>
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout;