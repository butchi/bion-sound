import ns from './ns';
import pageCommon from '../page/common';
import pageIndex from '../page/index';

function page(pageId, callback) {
  if(document.querySelector(`body[data-page-id="${pageId}"]`)) {
    callback();
  }
};

export default class Router {
  constructor() {
    this.initialize();
  }

  initialize() {
    ns.page = ns.page || {};

    pageCommon();

    page('index', pageIndex);
  }
}
