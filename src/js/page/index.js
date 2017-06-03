import ns from '../module/ns';

import { bion } from '../module/BMath';

export default () => {
  const elm = document.querySelector('.bion-container');
  const $elm = $(elm);

  const $coord = $('<div class="coord"></div>');

  $elm.append($coord);

  for (let i = 1; i <= 32; i++) {
    const b = bion(i);

    let $bion = $('<div class="bion-elm"></div>');

    let $number = $('<span class="number">');
    $number.text(i);

    $bion.append($number);

    $coord.append($bion);

    $bion.css({
      left: b.x * 50,
      top: - b.y * 50,
    });
  }
}
