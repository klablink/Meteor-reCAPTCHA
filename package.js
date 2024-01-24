Package.describe({
    name: "altapp:recaptcha",
    summary: "Form bot protection for Meteor.",
    git: "https://github.com/Altapp/Meteor-reCAPTCHA.git",
    version: "2.0.1",
});

Package.onUse(function(api) {

    api.versionsFrom("3.0-beta.0");

    api.use([
        'templating',
        'handlebars',
    ], 'client');
    api.use([
        'http',
    ], 'server');

    api.addFiles(['server/server.js'], 'server');
    api.addFiles(['client/client.html', 'client/client.js'], 'client');
    api.export && api.export('reCAPTCHA', ['client', 'server']);
});
