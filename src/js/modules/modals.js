const modals = () => {
    let btnPressed = false;

    const scroll = calcScroll(); //width of scrolling element

    function showModal(modalSelector, displayStyle) {
        modalSelector.style.display = displayStyle;
        document.body.style.overflow = 'hidden';

        if ( /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            //condition for mobile browser
        } else {
            document.body.style.marginRight = `${scroll}px`;
        }
    }

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector), //click to show modal
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'); // needed to set in HTML

        function hideModal() {
            windows.forEach(item => {
                item.style.display = 'none';
                item.classList.add('animated', 'fadeIn');
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }
        
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target
                if (target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) { //remove present after one click
                    item.remove();
                }

                hideModal();
                showModal(modal, 'block');
            });
        });

        close.addEventListener('click', () => {     
            hideModal();
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    function showModalByTime(selector, time) { 
        let isAnyModalShown = false;

        setTimeout(() => {
            //show modal by time if no modal is opened
            document.querySelectorAll('[data-modal]').forEach(item => { 
                if (getComputedStyle(item).display !== 'none') {
                    isAnyModalShown = true;
                }
            });

            if (!isAnyModalShown) {
                showModal(document.querySelector(selector), 'block');
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');
        
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrolledWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrolledWidth;
    }

    function openByScroll(selector) {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); // for very old browsers

        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    /* showModalByTime('.popup-consultation', 5000); */
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift')
}

export default modals;