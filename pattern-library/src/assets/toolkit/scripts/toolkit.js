/**
 * Toolkit JavaScript
 */

 import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', () => {

    function isMediumBreakpoint() {
        return window.innerWidth > 720;
    }

    const postShareLinks = document.querySelector('.share-post[data-fixed-share-links]');

    if (postShareLinks) {
        const postBody = document.querySelector('.post__body');
        let status = null;
        let shouldBeActive = isMediumBreakpoint();

        window.addEventListener('scroll', throttle(() => {
            if (shouldBeActive && postBody.getBoundingClientRect().top < 0 && !status) {
                postShareLinks.classList.add('share-post--fixed');
                status = 'fixed';
            } else if (shouldBeActive && postBody.getBoundingClientRect().top > 0 && status === 'fixed') {
                postShareLinks.classList.remove('share-post--fixed');
                status = null;
            }
        }, 10), false);

        window.addEventListener('resize', throttle(() => {
            shouldBeActive = isMediumBreakpoint();
        }, 100), false);
    }

});
