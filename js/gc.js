// **** Token Implicit Grant (Browser) - UserLogin ****

const redirectUri = window.location.href;
const platformClient = require('platformClient');
const client = platformClient.ApiClient.instance;


client.setPersistSettings(true);

let userInfo = {
    id: undefined,
    name: undefined,
    mail: undefined,
    phone: undefined,
    groups: []
};



function login(_env, _clientId, _startDate, _endDate) {
    return new Promise(async (resolve, reject) => {
        try {
            // Authenticate                       
            client.setEnvironment(_env);
           
            client.loginImplicitGrant(_clientId, redirectUri.split("?")[0], {state: `environment=${_env}&clientId=${_clientId}&startDate=${_startDate}&endDate=${_endDate}`})
                .then(() => {
                    console.log('Logged In');
                    let gcToken = platformClient.ApiClient.instance.authData.accessToken;
                    console.log(`Genesys Cloud Token: ${gcToken}`);
                    resolve(gcToken);

                })
        } catch (error) {
            alert(error);
            console.log(error);
            reject(error);
        }
    });
}

function sendNotification(_message, _region) {

    let data =
    {
        "message": _message,
        "metadata": `newRequest | ${_region}`
    }

    $.ajax({
        url: `https://apps.mypurecloud.ie:443/webhooks/api/v1/webhook/91ebde78-7dfe-4279-b5af-b8fe187b0973`,
        type: "POST",
        data: data,
        dataType: "json",
        success: function (response) {
            var resp = JSON.parse(response)
            console.log(resp.status);
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });


}

function getUrlParameter(sParam) {

    var sPageURL = '';
    try {
        if (window.location.search.substring(1) == "") {
            sPageURL = window.location.href.replace('#', '?')
            sPageURL = sPageURL.split('?')[1]
        }
        else
            sPageURL = window.location.search.substring(1);

        if (!sPageURL) return

        var sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    } catch (error) {
        console.error(error);
    }

};


function getParameterFromString(sParam, _string) {
    try {
        
        if (!_string) return

        var sURLVariables = _string.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    } catch (error) {
        console.error(error);
    }

};

