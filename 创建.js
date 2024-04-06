// 引入所需的模块
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// 定义读取和解析YAML文件的函数
function readAndParseYaml(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContents);
  } catch (e) {
    console.error(`读取或解析YAML文件时发生错误: ${e}`);
    return null;
  }
}

// 创建角色文件夹并添加占位图片的函数
function createRoleFoldersAndAddPlaceholder(basePath, roles) {
  const placeholderImagePath = path.join(basePath, '占位图.png');
  roles.forEach(role => {
    const rolePath = path.join(basePath, role);
    if (!fs.existsSync(rolePath)) {
      fs.mkdirSync(rolePath);
      console.log(`创建角色文件夹: ${role}`);
      // 复制占位图片到新建的角色文件夹
      const destinationImagePath = path.join(rolePath, '占位图.png');
      fs.copyFileSync(placeholderImagePath, destinationImagePath);
      console.log(`为 ${role} 添加了占位图片`);
    } else {
      console.log(`文件夹 ${role} 已存在`);
    }
  });
}

// 主函数
function main() {
  const yamlFilePath = 'D:\\role\\role.yaml';
  const rolesBasePath = 'D:\\role';

  // 读取和解析YAML文件
  const data = readAndParseYaml(yamlFilePath);

  if (data && data.roles) {
    // 创建角色文件夹并添加占位图片
    createRoleFoldersAndAddPlaceholder(rolesBasePath, data.roles);
  } else {
    console.error('YAML文件中没有找到角色信息');
  }
}

// 运行主函数
main();
