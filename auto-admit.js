let inter = setInterval(() => {
    let elems = [...document.getElementsByClassName("CwaK9")]
    if (elems.length > 0) {
        elems[1].click();
    }
}, 1000);