let AnimationService = (() => {
    function setLeft(moverElem, phase) {
        moverElem.style.transform = `translateX(${((Math.sin(phase + timestamp / 1000) + 1) * 500)}px) ${withLayers ? `translatez(${phase % 10}px)` : ""}`;
    }

    return {
        sync: function (mover) {
            setLeft(mover, mover.offsetTop);
        },
        noread: function (mover, index) {
            setLeft(mover, index);
        }
    }
})();
let moveMethod = 'sync', timestamp, requestAnimationFrameHandler, movers, withLayers;
const $count = document.getElementById('input_num_of_elements');
const $playground = document.getElementById('playground');


function setMethod(method) {
    document.getElementById(moveMethod).classList.remove('active');
    document.getElementById(method).classList.add('active');
    moveMethod = method;
}

function update(thisTimestamp, movers) {
    timestamp = thisTimestamp;
    Array.from(movers).forEach((m, index) => AnimationService[moveMethod](m, index));
    requestAnimationFrameHandler = window.requestAnimationFrame((ts) => update(ts, movers));
}

function toggleAnim(e) {

    if (requestAnimationFrameHandler) {
        window.cancelAnimationFrame(requestAnimationFrameHandler);
        requestAnimationFrameHandler = false;
        e.currentTarget.innerHTML = 'Start';
        $count.disabled = false;
    } else {
        const numOfElements = parseInt($count.value);
        const html = [...Array(numOfElements).keys()]
            .map((val, i) => {
                const imgClass = i % 2 === 0 ? 'rick' : 'morty';
                return `<div class="mover mover-${imgClass}"></div>`
            })
            .join("");
        $playground.innerHTML = html;
        movers = $playground.querySelectorAll('.mover');
        const [firstMover, ...restMovers] = movers;
        firstMover.style.top = '150px';
        restMovers.forEach((mover, i) => mover.style.top = ((i + 1) * 20) + 150 + 'px');
        requestAnimationFrameHandler = window.requestAnimationFrame((ts) => update(ts, movers));
        e.currentTarget.innerHTML = 'Stop';
        $count.disabled = true;
    }
}

document.getElementById('toggle').addEventListener('click', toggleAnim);

document.getElementById('sync').addEventListener('click', function () {
    setMethod('sync');
});

document.getElementById('withLayers').addEventListener('click', function (e) {
    !withLayers ? withLayers = '0' : withLayers = undefined;
    e.target.innerText = !withLayers ? 'With Layers' : 'Without Layers';
});

document.getElementById('noread').addEventListener('click', function () {
    setMethod('noread');
});

