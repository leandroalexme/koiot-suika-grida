/**
 * Fractional Indexing Utils - Seguindo padrão Suika
 * Adaptado para Koiot com CanvasKit
 * 
 * Baseado em: rocicorp/fractional-indexing
 * Implementação simplificada para evitar dependência externa
 */

// Character set used for fractional indexing (base62)
const BASE_62_DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Generate a single key between two points
 * @param a start key (null for beginning)
 * @param b end key (null for end)
 * @returns fractional index string
 */
export function generateKeyBetween(a: string | null, b: string | null): string {
  if (a === null && b === null) {
    return 'a0';
  }
  
  if (a === null) {
    // Insert at beginning
    return getKeyBefore(b!);
  }
  
  if (b === null) {
    // Insert at end
    return getKeyAfter(a);
  }
  
  // Insert between a and b
  return getMidpoint(a, b);
}

/**
 * Generate N keys between two points
 * @param a start key (null for beginning)
 * @param b end key (null for end)  
 * @param n number of keys to generate
 * @returns array of fractional index strings
 */
export function generateNKeysBetween(
  a: string | null, 
  b: string | null, 
  n: number
): string[] {
  if (n === 0) return [];
  if (n === 1) return [generateKeyBetween(a, b)];
  
  const keys: string[] = [];
  let left = a;
  
  for (let i = 0; i < n; i++) {
    const right = i === n - 1 ? b : null;
    const key = generateKeyBetween(left, right);
    keys.push(key);
    left = key;
  }
  
  return keys;
}

/**
 * Get a key before the given key
 */
function getKeyBefore(key: string): string {
  if (key === 'a0') {
    return 'Zz';
  }
  
  // Simple approach: decrement the last character
  const chars = key.split('');
  const lastChar = chars[chars.length - 1];
  const lastCharIndex = BASE_62_DIGITS.indexOf(lastChar);
  
  if (lastCharIndex > 0) {
    chars[chars.length - 1] = BASE_62_DIGITS[lastCharIndex - 1];
    return chars.join('');
  }
  
  // If we can't decrement, add a prefix
  return key.slice(0, -1) + BASE_62_DIGITS[BASE_62_DIGITS.length - 1] + BASE_62_DIGITS[BASE_62_DIGITS.length - 1];
}

/**
 * Get a key after the given key
 */
function getKeyAfter(key: string): string {
  // Simple approach: increment or append
  const chars = key.split('');
  const lastChar = chars[chars.length - 1];
  const lastCharIndex = BASE_62_DIGITS.indexOf(lastChar);
  
  if (lastCharIndex < BASE_62_DIGITS.length - 1) {
    chars[chars.length - 1] = BASE_62_DIGITS[lastCharIndex + 1];
    return chars.join('');
  }
  
  // If we can't increment, append
  return key + '0';
}

/**
 * Get midpoint between two keys
 */
function getMidpoint(a: string, b: string): string {
  // Simplified midpoint calculation
  // In a full implementation, this would be more sophisticated
  const aNum = stringToNumber(a);
  const bNum = stringToNumber(b);
  const midNum = (aNum + bNum) / 2;
  return numberToString(midNum);
}

/**
 * Convert fractional index string to number (simplified)
 */
function stringToNumber(str: string): number {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const charIndex = BASE_62_DIGITS.indexOf(str[i]);
    result = result * BASE_62_DIGITS.length + charIndex;
  }
  return result;
}

/**
 * Convert number to fractional index string (simplified)
 */
function numberToString(num: number): string {
  if (num === 0) return '0';
  
  let result = '';
  while (num > 0) {
    result = BASE_62_DIGITS[num % BASE_62_DIGITS.length] + result;
    num = Math.floor(num / BASE_62_DIGITS.length);
  }
  return result || '0';
}

/**
 * Compare two fractional index strings
 * @param a first key
 * @param b second key
 * @returns -1 if a < b, 1 if a > b, 0 if equal
 */
export function compareKeys(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Sort array of objects by their fractional index
 * @param items array of objects with getSortIndex method
 * @returns sorted array
 */
export function sortByFractionalIndex<T extends { getSortIndex(): string }>(items: T[]): T[] {
  return items.sort((a, b) => compareKeys(a.getSortIndex(), b.getSortIndex()));
}