export default (text = 'Hello nanana hahaha') => {
  const element = document.createElement('div');

  element.innerHTML = text;

  return element;
};