import { type ValidationAdapter, type AdapterOptions, type ClientValidationAdapter } from './adapters.js';
import type { ObjectSchema } from 'joi';
export declare const joi: <T extends ObjectSchema<any>>(schema: T, options?: AdapterOptions<T> | undefined) => ValidationAdapter<Record<string, unknown>>;
export declare const joiClient: <T extends ObjectSchema<any>>(schema: T) => ClientValidationAdapter<Record<string, unknown>>;
