import { Rule } from "eslint";
import {
  FunctionDeclaration,
  ReturnStatement,
  CallExpression,
  Property,
  Identifier,
  SpreadElement,
} from "estree";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "强制要求 API 函数名以 Api 结尾",
      category: "Stylistic Issues",
      recommended: true,
    },
    fixable: undefined,
    schema: [],
  },

  create(context: Rule.RuleContext) {
    /**
     * 检查对象是否包含 url 属性
     */
    function hasUrlProperty(properties: (Property | SpreadElement)[]): boolean {
      return properties.some((prop): prop is Property & { key: Identifier } => {
        return (
          prop.type === "Property" &&
          prop.key.type === "Identifier" &&
          prop.key.name === "url"
        );
      });
    }

    /**
     * 检查函数调用的参数是否包含 url 属性
     */
    function checkCallExpression(node: CallExpression): boolean {
      return node.arguments.some((arg) => {
        return (
          arg.type === "ObjectExpression" && hasUrlProperty(arg.properties)
        );
      });
    }

    /**
     * 检查返回语句是否返回包含 url 属性的对象
     */
    function checkReturnStatement(statement: ReturnStatement): boolean {
      if (!statement.argument) return false;

      const returnedValue = statement.argument;

      // 检查直接返回的对象
      if (returnedValue.type === "ObjectExpression") {
        return hasUrlProperty(returnedValue.properties);
      }

      // 检查函数调用的参数
      if (returnedValue.type === "CallExpression") {
        return checkCallExpression(returnedValue);
      }

      return false;
    }

    /**
     * 检查函数声明
     */
    function checkFunctionDeclaration(node: FunctionDeclaration) {
      if (!node.id || !node.body || node.body.type !== "BlockStatement") return;

      const functionName = node.id.name;
      const { body } = node.body;

      // 遍历所有的 return 语句
      const hasUrlReturn = body.some((statement): boolean => {
        return (
          statement.type === "ReturnStatement" &&
          checkReturnStatement(statement)
        );
      });

      if (hasUrlReturn && !functionName.endsWith("Api")) {
        context.report({
          node,
          message: `API 函数 "${functionName}" 必须以 "Api" 结尾，因为它返回了一个包含 "url" 属性的对象`,
        });
      }
    }

    return {
      FunctionDeclaration: checkFunctionDeclaration,
    };
  },
};

export = rule;
