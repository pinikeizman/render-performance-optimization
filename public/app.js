let moveMethod = 'sync', timestamp, raf, movers, t;
const count = document.getElementById('input_num_of_elements'),
    test = document.getElementById('playground');

let mover = {
    sync: function (m) {

        // Read the top offset, and use that for the left position
        this.setLeft(movers[m], movers[m].offsetTop);
    },
    noread: function (m) {

        // Simply use the array index
        // as the top value, so no DOM
        // read is required
        this.setLeft(movers[m], m);
    },
    setLeft: function (moverElem, phase) {
        moverElem.style.transform = `translateX(${((Math.sin(phase + timestamp / 1000) + 1) * 500)}px) ${t ? `translatez(${phase % 10}px)`:""}`;
    }
};

function setMethod(method) {
    document.getElementById(moveMethod).classList.remove('active');
    document.getElementById(method).classList.add('active');
    moveMethod = method;
}

function update(thisTimestamp) {
    timestamp = thisTimestamp;
    for (var m = 0; m < movers.length; m++) {
        mover[moveMethod](m);
    }
    raf = window.requestAnimationFrame(update);
}

function toggleAnim(e) {

    if (raf) {

        window.cancelAnimationFrame(raf);
        raf = false;
        e.currentTarget.innerHTML = 'Start';
        count.disabled = false;

    } else {
        const numOfElements = parseInt(count.value);
        const html = [...Array(numOfElements).keys()]
            .map((val, i) => {
                const imgClass = i % 2 === 0 ? 'rick' : 'morty';
                return `<div class="mover mover-${imgClass}"></div>`
            })
            .join("");

        test.innerHTML = html;

        movers = test.querySelectorAll('.mover');
        movers[0].style.top = '150px';
        for (var m = 1; m < movers.length; m++) {
            movers[m].style.top = (m * 20) + 150 + 'px';
        }

        raf = window.requestAnimationFrame(update);
        e.currentTarget.innerHTML = 'Stop';
        count.disabled = true;
    }
}

document.getElementById('toggle').addEventListener('click', toggleAnim);

document.getElementById('sync').addEventListener('click', function () {
    setMethod('sync');
});

document.getElementById('t').addEventListener('click', function () {
    !t ? t = '0' : t = undefined
});

document.getElementById('noread').addEventListener('click', function () {
    setMethod('noread');
});

