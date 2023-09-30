import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function formInput() {
  const {
    elements: { delay, step, amount },
  } = form;
}

function formSubmit(event) {
  event.preventDefault();
  let delay = Number(form.delay.value);
  for (let i = 0; i < form.amount.value; i++) {
    create(i + 1, delay);
    delay += Number(form.step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', formSubmit);
form.addEventListener('input', formInput);

function create(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
