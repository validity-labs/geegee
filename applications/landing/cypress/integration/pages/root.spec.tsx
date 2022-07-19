describe('Root Page', () => {
  it('should have proper sections', () => {
    // Start from the index page
    // cy.visit('http://localhost:3000/');
    cy.visit('/');

    cy.url().should('include', '/');

    cy.get('main').within(() => {
      const section = (n: number) => cy.get(`>section:nth-child(${n})`);


      // HeroSection
      section(1).find('h1').should('have.length', 1);
      section(1).find('h2').should('have.length', 1);
      section(1).find('button').should('have.length', 1);

      // ServiceSection
      section(2).find('h2').should('have.length', 1);
      section(2).find('p').should('have.length', 5);
      section(2).find('a').should('have.length', 3);

      // TeamSection
      section(3).find('h2').should('have.length', 1);
      section(3).find('h3').should('have.length', 1);

      section(4).find('p').should('have.length', 1);
      section(4).find('img').should('have.length', 2);
      section(4).find('a').should('have.length', 1);

      // BenefitSection
      section(5).find('h2').should('have.length', 1);
      section(5).find('h3').should('have.length', 1);
      section(5).find('h4').should('have.length', 4);
      section(5).find('p').should('have.length', 4);
      section(5).find('img').should('have.length', 8);

      // BookSection
      section(6).find('h2').should('have.length', 1);
      section(6).find('p').should('have.length', 1);
      section(6).find('button').should('have.length', 1);

      // ClientSection (QuoteSection)
      section(7).find('img').should('have.length', 8);
      section(7).find('p').should('have.length', 4);
      section(7).find('.swiper').should('have.length', 2);
      section(7).find('.swiper-slide').should('have.length', 4);

      // BlogSection
      section(8).find('h2').should('have.length', 1);
      section(8).find('h3').should('have.length', 3);
      section(8).find('h4').should('have.length', 3);
      section(8).find('img').should('have.length', 6);
      section(8).find('a').should('have.length', 3);

    });
  });
});

export { };
