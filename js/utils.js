/**
 * Вернет целое положительное в диапазоне `min`, `max`
 * @param {number} min
 * @param {number} max
 */
export const randomIntInRange = (min, max) => {
  const range = [min, max];

  if (!range.every(Number.isInteger)) {
    throw new Error(`Нецелочисленный диапазон: [${range}]`);
  }

  if (min < 0 || max < 0 || min > max) {
    throw new Error(`Неподдерживаемый диапазон: [${range}]`);
  }

  return Math.round((max - min) * Math.random() + min);
};

/**
 * @template Item
 * @param {Item[]} items
 */
export const getRandomArrayItem = (items) => {
  const lastIndex = Math.max(0, items.length - 1);
  const index = randomIntInRange(0, lastIndex);

  return items[index];
};

const generatedIds = [];

export const generateId = () => {
  const id = randomIntInRange(1, Number.MAX_SAFE_INTEGER);

  if (!generatedIds.includes(id)) {
    generatedIds.push(id);

    return id;
  }

  return generateId();
};

/**
 * Проверит максимальную длину строки
 * @param {string} value
 * @param {number} maxLength По умолчанию 100
 */
export const validateMaxLength = (value, maxLength = 100) => value.length <= maxLength;

/**
 * @param {Event & {target: Element}} event
 */
export const traceEvent = (event) => {
  const {trace} = console;
  const targetName = event.target.nodeName.toLowerCase();

  trace(`%c${targetName}::${event.type}`, 'font-size: large');
};

/**
 * Найдет ключ объекта по значению
 * @param {Object} target
 * @param {*} value
 */
export const findKey = (target, value) =>
  Object.keys(target).find((key) => target[key] === value);

/**
 * Отправит запрос на сервер
 * @param {string} url
 * @param {RequestInit} [options]
 */
export const request = (url, options) => fetch(url, options).then((response) => {
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  if (response.headers.get('content-type').startsWith('application/json')) {
    return response.json();
  }

  return response.text();
});
