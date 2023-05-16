export class Dialog {
  trigger: HTMLElement;
  el: HTMLElement;
  content: HTMLElement | null;
  closeButtons: NodeListOf<Element> | null;
  activeClass: string;

  constructor(dialogTrigger, dialogElement) {
    console.log()
    this.trigger = dialogTrigger
    this.el = dialogElement
    this.content = this.el?.querySelector('.dialog__content') as HTMLElement
    this.closeButtons = this.el?.querySelectorAll('.dialog__close-button')
    this.activeClass = 'active'
    this.setListeners()
  }

  openDialog() {
    this.el.classList.add(this.activeClass);
  }

  closeDialog() {
    this.el.classList.remove(this.activeClass);
  }

  setListeners() {
    console.log(this.trigger)
    this.trigger.addEventListener('click',
      () => this.openDialog()
    )

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
    })
  }
}
