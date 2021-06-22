export {};

declare global {
	interface JSON {
		/* JSON doesn't support symbol keys, and number keys
		 * are coerced to strings, even in arrays */

		/**
		 * Converts a JavaScript Object Notation (JSON) string into an object.
		 * @param text A valid JSON string.
		 * @param reviver A function that transforms the results. This function is called for each member of the object.
		 * If a member contains nested objects, the nested objects are transformed before the parent object is.
		 */
		parse(text: string, reviver?: (this: unknown, key: string, value: unknown) => unknown): unknown;

		/**
		 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
		 * @param value A JavaScript value, usually an object or array, to be converted.
		 * @param replacer A function that transforms the results.
		 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
		 */
		stringify(text: string, replacer?: (this: unknown, key: string, value: unknown) => unknown, space?: string | number): unknown;
	}

	interface ArrayConstructor {
		isArray(a: unknown): a is unknown[];
	}

	interface Body {
		json(): Promise<unknown>;
	}
}
