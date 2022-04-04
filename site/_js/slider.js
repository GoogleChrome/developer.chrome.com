// @ts-nocheck
const cssClasses = {
  NAVIGATION_WRAPPER: 'navigation-wrapper',
  FIXED_NAVIGATION_WRAPPER: 'fixed-navigation-wrapper',
  YEAR_NAVIGATION: 'year-navigation',
  FIXED_YEAR_NAVIGATION: 'fixed-year-navigation',
  MENU: 'menu',
  FIXED_MENU: 'fixed-menu',
  MENU_ITEM: 'menuitem',
  MENU_ITEM_LINK: 'sectionLink',
  CHROME_LOGO: 'chrome-logo',
  YEAR_SECTION: 'inner-card',
  HIDE_ON_FOOTER: 'hide-on-footer',
  HIDE_ON_PRE_FOOTER: 'hide-on-pre-footer',
  SECTION_2022: 'section2022',
  SECTION_2008: 'section2008',
  SCROLL_SECTION: 'scroll-section',
  BACK_TO_TOP: 'back-to-top',
  HERO_SECTION: 'hero-section',
  CARD_SECTION: 'card-section',
  FOOTER_TOP_SECTION: 'footer-top-section',
  CHROME_LOGO_TEXT: 'chrome-logo-wrapper--text',
  PRE_FOOTER: 'footer-top-section',
  FOOTER: 'type--footer',
};
const imgBaseUrl = 'https://wd.imgix.net/image/H2WDdWf5aPXOtVabf53xIxMJyTF2/';
 
const chromeLogoVersions = new Map();
chromeLogoVersions.set(['2008', '2009', '2010'], '6Zok8fOGKlKnPmmA3BNM.png');
chromeLogoVersions.set(['2011', '2012', '2013'], 'AkT3tMmLmIlEphta9Zv0.png');
chromeLogoVersions.set(
  ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
  '03FZEfj2hitsD2V7kSGz.png'
);
chromeLogoVersions.set(['2022'], 'ln27L4WEXP4h01jLfNBc.png');
class Slider {
  constructor() {
    this.currentIndex = 0;
    this.previousIndex = 0;
    this.navigationWrapper = document.querySelector(
      `.${cssClasses.NAVIGATION_WRAPPER}`
    );
    this.lastYearSec = document.querySelector(`#${cssClasses.SECTION_2022}`);
    this.lastYearSecTop =
      this.lastYearSec.offsetTop + this.lastYearSec.offsetHeight;
    this.initialize();
  }
  initialize() {
    const scrollToFristSec = document.querySelector(
      `.${cssClasses.SCROLL_SECTION}`
    );
    const scrollToTopSec = document.querySelector(`.${cssClasses.BACK_TO_TOP}`);
    const footerElement = document.querySelector(`.${cssClasses.FOOTER}`);
    const preFooterElement = document.querySelector(
      `.${cssClasses.PRE_FOOTER}`
    );
 
    window.addEventListener('load', () => {
      /* eslint-disable no-undef */
      const yearTimeline = gsap.timeline();
      yearTimeline.add(this.startup());
      yearTimeline.add(this.scrollSections());
      yearTimeline.add(this.clickNavLink());
      yearTimeline.add(this.handleTab());
    });
    // adding click event listener for scroll to begin.
    scrollToFristSec.addEventListener('click', e => {
      e.preventDefault();
      const firstSec = document.querySelector(`#${cssClasses.SECTION_2008}`);
      gsap.to(window, {
        scrollTo: firstSec,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    });
 
    // adding click event listener for back to top
    scrollToTopSec.addEventListener('click', e => {
      e.preventDefault();
      const firstSec = document.querySelector(`.${cssClasses.HERO_SECTION}`);
      gsap.to(window, {
        scrollTo: firstSec,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    });
 
    // Adding Observer on whndow to hide year navigation on prefooter/footer section
    Observer.create({
      target: window,
      type: 'wheel',
      onUp: () => {
        this.hideNavigation(window.pageYOffset, this.lastYearSecTop);
      },
      onDown: () => {
        this.hideNavigation(window.pageYOffset, this.lastYearSecTop);
      },
    });
 
    // Register IntersectionObserver for pre footer section
    const preFooterIntersection = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          this.navigationWrapper.classList.add(cssClasses.HIDE_ON_PRE_FOOTER);
        } else {
          this.navigationWrapper.classList.remove(
            cssClasses.HIDE_ON_PRE_FOOTER
          );
        }
      });
    });
 
