let eventListener;

function reachedBottom () {
    return document.body.scrollHeight === document.body.scrollTop + window.innerHeight;
}

function enable (callback) {
    eventListener = () => reachedBottom() && callback();
    window.addEventListener("scroll", eventListener);
}

function disable () {
    window.removeEventListener("scroll", eventListener);
}

export default {
    enable: enable, 
    disable: disable
};
