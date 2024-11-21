var osuny = window.osuny || {};

osuny.SliderPagination = function (slider) {
    this.slider = slider;
    this.items = [];
    this.buttons = [];
    this.container = document.createElement('ul');
    this.container.classList.add('slider-pagination');
    this.container.setAttribute('aria-label', osuny.i18n.slider.pagination_list);
    this.container.setAttribute('aria-description', this.slider.title);
    this.slider.controls.appendChild(this.container);
    this.create();
};

osuny.SliderPagination.prototype.create = function () {
    var i;
    for (i = 0; i < this.slider.slides.length; i += 1) {
        this.createButton(i);
    }
};

osuny.SliderPagination.prototype.createButton = function (index) {
    var item = document.createElement('li'),
        button = document.createElement('button'),
        a11yText = osuny.i18n.slider.goto + ' ' + (index + 1);

    osuny.utils.insertSROnly(button, a11yText);

    item.appendChild(button);
    this.container.appendChild(item);
    this.buttons.push(button);
    this.items.push(item);

    button.addEventListener('click', this.onClick.bind(this, index));
};

osuny.SliderPagination.prototype.onClick = function (index) {
    this.slider.goTo(index);
};

osuny.SliderPagination.prototype.update = function () {
    var action,
        isCurrent;
    this.items.forEach(function (item, index) {
        isCurrent = index === this.slider.state.index;
        action = isCurrent ? 'add' : 'remove';
        item.classList[action]('is-current');
        this.buttons[index].setAttribute('aria-current', isCurrent);
    }.bind(this));
};
