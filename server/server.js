import { fetch } from 'meteor/fetch';

reCAPTCHA = {
    settings: {},
    config: function(settings) {
        return _.extend(this.settings, settings);
    },
    verifyCaptcha: async function(clientIP, response) {
        var captcha_data = {
            secret: this.settings.privatekey,
            remoteip: clientIP,
            response: response
        };

        var serialized_captcha_data =
            'secret=' + captcha_data.secret +
            '&remoteip=' + captcha_data.remoteip +
            '&response=' + captcha_data.response;
        var captchaVerificationResult;
        var success = false; // used to process response string

        try {
            const result = await fetch("https://www.google.com/recaptcha/api/siteverify", {
                method: 'POST',
                body: serialized_captcha_data.toString('utf8'),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': serialized_captcha_data.length
                }
            });
            if (result.ok) {
                captchaVerificationResult = await result.json();
            }else{
                return {
                    'success': false,
                    'error': 'Service Not Available'
                };
            }
        } catch (e) {
            console.log(e);
            return {
                'success': false,
                'error': 'Service Not Available'
            };
        }

        return captchaVerificationResult;
    }
}
