export default (text = 'Hello oh hahaha') => {
  const element = document.createElement('div');

  element.innerHTML = text;

  return element;
}