    // Register IntersectionObserver for footer section
    const footerIntersection = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          this.navigationWrapper.classList.add(cssClasses.HIDE_ON_FOOTER);
        } else {
          this.navigationWrapper.classList.remove(cssClasses.HIDE_ON_FOOTER);
        }
      });
    });
 
    preFooterIntersection.observe(preFooterElement);
    footerIntersection.observe(footerElement);
  }
 
  hideNavigation(windowScroll, targetOffSet) {
    if (windowScroll >= targetOffSet) {
      this.navigationWrapper.classList.add(cssClasses.HIDE_ON_FOOTER);
    } else {
      this.navigationWrapper.classList.remove(cssClasses.HIDE_ON_FOOTER);
    }
  }
 
  startup() {
    const yearNavigationTimeline = gsap.timeline({
      id: 'Loading year navigation',
      defaults: {duration: 0.9},
    });
    yearNavigationTimeline.from(`.${cssClasses.YEAR_NAVIGATION}`, {
      autoAlpha: 0,
      y: 1000,
    });
    yearNavigationTimeline.from(
      `.${cssClasses.MENU_ITEM}`,
      {autoAlpha: 0, y: 100, stagger: 0.1, ease: 'power.out'},
      '<'
    );
    return yearNavigationTimeline;
  }
  scrollSections() {
    let oldScrollValue = 0;
    let newScrollValue = 0;
 
    const firstYearSection = document.querySelector(
      `.${cssClasses.CARD_SECTION}`
    );
    const chromeLogo = document.querySelector(`.${cssClasses.CHROME_LOGO}`);
    const chromeLogoYear = document.querySelector(
      `.${cssClasses.CHROME_LOGO_TEXT}`
    );
 
    gsap.utils.toArray(`.${cssClasses.YEAR_SECTION}`).forEach(section => {
      const activeSection = section.id;
      const menuitem = 'menu__'.concat(activeSection);
      const menulink = document
        .getElementById(menuitem)
        .querySelector(`.${cssClasses.MENU_ITEM_LINK}`);
      const yearScrollTimeline = gsap.timeline({
        id: 'year-timeline',
        defaults: {duration: 5},
        scrollTrigger: {
          trigger: section,
          id: 'timeline-nav',
          onToggle: self => {
            newScrollValue = window.pageYOffset;
            const isActive = self.isActive;
            const activeItemIndex = self.trigger.dataset.index;
            const sectionId = self.trigger.id.match(/\d+/g)[0];
 
            for (const [key, value] of chromeLogoVersions.entries()) {
              if (key.includes(sectionId)) {
                chromeLogo.src = `${imgBaseUrl}${value}`;
                chromeLogo.srcset = `${imgBaseUrl}${value}`;
              }
            }
 
            chromeLogoYear.textContent = sectionId;
 
            if (oldScrollValue < newScrollValue) {
              if (isActive) {
                this.currentIndex = activeItemIndex;
              } else {
                this.previousIndex = activeItemIndex;
              }
            } else if (oldScrollValue > newScrollValue) {
              if (isActive) {
                this.currentIndex = activeItemIndex;
              } else {
                this.previousIndex = activeItemIndex;
              }
            }
            oldScrollValue = newScrollValue;
          },
          start: 'top 20%',
          end: '50%',
          onUpdate: () => {
            if (window.pageYOffset >= firstYearSection.offsetTop) {
              this.navigationWrapper?.classList.add(
                cssClasses.FIXED_NAVIGATION_WRAPPER
              );
            } else {
              this.navigationWrapper?.classList.remove(
                cssClasses.FIXED_NAVIGATION_WRAPPER
              );
            }
          },
          toggleActions: 'play reverse play reverse',
        },
      });
 
      yearScrollTimeline.to(
        menulink,
        {
          duration: 0.25,
          fontWeight: 700,
          fontSize: '1.5em',
          lineHeight: 1,
          className: 'sectionLink ga-event active-year',
        },
        '>'
      );
      return yearScrollTimeline;
    });
  }
  clickNavLink() {
    gsap.utils.toArray(`.${cssClasses.MENU_ITEM_LINK}`).forEach(item => {
      const activeSection = item.getAttribute('href');
      item.addEventListener('click', function (e) {
        e.preventDefault();
        this.previousIndex = item.dataset.index;
        gsap.to(window, {duration: 1, scrollTo: activeSection});
      });
    });
  }
  handleTab() {
    gsap.utils.toArray(`.${cssClasses.MENU_ITEM_LINK}`).forEach(item => {
      item.addEventListener('keyup', event => {
        const code = event.keyCode || event.which;
        this.previousIndex = event.target.dataset.index;
        if (code === 9) {
          gsap.to(window, {
            duration: 1,
            scrollTo: `#section${event.target.dataset.section}`,
          });
        }
      });
    });
  }
}
export default new Slider();
