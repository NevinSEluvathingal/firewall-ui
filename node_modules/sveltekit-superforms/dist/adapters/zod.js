import { createAdapter } from './adapters.js';
import { zodToJsonSchema as zodToJson } from 'zod-to-json-schema';
import { memoize } from '../memoize.js';
const defaultOptions = {
    dateStrategy: 'integer',
    pipeStrategy: 'output'
};
/* @__NO_SIDE_EFFECTS__ */
export const zodToJSONSchema = (...params) => {
    params[1] = typeof params[1] == 'object' ? { ...defaultOptions, ...params[1] } : defaultOptions;
    return zodToJson(...params);
};
async function validate(schema, data) {
    const result = await schema.safeParseAsync(data);
    if (result.success) {
        return {
            data: result.data,
            success: true
        };
    }
    return {
        issues: result.error.issues.map(({ message, path }) => ({ message, path })),
        success: false
    };
}
function _zod(schema, options) {
    return createAdapter({
        superFormValidationLibrary: 'zod',
        validate: async (data) => validate(schema, data),
        jsonSchema: options?.jsonSchema ?? zodToJSONSchema(schema),
        defaults: options?.defaults
    });
}
function _zodClient(schema) {
    return {
        superFormValidationLibrary: 'zod',
        validate: async (data) => validate(schema, data)
    };
}
export const zod = /* @__PURE__ */ memoize(_zod);
export const zodClient = /* @__PURE__ */ memoize(_zodClient);
