export class Tabs {
  tabs: HTMLElement[];
  tabWrapper: HTMLElement;
  firstTab: HTMLElement | null;
  lastTab: HTMLElement | null;
  tabpanels: Array<HTMLElement | Element | null>;

  constructor(tabWrapper) {
    this.tabWrapper = tabWrapper;
    this.tabs = Array.from(this.tabWrapper.querySelectorAll('.tab'));

    this.firstTab = null;
    this.lastTab = null;

    this.tabpanels = [];

    const tabpanelList = this.tabWrapper.querySelectorAll('.tabpanel')
    this.tabs.forEach((tab, i) => {
      const tabpanel = tabpanelList[i];
      this.tabpanels.push(tabpanel);
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
        tab.classList.add('selected');
        this.tabpanels[index]?.classList.add('active');
      } else {
        tab.classList.remove('selected');
        this.tabpanels[index]?.classList.remove('active');
      }
    })
  }

  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}
