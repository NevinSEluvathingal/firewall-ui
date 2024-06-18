import { createAdapter, createJsonSchema } from './adapters.js';
import { memoize } from '../memoize.js';
async function validate(schema, data) {
    const result = schema(data);
    if (result.problems == null) {
        return {
            data: result.data,
            success: true
        };
    }
    return {
        issues: Array.from(result.problems).map(({ message, path }) => ({
            message,
            path
        })),
        success: false
    };
}
function _arktype(schema, options) {
    return createAdapter({
        superFormValidationLibrary: 'arktype',
        defaults: options.defaults,
        jsonSchema: createJsonSchema(options),
        async validate(data) {
            const result = schema(data);
            if (result.problems == null) {
                return {
                    data: result.data,
                    success: true
                };
            }
            return {
                issues: Array.from(result.problems).map(({ message, path }) => ({
                    message,
                    path
                })),
                success: false
            };
        }
    });
}
function _arktypeClient(schema) {
    return {
        superFormValidationLibrary: 'arktype',
        validate: async (data) => validate(schema, data)
    };
}
export const arktype = /* @__PURE__ */ memoize(_arktype);
export const arktypeClient = /* @__PURE__ */ memoize(_arktypeClient);
