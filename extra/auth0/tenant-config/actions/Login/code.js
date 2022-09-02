/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/

exports.onExecutePostLogin = async (event, api) => {
  const { consent = false /*, onboard = false */ } = event.user.user_metadata || {};

  if (!consent) {
    api.redirect.sendUserTo(event.secrets.ONBOARDING_FORM_URL);
  }

  api.idToken.setCustomClaim(`extra`, event.user.user_metadata);
};


/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onContinuePostLogin = async (event, api) => {
  // const { form } = event.request.body || {};
  // if (form === 'consent') {
  const {
    interest,
    username,
    birthDate,
    consent = false,
    phone = '',
  } = event.request.body;

  // TODO - Add robust validation for username and birthDate
  if (consent === 'true' && username && birthDate) {
    const meta = {
      consent: true,
      consentTimestamp: Date.now(),
      interest: interest.split(','),
      username,
      birthDate,
      phone,
    };

    api.user.setUserMetadata("consent", meta.consent);
    api.user.setUserMetadata("consentTimestamp", meta.consentTimestamp);
    api.user.setUserMetadata("interest", meta.interest);
    api.user.setUserMetadata("username", meta.username);
    api.user.setUserMetadata("birthDate", meta.birthDate);
    api.user.setUserMetadata("phone", meta.phone);

    api.idToken.setCustomClaim(`extra`, { ...event.user.user_metadata, ...meta });

    // api.redirect.sendUserTo(event.secrets.ONBOARDING_FORM_URL);
    return;
  } else {
    return api.access.deny("Something went wrong.");
    // return api.access.deny("User did not consent.");
  }
  // } 

  // else if (form === 'onboarding') {
  //   if (event.request.body.interests) {
  //     const meta = { onboard: true, interests: event.request.body.interests};
  //     api.user.setUserMetadata("onboard", meta.onboard);
  //     api.user.setUserMetadata("interests", meta.interests );
  //     api.idToken.setCustomClaim(`extra`, { ...event.user.user_metadata, ...meta });
  //     return;
  //   } else {
  //     return api.access.deny("User did not selected interest.");
  //   }
  // }
  // return api.access.deny("Required information was not provided.");
};
