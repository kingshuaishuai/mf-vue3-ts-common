const prompts = [
  {
    type: 'input',
    name: 'moduleName',
    message: '请输入当前项目的模块名称(唯一标识当前项目)',
    default: '',
  }
]

module.exports = {
  prompts
}