/** Used to generate unique IDs. */
const idCounter = {};

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @param prefix The value to prefix the ID with.
 * @returns Returns the unique ID.
 * @example
 *
 * uniqueId('contact_')
 * // => 'contact_104'
 *
 * uniqueId()
 * // => '105'
 */
export function uniqueId(prefix = '$ids$'): string {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  const id = ++idCounter[prefix];
  if (prefix === '$ids$') {
    return `${id}`;
  }

  return `${prefix + id}`;
}
