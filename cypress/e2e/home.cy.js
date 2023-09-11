describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('the h1 contains the correct text', () => {
    cy.getByData('hero-heading').contains(
      'What does penguin know about web accessibility?'
    )
  })

  it('Header navigation items have correct label', () => {
    cy.getByData('header-navigation').get('ul > li').eq(0).contains('Home')
  })

  context('Live region page', () => {
    it('Live region page is accessible', () => {
      cy.getByData('header-navigation').get('ul > li').find('a').contains('Live region').click()
      cy.location('pathname').should('equal', '/live-region')
    })
  })
})