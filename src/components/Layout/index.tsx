import React, { FC, useState } from 'react'
import { IProps, Items } from './props.interface'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { AppstoreOutlined, CarOutlined, UserOutlined } from '@ant-design/icons'

const LayoutComponent: FC<IProps> = props => {
  const { children, title } = props
  const { Header, Content, Footer, Sider } = Layout
  const [collapsed, setCollapsed] = useState(false)

  const itemsMenu: Items[] = [
    { path: '/mutants', title: 'Mutantes', icon: <UserOutlined /> },
    { path: '/superpowers', title: 'SuperPoderes', icon: <AppstoreOutlined /> },
    { path: '/vehicles', title: 'Vehículos', icon: <CarOutlined /> }
  ]

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu>
          {itemsMenu.map((e, i) => (
            <Menu.Item icon={e.icon} key={i.toString()}>
              <Link href={e.path}>{e.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <h2>{title}</h2>
        </Header>
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  )
}

export default React.memo(LayoutComponent)
