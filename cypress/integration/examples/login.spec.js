describe('login', () => {
  it('simulates login', () => {
    cy.visit('http://local.beacondates.com:3000');
    cy.contains('Login');
    cy.contains('Save').click();
    cy.contains('Log in with Google');
    cy.setCookie(
      'session',
      'eyJyZXR1cm5UbyI6Imh0dHA6Ly9sb2NhbC5iZWFjb25kYXRlcy5jb206MzAwMC8iLCJwYXNzcG9ydCI6eyJ1c2VyIjp7InByb2ZpbGUiOnsic3ViIjoiMTExMDg0NTE1ODY3ODAxNTkyNjA4IiwibmFtZSI6Ik5hdGhhbiBWaXJ0cnUiLCJnaXZlbl9uYW1lIjoiTmF0aGFuIiwiZmFtaWx5X25hbWUiOiJWaXJ0cnUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy00aFNyeGUxOVYtZy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNsb2h4NFRQaVBaZTlDdEN4MlM4b200bk1UeGx3L3M5Ni1jL3Bob3RvLmpwZyIsImVtYWlsIjoibmF0aGFudmlydHJ1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJsb2NhbGUiOiJlbiIsImlkIjoyfSwidG9rZW4iOiJ5YTI5LmEwQWZINlNNQ3BZWVZfOWkwbVFHUnFjT0k0UDdWT01veF9Oc2c1Zm5Fc3pGTEg0d2pfdUc0SkpKNlVyc0R6RkMtNElQSHZqNGNBbGstOTV2MTdWUS1IZDFQQy1XamNuLV9ZN2tJV3YyTzc4cGRLS2hDbmhqbnBsM0JOWkx5eVFtZEYwc09NQk1sb3VtR0ZFZzFTVzdrdGFxR1AyM3dkcGxzIn19LCJ0b2tlbiI6InlhMjkuYTBBZkg2U01DcFlZVl85aTBtUUdScWNPSTRQN1ZPTW94X05zZzVmbkVzekZMSDR3al91RzRKSko2VXJzRHpGQy00SVBIdmo0Y0Fsay05NXYxN1ZRLUhkMVBDLVdqY24tX1k3a0lXdjJPNzhwZEtLaENuaGpucGwzQk5aTHl5UW1kRjBzT01CTWxvdW1HRkVnMVNXN2t0YXFHUDIzd2RwbHMifQ==',
    );
    cy.setCookie('session.sig', 'TwWDMVIHiXzebgP_M4w9bmVmdFo');
    cy.setCookie(
      'token',
      'ya29.a0AfH6SMCpYYV_9i0mQGRqcOI4P7VOMox_Nsg5fnEszFLH4wj_uG4JJJ6UrsDzFC-4IPHvj4cAlk-95v17VQ-Hd1PC-Wjcn-_Y7kIWv2O78pdKKhCnhjnpl3BNZLyyQmdF0sOMBMloumGFEg1SW7ktaqGP23wdpls',
    );
    cy.reload();
    cy.contains('Hi, Nathan').click();
    cy.contains('Nathan Virtru');
    cy.contains('Your profile').click();
    cy.contains('Edit Profile').click();
    cy.contains('Save Changes');
    cy.contains('Cancel').click();
    cy.contains('Draft New Date Idea').click();
    cy.contains('Cancel').click();
  });
});
