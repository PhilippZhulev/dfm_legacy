/**
 * clamp
 * @param  {} num
 * @param  {} min
 * @param  {} max
 * @public
 */
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default clamp;
