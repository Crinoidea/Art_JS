const modals = () => {
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

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector), //click to show modal
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'); // needed to set in HTML

        function hideModal() {
            windows.forEach(item => {
                item.style.display = 'none';
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

                hideModal();
                showModal(modal, 'block');
            });
        });

        close.addEventListener('click', () => {     
            hideModal();
        })
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                hideModal();
            }
        })
    }

    function showModalByTime(selector, time) { 
        setTimeout(() => {
            let d;
            //show modal by time if no modal isn`t opened
            document.querySelectorAll('[data-modal]').forEach(item => { 
                if (getComputedStyle(item).display !== 'none') {
                    d = 'block';
                }
            });

            if (!d) {
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

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    showModalByTime('.popup-consultation', 5000);
}

export default modals;