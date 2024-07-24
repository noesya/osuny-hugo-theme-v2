if (!window.osuny) {
    window.osuny = {};
}
if (!window.osuny.carousel) {
    window.osuny.carousel = {};
}
window.osuny.carousel.Instance = function (root) {
    this.root = root;
    this.container = null;
    this.windowResizeTimeout;
    // Les instances des composants
    this.pagination = null;
    this.slider = null;
    this.autoplayer = null;
    // Les options sont chargées depuis le data-attribute "data-carousel"
    this.options = {};
    this.state = {
        index: 0,
        initialized: false,
        focus: false,
        hover: false,
    };
    this.initialize();
}
window.osuny.carousel.Instance.prototype =  {
    classes: {
        carousel: "carousel__container",
    },
    initialize: function () {
        this.findContainer();
        this.loadOptions();
        this.initializeComponents();
        this.initializeListeners();
        this.initializeAutoplayer();
        this.state.initialized = true;
    },
    findContainer: function () {
        this.container = this.root.getElementsByClassName(this.classes.carousel).item(0);
    },
    loadOptions: function () {
        this.options = JSON.parse(this.root.dataset.carousel);
    },
    initializeComponents: function () {
        this.slider = new window.osuny.carousel.Slider(this);
        this.pagination = new window.osuny.carousel.Pagination(this);
    },
    initializeListeners: function () {
        this.container.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.container.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        ///// TEST TO REMOVE /////
        document.addEventListener("keydown", function (e) {
            if (e.key == 'ArrowLeft') { this.slider.previousSlide() }
            else if (e.key == 'ArrowRight') { this.slider.nextSlide() }
        }.bind(this));
        /////////////////////////
    },
    onMouseEnter: function () {
        this.state.hover = true;
        this.autoplayer.pause();
    },
    onMouseLeave: function () {
        this.state.hover = false;
        this.autoplayer.unpause();
    },
    initializeAutoplayer: function () {
        this.autoplayer = new window.osuny.carousel.Autoplayer(this);
    },
    adaptToWindowResize: function () {
        clearTimeout(this.windowResizeTimeout);
        this.windowResizeTimeout = setTimeout(function () {
            this.slider.reset();
        }.bind(this), 200);
    },
    next: function () {
        this.slider.nextSlide();
    },
    focus: function () {
        this.state.focus = true;
    },
    blur: function () {
        this.state.focus = false;
    }
}
