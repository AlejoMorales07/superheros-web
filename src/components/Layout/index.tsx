import { AppstoreOutlined, CarOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { IProps, Items } from './props.interface'

const LayoutComponent: FC<IProps> = props => {
  const { children, title, create } = props
  const { Header, Content, Footer, Sider } = Layout
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('0')
  const router = useRouter()

  const itemsMenu: Items[] = [
    { path: '/mutants', title: 'Mutantes', icon: <UserOutlined /> },
    { path: '/superpowers', title: 'Super Poderes', icon: <AppstoreOutlined /> },
    { path: '/vehicles', title: 'Vehículos', icon: <CarOutlined /> }
  ]

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  useEffect(() => {
    if (router.pathname === '/superpowers') {
      setSelectedKey('1')
    } else if (router.pathname === '/vehicles') {
      setSelectedKey('2')
    }
  }, [router])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu theme="dark" selectedKeys={[selectedKey]}>
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
          {create}
        </Header>
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  )
}

export default React.memo(LayoutComponent)
