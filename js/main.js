var controller = new ScrollMagic.Controller();

setTimeout(function() {

  new TimelineMax()
    .fromTo('.diver', 3, {y: 0}, {y: window.innerHeight - 70, ease: Power0.easeOut})
    .fromTo('.diver', 2.5, {opacity: .1}, {opacity: 1}, .5)
    .fromTo('.diver-arrow', .2, {opacity: 0}, {opacity: 1})
    .fromTo('.diver .diver-svg', .2, {opacity: 1}, {opacity: 0});

  /* make bubbles */
  var count = Math.floor(window.innerWidth / 100);
  var spaces = [];
  for (var i = 1; i < count; i++) {
    if ((i - 2) % 6 === 0 || (i - 5) % 6 === 0) {
      $(".section2").append("<div class='bubble bubble-xs'></div>");
      spaces.push('+='.concat(60*i));
    } else if ((i - 6) % 6 === 0) {
      $(".section2").append("<div class='bubble bubble-m'></div>");
    } else {
      $(".section2").append("<div class='bubble bubble-s'></div>");
      if (i < count - 2) {
        spaces.push('+='.concat(90 * i));
      } else {
        spaces.push('+='.concat((count * 100) - (count * 22)));
      }
    }
  }

  TweenMax.set('.bubble', {y: window.innerHeight - 28});

  var bubble = new TimelineMax({});
  bubble
    .staggerFromTo('.bubble', 6, {cycle: {x: spaces}}, {y: 0, repeat: -1, repeatDelay: .5}, 1.5)
    .staggerFromTo('.bubble', .2, {autoAlpha: 1}, {autoAlpha: 0});

  new ScrollMagic.Scene({
    triggerElement: '.section2',
    triggerHook: 'onEnter',
    offset: 20
  }).setTween(bubble).addTo(controller);


  var sentence1 = TweenMax.fromTo('.section2 .text', 3, {autoAlpha: 0}, {autoAlpha: 1});

  new ScrollMagic.Scene({
    triggerElement: '.section2',
    triggerHook: 'onLeave',
    offset: -200
  }).setTween(sentence1).addTo(controller);


  /* split text */
  var toSplit = $(".intersection3 .text");
  toSplit.html(
    toSplit.text().replace(/[a-zNżłńę,.]/g, function(char) {
      return "<span>" + char + "</span>";
    })
  );

  var sentence2 = new TimelineMax();
  sentence2
    .staggerTo('.intersection3 span', .5, {color: "#367b84"}, .2)
    .staggerTo('.intersection3 span', .5, {color: "#fff", clearProps: "all"}, .2, 1);

  new ScrollMagic.Scene({
    triggerElement: '.intersection3'
  }).setTween(sentence2).addTo(controller);


  var fishHead = new TimelineMax();
  fishHead
    .fromTo('.section4 img', 3, {y: '10%', width: '10vw'}, {y: '10%', width: '70vw'})
    .fromTo('.section4 img', 3, {autoAlpha: 0}, {autoAlpha: .2}, 0);

  new ScrollMagic.Scene({
    triggerElement: '.section4',
    duration: '50%'
  }).setTween(fishHead).addTo(controller);

  /* here comes the fish */
  var screen = new TimelineMax();
  screen
    .fromTo('.section-screen', 3, {y: '-100%', autoAlpha: 0}, {y: '0%', autoAlpha: 1, ease: Power1.easeOut})
    .fromTo('.section4 .section-fish', .2, {autoAlpha: 0}, {autoAlpha: .5, scale: .9});

  new ScrollMagic.Scene({
    triggerElement: '.section4',
    triggerHook: 'onLeave',
    duration: '100%'
  }).setPin('.section4').setTween(screen).addTo(controller);

  var fish = new TimelineMax();
  fish.to('.section4 .section-fish', 4, {scale: 0, y: '60%', ease: Circ.easeOut});

  new ScrollMagic.Scene({
    triggerElement: '.section5',
    triggerHook: 'onEnter',
    duration: '120%'
  }).setTween(fish).addTo(controller);


  var sentence4 = new TimelineMax();
  sentence4
    .fromTo('.section5 .container', 3, {x: '100%'}, {x: '0%', ease: Linear.easeNone})
    .fromTo('.section5 .text', 2, {autoAlpha: 0}, {autoAlpha: 1})
    .to('.section5 img', 2, {x: '-10%', y: '-3%', rotation: '-30deg'});

  new ScrollMagic.Scene({
    triggerElement: '.section5',
    triggerHook: 'onLeave',
    duration: '100%'
  }).setPin('.section5').setTween(sentence4).addTo(controller);


  var dive = new TimelineMax();
  dive.fromTo('.seahorse', 2, {top: 10 }, {top: window.innerHeight - 70});

  var seahorse = new TimelineMax();
  seahorse
    .fromTo('.seahorse', 2, {rotation: '10deg'}, {rotation: '-10deg', repeat: 5, yoyo: true})
    .fromTo('.seahorse', 2, {x: 0}, {x: '+=30', repeat: 5, yoyo: true}, 0);

  new ScrollMagic.Scene({
    triggerElement: '.section6',
    duration: '80%'
  }).setTween(dive).addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.section6',
    duration: '50%'
  }).setTween(seahorse).addTo(controller);

}, 500);


if (Modernizr.touch) {
  var lastWidth = $(window).width();

  $(window).on('resize', function () {
    if ($(window).width() !== lastWidth) {
      location.reload();
    }
  });
}

