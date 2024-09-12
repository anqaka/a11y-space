describe('live region', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/live-region')
  })

  it('the h1 contains the correct text', () => {
    cy.getByData('hero-heading').contains(
      'Write a message to Penguin, The Greatest'
    )
  })

  it('Send message to the penguin', () => {
    const message = 'this is a message to penguin, Hi The Greatest'
    cy.getByData('message-input').type(message)
    cy.getByData('message-submit-btn').click()
    cy.getByData('penguin-message').should('be.visible').contains(message)
    cy.get('#ai-penguin').should('exist')
  })
})