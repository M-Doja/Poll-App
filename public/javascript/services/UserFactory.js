(function() {
  "use strict";
  angular.module('app')
  .factory('UserFactory', UserFactory);
  function UserFactory($http, $q) {
    var o = {};

    o.registerUser = function(user) {
      var q = $q.defer();
      $http.post('/api/user/register', user).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.loginUser = function(user) {
      var q = $q.defer();
      $http.post('/api/user/login', user).then(function(res) {
        o.setToken(res.data); //puts the token on localStorage
        var user = o.getUser();
        o.status.username = user.username;
        o.status._id = user._id;
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.setToken = function(token) {
      localStorage['token'] = token;
    };

    o.getToken = function() {
      return localStorage['token'];
    };

    o.removeToken = function() {
      localStorage.removeItem('token');
    };

    function urlBase64Decode(str) {
      var output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0: { break; }
        case 2: { output += '=='; break; }
        case 3: { output += '='; break; }
        default: {
          throw 'Illegal base64url string!';
        }
      }
      return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
    }

    o.getUser = function() {
      return JSON.parse(urlBase64Decode(o.getToken().split('.')[1]));
    };

    o.logout = function(){
      o.removeToken();
      o.status.username = null;
      o.status._id = null;
    };

    var token = o.getToken();
    o.status = {};
    if(token) {
      var user = o.getUser();
      o.status.username = user.username;
      o.status._id = user._id;
    }
    return o;
  }
})();
