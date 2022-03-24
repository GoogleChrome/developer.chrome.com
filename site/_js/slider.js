import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
  HIDE_NAVIGATION: 'hide-navigation',
};

class Slider {
  constructor() {
    this.currentIndex = 0;
    this.previousIndex = 0;

    this.initialize();
  }

  initialize() {
    window.addEventListener('load', () => {
      const yearTimeline = gsap.timeline();
      yearTimeline.add(this.startup());
      yearTimeline.add(this.scrollSections());
      yearTimeline.add(this.clickNavLink());
    });

    window.addEventListener('scroll', () => {
      const yearNav = document.querySelector(
        `.${cssClasses.NAVIGATION_WRAPPER}`
      );
      const fixedMenu = document.querySelector(
        `.${cssClasses.FIXED_NAVIGATION_WRAPPER}`
      );
      const lastYearSection = document.querySelector('#section2022');
      if (fixedMenu !== undefined) {
        if (
          window.pageYOffset >=
          lastYearSection.offsetTop + lastYearSection.offsetHeight - 500
        ) {
          yearNav?.classList.add(cssClasses.HIDE_NAVIGATION);
        } else {
          yearNav?.classList.remove(cssClasses.HIDE_NAVIGATION);
        }
      }
    });
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
    const progressNav = document.querySelector(
      `.${cssClasses.YEAR_NAVIGATION}`
    );
    const navItem = progressNav.querySelector(`.${cssClasses.MENU}`);
    const navOffsetHeight = progressNav.offsetHeight;
    const item = navItem.querySelectorAll(`.${cssClasses.MENU_ITEM}`)[0];
    const itemHeight =
      parseInt(window.getComputedStyle(item).height) +
      parseInt(window.getComputedStyle(item).marginBottom);
    const firstYearSection = document.getElementById('section2008');
    const chromeLogoWrapper = document.querySelector(
      `.${cssClasses.NAVIGATION_WRAPPER}`
    );
    const chromeLogo = document.querySelector(`.${cssClasses.CHROME_LOGO}`);

    gsap.utils.toArray(`.${cssClasses.YEAR_SECTION}`).forEach(section => {
      const activeSection = section.id;
      const menuitem = 'menu__'.concat(activeSection);
      const menulink = document
        .getElementById(menuitem)
        .querySelector(`.${cssClasses.MENU_ITEM_LINK}`);

      // ----create a new timeline
      const yearScrollTimeline = gsap.timeline({
        id: 'Nav Animation',
        defaults: {duration: 5},
        scrollTrigger: {
          trigger: section,
          onToggle: self => {
            newScrollValue = window.pageYOffset;
            const isActive = self.isActive;
            const activeItemIndex = self.trigger.dataset.index;
            chromeLogo.src = `/images/meta/chrome_${
              self.trigger.id.match(/\d+/g)[0]
            }.png`;

            if (oldScrollValue < newScrollValue) {
              if (isActive) {
                this.currentIndex = activeItemIndex;
                if (this.currentIndex > this.previousIndex) {
                  navItem.style.top = `${
                    navOffsetHeight / 2 -
                    (navOffsetHeight * 10) / 100 -
                    this.currentIndex * itemHeight
                  }px`;
                }
              } else {
                this.previousIndex = activeItemIndex;
              }
            } else if (oldScrollValue > newScrollValue) {
              if (isActive) {
                this.currentIndex = activeItemIndex;
                if (this.currentIndex < this.previousIndex) {
                  navItem.style.top = `${
                    navOffsetHeight / 2 -
                    (navOffsetHeight * 10) / 100 -
                    this.currentIndex * itemHeight
                  }px`;
                }
              } else {
                this.previousIndex = activeItemIndex;
              }
            }
            oldScrollValue = newScrollValue;
          },
          start: 'top 80%',
          end: '+5px',
          onUpdate: () => {
            if (window.pageYOffset >= firstYearSection.offsetTop) {
              progressNav?.classList.add(cssClasses.FIXED_YEAR_NAVIGATION);
              navItem?.classList.add(cssClasses.FIXED_MENU);
              chromeLogoWrapper?.classList.add(
                cssClasses.FIXED_NAVIGATION_WRAPPER
              );
            } else {
              progressNav?.classList.remove(cssClasses.FIXED_YEAR_NAVIGATION);
              navItem?.classList.remove(cssClasses.FIXED_MENU);
              chromeLogoWrapper?.classList.remove(
                cssClasses.FIXED_NAVIGATION_WRAPPER
              );
            }
          },
          toggleActions: 'play reverse play reverse',
        },
      });

      yearScrollTimeline.to(menulink, {duration: 0.5, scale: '2.5'}, '>');

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
}

export default new Slider();
