// Custom Scripts
// Custom scripts
function burgerMenu() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const body = document.querySelector('body');
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active');
      burger.classList.add('active-burger');
      body.classList.add('locked');
    } else {
      menu.classList.remove('active');
      burger.classList.remove('active-burger');
      body.classList.remove('locked');
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active');
      burger.classList.remove('active-burger');
      body.classList.remove('locked');
    }
  });
}
burgerMenu();

function fixedNav() {
  const nav = document.querySelector('nav');

  const breakpoint = 1;
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav');
  } else {
    nav.classList.remove('fixed__nav');
  }
}
window.addEventListener('scroll', fixedNav);

// swiper
var swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 5,
  spaceBetween: 30,
  slidesPerGroup: 2,
  pagination: {
    el: '.swiper-custom-pagination',
    clickable: true,
  },
  keyboard: true,
  breakpoints: {
    // when window width is >= 320px
    280: {
      slidesPerView: 1,
    },
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 10,
      slidesPerGroup: 1,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 15,
      slidesPerGroup: 1,
    },
    800: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    920: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});

// accordion
function accordion() {
  const items = document.querySelectorAll('.accordion__item-trigger');
  items.forEach((item) => {
    item.addEventListener('click', () => {
      const parent = item.parentNode;
      if (parent.classList.contains('accordion__item-active')) {
        parent.classList.remove('accordion__item-active');
      } else {
        document
          .querySelectorAll('.accordion__item')
          .forEach((child) => child.classList.remove('accordion__item-active'));
        parent.classList.add('accordion__item-active');
      }
    });
  });
}
accordion();

// select

const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'placeholder не указан';

  const items = data.map((item) => {
    let cls = '';
    if (item.id === selectedId) {
      text = item.value;
      cls = 'selected';
    }
    return `
          <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
      `;
  });
  return `
      <input type="hidden" class="hidden__input">
      <div class="select__backdrop" data-type="backdrop"></div>
      <div class="select__input" data-type="input">
          <span data-type="value">${text}</span>
          <img src="./img/down-arrow.svg" alt="arrow" data-type="arrow" class="select__arrow">
      </div>
      <div class="select__dropdown">
          <ul class="select__list">
              ${items.join('')}
          </ul>
      </div>
  `;
};
class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.render();
    this.setup();
  }

  render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }
  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;

    this.$el
      .querySelectorAll(`[data-type="item"]`)
      .forEach((el) => el.classList.remove('selected'));
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');

    this.options.onSelect ? this.options.onSelect(this.current) : null;
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add('open');
    this.$arrow.classList.add('open');
  }

  close() {
    this.$el.classList.remove('open');
    this.$arrow.classList.remove('open');
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.innerHTML = '';
  }
}

// Инициализация плагина
const select = new Select('#select', {
  placeholder: 'Pleaes select language',
  selectedId: '1',
  data: [
    { id: '1', value: 'English' },
    { id: '2', value: 'Russia' },
    { id: '3', value: 'French' },
  ],
  onSelect(item) {
    const input = document.querySelector('.hidden__input');
    input.value = item.value;
  },
});

// smooth scroll

const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    event.preventDefault();
    const blockID = anchor.getAttribute('href').substring(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

// modal window

var modal = document.getElementById('myModal');
var btn = document.getElementById('myBtn');
var span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
  modal.style.display = 'block';
};

span.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// parallax

new Parallax(document.getElementById('hero__img'));

