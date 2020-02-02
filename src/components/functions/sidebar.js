const contentHamburger = ()=> {

  var hamburger = {
    navToggle: document.querySelector('.nav-toggle'),
    nav: document.querySelector('nav'),

    doToggle: function(e) {
      e.preventDefault();
      this.navToggle.classList.toggle('expanded');
      this.nav.classList.toggle('expanded');
    }
  }


  hamburger.navToggle.onClick={ function(e) { hamburger.doToggle(e); }};
  hamburger.nav.onClick={ function(e) { hamburger.doToggle(e); }};

};

export default contentHamburger;