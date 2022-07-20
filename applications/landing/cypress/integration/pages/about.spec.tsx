describe('About Page', () => {
  it('should have proper sections', () => {
    cy.visit('/about');

    cy.url().should('include', '/about');

    cy.get('main').within(() => {
      const section = (n: number) => cy.get(`>section:nth-child(${n})`);

      // HeroSection
      section(1).find('h1').should('have.length', 1);
      section(1).find('h2').should('have.length', 1);

      // GallerySection
      section(2).find('img').should('have.length', 8);

      // TeamSection
      section(3).find('h2').should('have.length', 1);
      section(3).find('h3').should('have.length', 1);
      section(3).find('p').should('have.length', 2);
      section(3).find('img').should('have.length', 2);

      // ValueSection
      section(4).find('h2').should('have.length', 1);
      section(4).find('h3').should('have.length', 1);
      section(4).find('h4').should('have.length', 4);
      section(4).find('h5').should('have.length', 4);
      section(4).find('p').should('have.length', 4);

      // CTASection
      section(5).find('h2').should('have.length', 1);
      section(5).find('button').should('have.length', 1);
    });
  });
});

export { };
