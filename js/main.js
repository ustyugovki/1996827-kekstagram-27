// import { name } from "browser-sync";

/**
 * Вернет целое положительное в диапазоне `min`, `max`
 * @param {number} min
 * @param {number} max
 */
function randomIntInRange(min, max) {
  const range = [min, max];

  if (!range.every(Number.isInteger)) {
    throw new Error(`Нецелочисленный диапазон: [${range}]`);
  }

  if (min < 0 || max < 0 || min > max) {
    throw new Error(`Неподдерживаемый диапазон: [${range}]`);
  }

  return Math.round((max - min) * Math.random() + min);
}

// randomIntInRange(4, 3);

/**
 * Проверит максимальную длину строки
 * @param {string} value
 * @param {number} maxLength По умолчанию 100
 */
function validateMaxLength(value, maxLength = 100) {
  return value.length <= maxLength;
}

validateMaxLength('ererer', 1);

/*
Структура каждого объекта должна быть следующей:

id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.

url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

description, строка — описание фотографии. Описание придумайте самостоятельно.

likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

{
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}
У каждого комментария есть идентификатор — id — случайное число. Идентификаторы не должны повторяться.

Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
*/

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

const GET_COMMENTS_COUNT = 4;
// const CREATE_FOTO_COUNT = 2;

const description = [
  'описание 1',
  'описание 2',
  'описание 3',
  'описание 4'
];

const message = [
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const getRandomArrayElement = (elements) => elements[randomIntInRange(1, id.length - 1)];

const comments = [];

function getComments () {
  for (let i = 0; i < GET_COMMENTS_COUNT; i++) {
    // почему подсвечиваются свойства если const comments = []; внутри for
    comments.push({i});
    comments[i].id = getRandomArrayElement(id);
    comments[i].avatar = `img/avatar-${randomIntInRange(1, 6)}.svg`;
    comments[i].message = message[randomIntInRange(1, message.length - 1)];
    comments[i].name = NAMES[randomIntInRange(1, NAMES.length - 1)];
  }
  return comments;
  // console.log(comments);
  // console.log(typeof(comments)); // почему объект?
}

const createFoto = () => ({
  id: getRandomArrayElement(id),
  url: `photos/{${getRandomArrayElement(id)}}.jpg`,
  description: description[randomIntInRange(1, description.length - 1)],
  likes: randomIntInRange(15, 200),
  comments: getComments ()
});

// getComments ();
console.log(createFoto());
// const similarFotos = [];

// const similarFotos = Array.from({length: CREATE_FOTO_COUNT}, createFoto);

// for (let i = 1; i < 3; i++) {
//   similarFotos[i] = createFoto();
// }

// console.log(similarFotos);

// comments[0] = {
//   id: 135,
//   avatar: 'img/avatar-6.svg',
//   message: 'В целом всё неплохо. Но не всё.',
//   name: 'Артём',
// };
// comments.push({});
// comments[1].id = getRandomArrayElement(id);
// comments[1].avatar = `img/avatar-${randomIntInRange(1, 6)}.svg`;
// comments[1].message = message[randomIntInRange(1, message.length - 1)];
// comments[1].name = getRandomArrayElement(NAMES);
// console.log(comments);
// console.log(typeof(comments)); // почему объект?

// 2
// const createFoto = () => ({
//   id: id[randomIntInRange(1, id.length - 1)],
//   url: `photos/{${randomIntInRange(1, id.length - 1)}}.jpg`
// });
// 1
// const createFoto = () => {
//   const randomId = randomIntInRange(1, id.length - 1);
//   const randomUrl = `photos/{${randomIntInRange(1, id.length - 1)}}.jpg`;

//   return {
//     id: id[randomId],
//     url: randomUrl
//   };
// };

// console.log(createFoto());

