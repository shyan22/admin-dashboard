import { Avatar, Card, Drawer, notification, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout';
import commonService from '../../services/CommonService';

type UsersProps = {}

export type UserResponse = {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: UserItem[]
}

type UserItem = {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

const defaultResponse: UserResponse = {
    data: [],
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0
}

export type UserRequest = { page?: number, per_page?: number }

const Users = (props: UsersProps) => {
    const [_data, setData] = useState<UserResponse>(defaultResponse);
    const [params, setParams] = useState<UserRequest>({ page: 1, per_page: 5 });
    const [isLoading, setIsLoading] = useState(false);
    const [drawerDetails, setDrawerDetails] = useState<{ open: boolean, user?: UserItem }>({ open: false });

    useEffect(() => {
        fetchUsers(params);
    }, [])

    const fetchUsers = (req: UserRequest) => {
        setIsLoading(true);
        commonService.getUsers(req)
            .then((response) => {
                setData(response)
            })
            .catch(() => notification.error({ message: "Something went wrong!!!" }))
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <Card
            title={'All Users'}
            bordered={false}
            headStyle={{ border: 0 }}
        >
            <Table
                dataSource={_data.data}
                loading={isLoading}
                pagination={{
                    current: params.page,
                    pageSize: params.per_page,
                    total: _data.total,
                    pageSizeOptions: [5, 10, 20]
                }}
                onChange={(pagination) => {
                    const reqParams = { ...params, page: pagination.current, per_page: pagination.pageSize };
                    setParams(reqParams);
                    fetchUsers(reqParams);
                }}
                rowKey={(record) => record.id}
                onRow={record => {
                    return {
                        onClick: () => {
                            setDrawerDetails({ open: true, user: record });
                        }
                    }
                }}
                columns={[
                    {
                        title: 'User',
                        dataIndex: ['id'],
                        render: (value, record) => {
                            return (
                                <>
                                    <Avatar src={record.avatar} />
                                    <span style={{ marginLeft: '4px' }}>{record.first_name} {record.last_name}</span>
                                </>
                            )
                        }
                    },
                    {
                        title: 'Email',
                        dataIndex: ['email']
                    }
                ]}
            />
            <Drawer
                placement='right'
                width={'50%'}
                visible={drawerDetails.open}
                open={drawerDetails.open}
                zIndex={1000}
                onClose={() => setDrawerDetails({ open: false })}
            >
                <Card>
                    <Card.Meta
                        avatar={<Avatar src={drawerDetails.user?.avatar} />}
                        title={<>{drawerDetails.user?.first_name} {drawerDetails.user?.last_name}</>}
                        description={drawerDetails.user?.email}
                    />
                </Card>
            </Drawer>
        </Card>
    );
}

export default Users;