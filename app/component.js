export default (text = 'Hello brbr hahaha') => {
  const element = document.createElement('div');

  element.innerHTML = text;

  return element;
};