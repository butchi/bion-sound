import Tone from 'tone';

import ns from '../module/ns';

import { bion } from '../module/BMath';

export default () => {
  const SYNTH_LENGTH = 10;

  const synthArr = new Array(SYNTH_LENGTH).fill(null).map(() => {
    return new Tone.Synth({
      "oscillator" : {
        "type" : "square"
      },
      "envelope" : {
        "attack" : 0.01,
        "decay" : 0.8,
        "sustain" : 0.8,
        "release" : 0.2,
      }
    }).toMaster();
  });

  let synthIndex = 0;

  const elm = document.querySelector('.bion-container');
  const $elm = $(elm);

  const $coord = $('<div class="coord"></div>');

  $elm.append($coord);

  for (let i = 1; i <= 32; i++) {
    const b = bion(i);

    let $bion = $(`<div class="bion-elm" data-index="${i}" data-freq="${i * 80}"></div>`);

    let $bg = $('<div class="bg"></div>');

    let $number = $('<span class="number">');
    $number.text(i);

    $bion.append($bg);
    $bion.append($number);

    $coord.append($bion);

    $bion.css({
      left: b.x * 50,
      top: - b.y * 50,
    });
  }

  $elm.on('mouseover touchstart', '.bion-elm', (evt) => {
    const $b = $(evt.target).closest('.bion-elm');
    const freq = parseInt($b.attr('data-freq'));

    const synth = synthArr[synthIndex];
    synth.triggerAttackRelease(freq, 0.1);

    synthIndex = (synthIndex + 1) % SYNTH_LENGTH;
  });
}
