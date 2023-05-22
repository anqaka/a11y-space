export class Tabs {
  tabs: HTMLElement[];
  tabWrapper: HTMLElement;
  firstTab: HTMLElement | null;
  lastTab: HTMLElement | null;
  tabpanels: Array<HTMLElement | null>;

  constructor(tabWrapper) {
    this.tabWrapper = tabWrapper;
    this.tabs = Array.from(this.tabWrapper.querySelectorAll('[role=tab]'));

    this.firstTab = null;
    this.lastTab = null;

    this.tabpanels = [];

    this.tabs.forEach((tab) => {
      const tabpanel = this.tabWrapper.querySelector(`#${tab.getAttribute('aria-controls')}`);
      tab.tabIndex = -1
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel as HTMLElement);
      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));
      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    })

    this.setSelectedTab(this.firstTab)
  }

  setSelectedTab(currentTab) {
    this.tabs.forEach((tab, index) => {
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        this.tabpanels[index]?.setAttribute('aria-hidden', 'false');
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
        this.tabpanels[index]?.setAttribute('aria-hidden', 'true');
      }
    })
  }

  moveFocusToTab(currentTab) {
    currentTab.focus();
  }

  moveFocusToPreviousTab(currentTab) {
    let index;

    if (currentTab === this.firstTab) {
      this.moveFocusToTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index - 1]);
    }
  }

  moveFocusToNextTab(currentTab) {
    let index;

    if (currentTab === this.lastTab) {
      this.moveFocusToTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event) {
    let tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocusToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.moveFocusToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.moveFocusToTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.moveFocusToTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  // Since this example uses buttons for the tabs, the click onr also is activated
  // with the space and enter keys
  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}
