import { RuleTester } from 'eslint'
import rule from '../rules/require-api-suffix'

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
})

ruleTester.run('require-api-suffix', rule, {
  valid: [
    {
      code: `
        function getUserApi() {
          return {
            url: '/api/user',
            method: 'get'
          }
        }
      `,
    },
    {
      code: `
        function getUserApi() {
          return request({
            url: '/api/user',
            method: 'get'
          })
        }
      `,
    },
    {
      code: `
        export function getUserApi() {
          return {
            url: '/api/user',
            method: 'get'
          }
        }
      `,
    },
    {
      code: `
        export function getUserApi() {
          return request({
            url: '/api/user',
            method: 'get'
          })
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        function getUser() {
          return {
            url: '/api/user',
            method: 'get'
          }
        }
      `,
      errors: [
        {
          message: 'API 函数 "getUser" 必须以 "Api" 结尾，因为它返回了一个包含 "url" 属性的对象',
        },
      ],
    },
    {
      code: `
        function getUser() {
          return request({
            url: '/api/user',
            method: 'get'
          })
        }
      `,
      errors: [
        {
          message: 'API 函数 "getUser" 必须以 "Api" 结尾，因为它返回了一个包含 "url" 属性的对象',
        },
      ],
    },
    {
      code: `
        export function getUser() {
          return {
            url: '/api/user',
            method: 'get'
          }
        }
      `,
      errors: [
        {
          message: 'API 函数 "getUser" 必须以 "Api" 结尾，因为它返回了一个包含 "url" 属性的对象',
        },
      ],
    },
    {
      code: `
        export function getUser() {
          return request({
            url: '/api/user',
            method: 'get'
          })
        }
      `,
      errors: [
        {
          message: 'API 函数 "getUser" 必须以 "Api" 结尾，因为它返回了一个包含 "url" 属性的对象',
        },
      ],
    },
  ],
})
