describe('Service Page', () => {
  it('should have proper sections', () => {
    // Start from the index page
    // cy.visit('http://localhost:3000/');
    cy.visit('/service');

    cy.url().should('include', '/service');

    cy.get('main').within(() => {
      const section = (n: number) => cy.get(`>section:nth-child(${n})`);

      // HeroSection
      section(1).find('h1').should('have.length', 1);
      section(1).find('h2').should('have.length', 1);
      section(1).find('h3').should('have.length', 1);
      section(1).find('button').should('have.length', 1);

      // InfoSection
      section(2).find('h2').should('have.length', 1);
      section(2).find('h3').should('have.length', 3);
      section(2).find('p').should('have.length', 3);

      // ApproachSection
      section(3).find('h2').should('have.length', 1);
      section(3).find('h3').should('have.length', 1);
      section(3).find('p').should('have.length', 1);

      // BookSection
      section(4).find('h2').should('have.length', 1);
      section(4).find('button').should('have.length', 1);

      // BenefitSection
      section(5).find('h2').should('have.length', 1);
      section(5).find('h3').should('have.length', 1);
      section(5).find('h4').should('have.length', 4);
      section(5).find('p').should('have.length', 5);
      section(5).find('img').should('have.length', 8);

      // QuoteSection
      section(6).find('img').should('have.length', 8);
      section(6).find('p').should('have.length', 4);
      section(6).find('.swiper').should('have.length', 2);
      section(6).find('.swiper-slide').should('have.length', 4);

    });
  });
});

export { };
