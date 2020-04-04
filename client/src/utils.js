const loadScript = function (src) {
  var tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(tag);
};

export { loadScript };


