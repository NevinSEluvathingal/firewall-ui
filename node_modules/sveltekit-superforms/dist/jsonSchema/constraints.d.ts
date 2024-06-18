import type { SuperStruct } from '../superStruct.js';
import type { JSONSchema } from './index.js';
export type InputConstraint = Partial<{
    pattern: string;
    min: number | string;
    max: number | string;
    required: boolean;
    step: number | 'any';
    minlength: number;
    maxlength: number;
}>;
export type InputConstraints<T extends Record<string, unknown>> = SuperStruct<T, InputConstraint>;
export declare function constraints<T extends Record<string, unknown>>(schema: JSONSchema): InputConstraints<T>;
