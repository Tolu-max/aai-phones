$(function () {
    var $parent = $('#sb-top-nav-4b0edb6a-bd2e-4916-98e0-191007a18a98'),
        $navComponent = $parent.closest('.sb-component-double-nav-alternative'),
        $nav = $parent.find('.sb-nav__list'),
        $navOpenBtn = $parent.find('.sb-mobile-nav-btn'),
        $navCloseBtn = $parent.find('.sb-nav__close'),
        $subNavToggleBtn = $parent.find('.sb-nav__sub-toggle'),
        $navigationWrapper = $("#sb-navigation"),
        $bannerWrapper = $("#sb-banner"),
        $navigationSection = $("#sb-navigation > .sb-section")
  
    $navigationWrapper.find('.sb-section').css('transform', 'none'); // fix for when animations are applied
  
    $navOpenBtn.on('click', function () {
      $('body').toggleClass('is-nav-menu-expanded');
      $navComponent.toggleClass('sb-nav--expanded');
    });
  
    $navCloseBtn.on('click', function () {
      $('body').toggleClass('is-nav-menu-expanded');
      $navComponent.toggleClass('sb-nav--expanded');
    });
  
    $subNavToggleBtn.on('click', function (e) {
      e.stopImmediatePropagation();
  
      $(this).closest('li').toggleClass('is-sub-visible');
    });
  
    $nav.on('click', '.sb-link', function () {
      $navComponent.removeClass('sb-nav--expanded');
    });
  
    function toggleFixedNavigation () {
      $navigationSection = $("#sb-navigation > .sb-section")
  
      // TODO: Simplify this in the future
      if ($("#sb-id-4b0edb6a-bd2e-4916-98e0-191007a18a98").hasClass("option-nav-fixed") || $navigationSection.hasClass("option-nav-fixed")) {
        var $bannerSection = $("#sb-banner > .sb-section")
  
        if ($(window).scrollTop() > 0) {
          $navigationWrapper.addClass("sb-nav--fixed");
  
          var bannerOuterHeight = 0
          if ($bannerSection.length > 0 && $("body").hasClass("is-banner-in")) {
            bannerOuterHeight = $bannerSection.outerHeight();
            $navigationSection.css('top', bannerOuterHeight + 'px');
          }
  
          if(!$navigationSection.hasClass('option-nav-overlay')) {
            $('body').css('padding-top', $navigationWrapper.outerHeight() + bannerOuterHeight + 'px')
          }
        } else {
          $navigationWrapper.removeClass("sb-nav--fixed");
  
          if ($bannerSection.length > 0) {
            $navigationSection.css('top', '0');
          }
  
          if ($bannerSection.length > 0 && $("body").hasClass("is-banner-in")) {
            $('body').css('padding-top', $bannerSection.outerHeight() + 'px');
          } else {
            $('body').css('padding-top', '0');
          }
        }
      }
    }
  
    // Adjust Hero top padding when nav is overlayed above it
  function adjustHeroPadding() {
    if (!$navigationSection.hasClass('option-nav-overlay')) return
  
    const $firstHero = $('#sb-page-structure > section:first')
  
    if (!$firstHero.hasClass('option-section-hero')) {
      $navigationSection.removeClass('option-nav-overlay')
      $('body').removeClass('has-overlay-nav')
    } else {
      const navHeight = $navigationSection.outerHeight()
      const topPadding = navHeight + 20 // Plus default section padding
  
      $firstHero.css('paddingTop', `${topPadding}px`);
    }
  }
  
  adjustHeroPadding()
  
  
    $(window).scroll(function() {
      toggleFixedNavigation()
    });
  
    $(window).resize(function() {
      setTimeout(function() {
        adjustHeroPadding()
        toggleFixedNavigation()
  
        // Properly hide banner on window resize as resizing can adjust banner's height
        if (!$navigationSection.hasClass("option-nav-fixed") && $('body').hasClass('is-banner-out')) {
          var $bannerSection = $("#sb-banner")
          $bannerSection.css('margin-top', '-' + $bannerSection.outerHeight() + 'px')
        }
      }, 200)
    })
  
    var lastId,
      topMenu = $('#sb-nav-4b0edb6a-bd2e-4916-98e0-191007a18a98'),
      topMenuHeight = $('#sb-navigation > section').outerHeight(),
      menuItems,
      scrollItems,
      defaultActive = topMenu.find('li.active'),
      pagePath = window.location.pathname.split("/").pop(),
      menuSelector = pagePath === '' ? 'index' : pagePath,
      scrollSpyInitialized = false;
  
    $(window).scroll(function () {
      if (!scrollSpyInitialized) {
        menuItems = topMenu.find('a[href^="' + menuSelector + '#"]');
        scrollItems = menuItems.map(function () {
          var item = $($(this).attr("href").replace(menuSelector, ''));
          if (item.length > 0) { return item; }
        });
  
        scrollSpyInitialized = true;
      }
  
      // Get container scroll position
      var fromTop = $(this).scrollTop() + topMenuHeight;
  
      // Get id of current scroll item
      var cur = scrollItems.map(function () {
        if ($(this).offset().top <= fromTop) {
          return this;
        }
      });
  
      // Get the id of the current element
      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : "";
  
      if (lastId !== id) {
        lastId = id;
  
        if ('' == lastId && '' == id) {
          defaultActive.addClass('active');
        } else {
          topMenu.find('li').removeClass('active');
        }
  
        menuItems
          .parent().removeClass("active")
          .end().filter("[href='" + menuSelector + "#" + id + "']").parent().addClass("active");
      }
    });
  
    function scrollSmoothlyTo(elem) {
      if (elem.length === 0) {
        return
      }
  
      $('html, body').animate({
        scrollTop: (elem.offset().top - topMenuHeight + 10) + 'px'
      }, 1500);
    }
  
    // smooth scroll on page load
  $(function() {
    if (targetToScrollTo) {
      setTimeout(function () {
        const hash = `#${targetToScrollTo}`;
        scrollSmoothlyTo($(hash));
        const url = new URL(window.location);
        url.hash = hash;
        history.pushState(null, null, url);
      }, 300);
    }
  });
  
  
    // smooth scroll to section when clicking on nav items
    var $navLinks = $('.sb-link', $nav),
        pagePath = window.location.pathname.split("/").pop();
  
    $navLinks.on('click', function (e) {
      var $this = $(this),
          url = $this.attr('href'),
          hash = url.split('#')[1],
          targetPath = e.target.pathname.split("/").pop(),
          isExternal = $this.hasClass('is-external');
  
      if (!isExternal) {
        if ('index' != targetPath && targetPath != pagePath) {
          return
        }
  
        if (hash) {
          if ((pagePath == targetPath) || ('index' == targetPath && '' == pagePath)) {
            e.preventDefault();
            scrollSmoothlyTo($('#' + hash));
            history.pushState(null, null, targetPath + '#' + hash);
          }
        } else {
          if (('index' == targetPath && 'index' == pagePath) || ('index' == targetPath && '' == pagePath)) {
            e.preventDefault();
            scrollSmoothlyTo($('body'));
            history.pushState(null, null, targetPath);
          }
        }
      }
    });
  
    // hide menu items if there is no space for it
    var $vlinks = $nav,
      $hlinks = $parent.find('.sb-nav__list-hidden-links'),
      $moreBtn = $parent.find('.sb-nav__list-hidden'),
      btnWidth = $moreBtn.outerWidth(),
      isMoreButtonHidden = true,
      numOfItems = 0,
      totalSpace = 0,
      breakWidths = [],
      extraSpaceForNav = 30;
  
    $('> li:not(.sb-nav__list-hidden)', $vlinks).outerWidth(function(i, w) {
      totalSpace += $(this).outerWidth(true);
      numOfItems += 1;
      breakWidths.push(totalSpace);
    });
  
    var availableSpace, numOfVisibleItems, requiredSpace;
  
    function checkAvailableSpaceForNav() {
      availableSpace = $vlinks.width() - btnWidth - extraSpaceForNav;
      numOfVisibleItems = $('> li:not(.sb-nav__list-hidden)', $vlinks).length;
      requiredSpace = breakWidths[numOfVisibleItems - 1];
  
      if (requiredSpace > availableSpace) {
        var $lastLink = $('> li:not(.sb-nav__list-hidden)', $vlinks).last();
  
        if ($('> a', $lastLink).hasClass('sb-button')) {
          $('> a', $lastLink).removeClass('sb-button sb-button--nav').addClass('is-btn sb-nav__link');
        }
  
        $lastLink.prependTo($hlinks);
        numOfVisibleItems -= 1;
        checkAvailableSpaceForNav();
        // There is more than enough space
      } else if (availableSpace > breakWidths[numOfVisibleItems]) {
        var $firstLink = $hlinks.children().first();
  
        if ($('> a', $firstLink).hasClass('is-btn')) {
          $('> a', $firstLink).addClass('sb-button sb-button--nav').removeClass('is-btn sb-nav__link');
        }
  
        $firstLink.insertBefore($moreBtn);
        numOfVisibleItems += 1;
      }
      // Update the button accordingly
      if (numOfVisibleItems === numOfItems) {
        $moreBtn.addClass('is-hidden');
        isMoreButtonHidden = true;
      } else {
        $moreBtn.removeClass('is-hidden');
        if (isMoreButtonHidden) {
          isMoreButtonHidden = false;
          checkAvailableSpaceForNav();
        }
      }
    }
  
    $('.sb-top-header__brand').on('click', function (e) {
      if ('' == pagePath || 'index' == pagePath || 'index.html' == pagePath) {
        e.preventDefault();
  
        history.pushState(null, null, window.location.pathname);
  
        $('html, body').animate({
          scrollTop: 0
        }, 1500);
      }
    });
  
    // if we are on mobile and option-nav-mobile-static is present
    var mq = function (query, callback, usePolyfill) {
      var host = {};
      var isMatchMediaSupported = !!(window && window.matchMedia) && !usePolyfill;
  
      if (isMatchMediaSupported) {
        var res = window.matchMedia(query);
  
        callback.apply(host, [res.matches, res.media]);
  
        res.addListener(function (changed) {
          callback.apply(host, [changed.matches, changed.media]);
        });
      }
    }
  
    mq('(min-width: 1033px)', function (match) {
      if (match) {
        $(window).on('resize.hideNavItems', function() {
          checkAvailableSpaceForNav();
        });
  
        checkAvailableSpaceForNav();
      } else {
        $(window).off('resize.hideNavItems');
        $hlinks.children().appendTo($vlinks);
        $('> li:not(.sb-nav__list-hidden) > a.is-btn', $vlinks).addClass('sb-button sb-button--nav').removeClass('is-btn sb-nav__link');
      }
    });
  
    mq('(max-width: 767px)', function (match) {
      if ($("#sb-id-4b0edb6a-bd2e-4916-98e0-191007a18a98").hasClass('option-nav-mobile-static') || $("#sb-navigation > .sb-section").hasClass('option-nav-mobile-static')) {
        $("#sb-navigation").addClass("sb-nav--static");
      } else {
        $("#sb-navigation").removeClass("sb-nav--static");
      }
    });
  });