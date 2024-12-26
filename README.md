# eslint-plugin-api-suffix

ESLint 插件：强制要求 API 函数名以 Api 结尾

## 安装

```bash
npm install @xnng/eslint-plugin-api-suffix --save-dev
# 或者
yarn add -D @xnng/eslint-plugin-api-suffix
# 或者
pnpm add -D @xnng/eslint-plugin-api-suffix
```

## 使用

在你的 .eslintrc 配置文件中添加插件：

```json
{
  "plugins": ["@xnng/api-suffix"],
  "rules": {
    "@xnng/api-suffix/require-api-suffix": "warn"
  }
}
```

或者使用推荐配置：

```json
{
  "extends": ["plugin:@xnng/api-suffix/recommended"]
}
```

## 规则说明

这个插件包含一个规则 `require-api-suffix`，它要求所有返回包含 `url` 属性对象的函数名必须以 `Api` 结尾。

### 错误示例

```javascript
// 这会触发警告
export function getUser() {
  return {
    url: '/api/user',
    method: 'get'
  }
}

// 这也会触发警告
export function getUser() {
  return request({
    url: '/api/user',
    method: 'get'
  })
}
```

### 正确示例

```javascript
// 这是正确的
export function getUserApi() {
  return {
    url: '/api/user',
    method: 'get'
  }
}

// 这也是正确的
export function getUserApi() {
  return request({
    url: '/api/user',
    method: 'get'
  })
}
```

## 规则配置

这个规则没有其他配置选项，它会：

1. 检查所有函数声明
2. 检查函数返回值中是否包含 `url` 属性
3. 如果包含 `url` 属性，则要求函数名必须以 `Api` 结尾

## 高级配置

### 指定生效目录

如果你只想让规则在特定目录下生效，比如只在 `api` 目录下生效，可以使用 `overrides` 配置：

```json
{
  "overrides": [
    {
      "files": ["**/api/**/*.{js,ts}"],
      "plugins": ["@xnng/api-suffix"],
      "rules": {
        "@xnng/api-suffix/require-api-suffix": "warn"
      }
    }
  ]
}
```

## License

MIT
