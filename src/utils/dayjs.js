// dayjs配置文件
// 1.下载包 yarn add dayjs
// 2.引入dayjs包
// 3.下载需要使用的插件
// 4.默认语言是英语，修改成中文
import dayjs from 'dayjs'
// 引入relativeTime插件
const relativeTime = require('dayjs/plugin/relativeTime')
// 4-1引入中文包
require('dayjs/locale/zh-cn')
// 4-2全局使用简体中文
dayjs.locale('zh-cn')

dayjs.extend(relativeTime)

export default dayjs
