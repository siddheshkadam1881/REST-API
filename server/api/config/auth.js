module.exports = {
    'facebookAuth' : {
        'clientID'      : '209419629801960', // your App ID
        'clientSecret'  : 'e086447413f91b1d78437986853587a2', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback', //cllback url,
        "profileFields" :['id', 'displayName', 'name', 'gender', 'emails','photos']
    },
    'googleAuth' : {
        'clientID'      : '599491129353-ipovqfd9ls7ak6jb1rb265rmk8a2hfpr.apps.googleusercontent.com', // your App ID
        'clientSecret'  : 'Pls63NlMflCXJp3D9u8Z5Ko9', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/google/callback', //callback url
        "profileFields" :['id', 'displayName', 'name', 'gender', 'emails']
    }
};
