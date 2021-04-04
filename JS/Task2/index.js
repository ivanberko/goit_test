const inputNumberOfDiv = document.querySelector('input[type="number"]');
const renderButton = document.querySelector('button[data-action="render"]');
const destroyButton = document.querySelector('button[data-action="destroy"]');
const containerBoxes = document.getElementById('boxes');
const arrayOfColorBoxes = [];

const getRandomInt = () => {
  return Math.floor(Math.random() * 255);
};

const createBoxes = (amount) => {
  if (amount <= 0 || amount > 100) return;

    let widthBox = 30;
    let heightBox = 30;
    for (let i = 0; i < amount; i += 1) {
      const boxDiv = document.createElement('div');
      boxDiv.style.width = `${(widthBox += 10)}px`;
      boxDiv.style.height = `${(heightBox += 10)}px`;
      boxDiv.style.backgroundColor = `rgb(${getRandomInt()},${getRandomInt()},${getRandomInt()})`;
      arrayOfColorBoxes.push(boxDiv);
    }
    containerBoxes.append(...arrayOfColorBoxes);
};

const destroyBoxes = () => {
  containerBoxes.innerHTML = '';
  arrayOfColorBoxes.splice(0);
  inputNumberOfDiv.value = '';
};

inputNumberOfDiv.onblur = () => {
  createBoxes(inputNumberOfDiv.value);
};

renderButton.addEventListener('click', inputNumberOfDiv.onfocus);
destroyButton.addEventListener('click', destroyBoxes);
