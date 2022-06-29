import { LockOutlined } from '@ant-design/icons'
import translations from './translations'

export default {
  id: 'lockwait',
  routerPrefix: '/lockwait',
  icon: LockOutlined,
  translations,
  reactRoot: () => import('.'),
}
