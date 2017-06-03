import Tone from 'tone';

import ns from '../module/ns';

import { bion } from '../module/BMath';

export default () => {
  const TONE_LENGTH = 32;
  const synthArr = new Array(TONE_LENGTH).fill(null).map(() => {
    return new Tone.Synth({
      "oscillator" : {
        "type" : "sine"
      },
      "envelope" : {
        "attack" : 0.01,
        "decay" : 0.8,
        "sustain" : 0.8,
        "release" : 0.2,
      }
    }).toMaster();
  });

  const elm = document.querySelector('.bion-container');
  const $elm = $(elm);

  const $coord = $('<div class="coord"></div>');

  $elm.append($coord);

  for (let i = 1; i <= TONE_LENGTH; i++) {
    const b = bion(i);

    let $bion = $(`<div class="bion-elm" data-index="${i - 1}" data-freq="${i * 80}"></div>`);

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

  $elm.on('click', '.bion-elm', (evt) => {
    const $b = $(evt.target).closest('.bion-elm');
    const freq = parseInt($b.attr('data-freq'));
    const synthIndex = parseInt($b.attr('data-index'));
    const isContinue = !!$b.attr('data-is-continue');

    const synth = synthArr[synthIndex];

    if (isContinue) {
      synth.triggerRelease();
      $b.removeAttr('data-is-continue');
    } else {
      synth.triggerAttack(freq);
      $b.attr('data-is-continue', true);
    }
  });

  $elm.on('mouseover touchstart', '.bion-elm', (evt) => {
    const $b = $(evt.target).closest('.bion-elm');
    const freq = parseInt($b.attr('data-freq'));
    const synthIndex = parseInt($b.attr('data-index'));
    const isContinue = !!$b.attr('data-is-continue');

    if (!isContinue) {
      const synth = synthArr[synthIndex];
      synth.triggerAttackRelease(freq, 0.1);
    }
  });
}
