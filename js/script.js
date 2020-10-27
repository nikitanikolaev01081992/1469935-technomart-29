//promo slider
const promoSlides = Array.from(document.querySelectorAll(".promo-slider__slide"));
const promoPrevButton = document.querySelector(".slider-controls__button-left");
const promoNextButton = document.querySelector(".slider-controls__button-right");
const promoIndicators = document.querySelectorAll(".slider-indicators__indicator");
let promoActiveSlidePos = promoSlides.indexOf(
    document.querySelector(".promo-slider__slide_active")
);

const changeActivePromoSlide = function (step) {
    if (promoActiveSlidePos == -1) return;

    const currActive = promoSlides[promoActiveSlidePos];
    currActive.classList.remove("promo-slider__slide_active");

    let newActivePos = promoActiveSlidePos + step;
    if (newActivePos > promoSlides.length - 1) {
        newActivePos = 0;
    } else if (newActivePos < 0) {
        newActivePos = promoSlides.length - 1;
    }

    const newActive = promoSlides[newActivePos];
    newActive.classList.add("promo-slider__slide_active");

    updateIndicatorStatus(promoActiveSlidePos, newActivePos);
    promoActiveSlidePos = newActivePos;
};

const updateIndicatorStatus = function (oldActivePos, newActivePos) {
    if (!promoIndicators[oldActivePos] && !promoIndicators[newActivePos].classList) return;
    promoIndicators[oldActivePos].classList.remove("slider-indicators__indicator_active");
    promoIndicators[newActivePos].classList.add("slider-indicators__indicator_active");
};

promoPrevButton &&
    promoPrevButton.addEventListener("click", () => {
        changeActivePromoSlide(-1);
    });

promoPrevButton &&
    promoNextButton.addEventListener("click", () => {
        changeActivePromoSlide(1);
    });

//services slider
const serviceControlsParent = document.querySelector(".services__controls");
const serviceControls = Array.from(document.querySelectorAll(".services__control"));
const serviceSlides = document.querySelectorAll(".service");

let serviceActiveSlidePos = serviceControls.indexOf(
    document.querySelector(".services__control_active")
);

const changeActiveServiceSlide = function (newActivePos) {
    if (serviceActiveSlidePos == -1) return;

    try {
        serviceControls[serviceActiveSlidePos].classList.remove("services__control_active");
        serviceSlides[serviceActiveSlidePos].classList.remove("service_active");

        serviceControls[newActivePos].classList.add("services__control_active");
        serviceSlides[newActivePos].classList.add("service_active");
    } catch (error) {
        console.log("Looks like we have error in func changeActiveServiceSlide");
    }
    serviceActiveSlidePos = newActivePos;
};

serviceControlsParent &&
    serviceControlsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (!target.classList.contains("services__control")) return;

        const targetPos = serviceControls.indexOf(target);
        changeActiveServiceSlide(targetPos);
    });

//modal write-us
const openBtnWriteUs = document.querySelector(".map__button");
const closeBtnWriteUs = document.querySelector(".modal-write-us .modal__button-close");
const modalWriteUs = document.querySelector(".modal-write-us");

openBtnWriteUs &&
    openBtnWriteUs.addEventListener("click", (event) => {
        event.preventDefault();

        modalWriteUs.classList.add("modal_active");

        const inputName = document.querySelector(".modal-write-us__input-name input");
        inputName.focus();
    });

closeBtnWriteUs &&
    closeBtnWriteUs.addEventListener("click", (event) => {
        modalWriteUs.classList.remove("modal_error");
        modalWriteUs.classList.remove("modal_active");
    });

modalWriteUs &&
    modalWriteUs.addEventListener("submit", (event) => {
        const inputName = document.querySelector(".modal-write-us__input-name input");
        const inputEmail = document.querySelector(".modal-write-us__input-email input");
        const inputText = document.querySelector(".modal-write-us__input-text input");

        if (!inputName.value || !inputEmail.value || !inputText.value) {
            event.preventDefault();
            modalWriteUs.classList.remove("modal_error");
            setTimeout(() => {
                modalWriteUs.classList.add("modal_error");
            }, 0);
        }
    });

//modal Map
const openBtnMap = document.querySelector(".map__link");
const closeBtnMap = document.querySelector(".modal-map .modal__button-close");
const modalMap = document.querySelector(".modal-map");

openBtnMap &&
    openBtnMap.addEventListener("click", (event) => {
        event.preventDefault();

        modalMap.classList.add("modal_active");
    });

closeBtnMap &&
    closeBtnMap.addEventListener("click", (event) => {
        modalMap.classList.remove("modal_active");
    });

//modal Message
const thingsList = document.querySelector(".things-list");
const closeBtnMsg = document.querySelector(".modal-message .modal__button-close");
const continueBtnMsg = document.querySelector(".modal__continue");
const modalMsg = document.querySelector(".modal-message");

thingsList &&
    thingsList.addEventListener("click", (event) => {
        const target = event.target;

        if (!target.classList.contains("thing__button-buy")) return;

        modalMsg.classList.add("modal_active");
    });

closeBtnMsg &&
    closeBtnMsg.addEventListener("click", (event) => {
        modalMsg.classList.remove("modal_active");
    });

continueBtnMsg &&
    continueBtnMsg.addEventListener("click", (event) => {
        modalMsg.classList.remove("modal_active");
    });

window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        const currentActiveModal = document.querySelector(".modal_active");
        if (currentActiveModal) {
            event.preventDefault();
            currentActiveModal.classList.remove("modal_error");
            currentActiveModal.classList.remove("modal_active");
        }
    }
});
