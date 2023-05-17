export class Dialog {
  trigger: HTMLElement;
  el: HTMLElement;
  content: HTMLElement | null;
  closeButtons: NodeListOf<Element> | null;
  activeClass: string;
  inertElements: HTMLElement[];
  focusable: string;
  focusableChildren: HTMLElement[];

  constructor(dialogTrigger, dialogElement) {
    this.trigger = dialogTrigger
    this.el = dialogElement
    this.content = this.el?.querySelector('.dialog__content')
    this.closeButtons = this.el?.querySelectorAll('.dialog__close-button')
    this.activeClass = 'active'
    this.inertElements = Array.from(document.querySelectorAll('header, footer, .maincontent'))
    this.focusable = 'a[href]:not([inert]):not([tabindex^="-"]), area[href]:not([inert]):not([tabindex^="-"]), input:not([disabled]):not([inert]):not([type="hidden"]):not([tabindex^="-"]), select:not([disabled]):not([inert]):not([tabindex^="-"]), textarea:not([disabled]):not([inert]):not([tabindex^="-"]), button:not([disabled]):not([inert]):not([tabindex^="-"]), object:not([tabindex^="-"]), embed:not([tabindex^="-"]), iframe:not([inert]):not([tabindex^="-"]), audio[controls]:not([inert]):not([tabindex^="-"]), video[controls]:not([inert]):not([tabindex^="-"]), [tabindex]:not([tabindex^="-"]):not([inert]), [contenteditable]:not([tabindex^="-"]), details:not([inert]) > summary:first-of-type:not([tabindex^="-"])'
    this.setListeners()
  }

  trap(e) {
    if (e.code === 'Escape') {
      this.closeDialog();
    }
    if (e.code === 'Tab') {
      let currentFocus = document.activeElement as HTMLElement;
      let totalOfFocusable = this.focusableChildren.length;
      let focusedIndex = this.focusableChildren.indexOf(currentFocus);
      if (e.shiftKey) {
        if (focusedIndex === 0 && totalOfFocusable) {
          e.preventDefault();
          this.focusableChildren[totalOfFocusable - 1].focus();
        }
      }
      else {
        if (focusedIndex == totalOfFocusable - 1) {
          e.preventDefault();
          this.focusableChildren[0].focus();
        }
      }
    }
  }

  openDialog() {
    this.el.setAttribute('aria-hidden', 'false');
    this.trigger.setAttribute('aria-expanded', 'true');
    this.el.classList.add(this.activeClass);
    this.focusableChildren = Array.from(this.el.querySelectorAll(this.focusable));
    this.focusableChildren[0].focus();
    this.el.addEventListener('keydown', (e) => {
      this.trap(e);
    });
    this.inertElements.forEach(element => {
      element.inert = true;
    })
  }

  closeDialog() {
    this.inertElements.forEach(element => {
      element.inert = false;
    })
    this.el.setAttribute('aria-hidden', 'true');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.el.classList.remove(this.activeClass);
    this.trigger.focus();
  }
  setListeners() {
    this.trigger.addEventListener('click',
      () => this.openDialog()
    );

    // clicking on button (x) closes the dialog
    if (this.closeButtons) {
      this.closeButtons.forEach((button) => {
        button.addEventListener('click',
          () => this.closeDialog()
        );
      })
    }
    // clicking anywhere outside of the dialog closes the dialog
    window.addEventListener('click', (e) => {
      if (e.target === this.el
        && this.el.classList.contains(this.activeClass)
        && !this.content?.contains(e.target as HTMLElement)
      ) {
        this.closeDialog()
      }
    });

    // escape key closes the dialog
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape'
        && this.el?.classList.contains(this.activeClass)
      ) {
        this.closeDialog()
      }
    });
  }
}
