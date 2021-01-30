/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["css/app.cd4b6bb2.css","332708165713cf192070d441788a18ab"],["css/chunk-vendors.a846121f.css","d116066676cbcb5cd66d958ba420b6f0"],["favicon.ico","1ba2ae710d927f13d483fd5d1e548c9b"],["fonts/materialdesignicons-webfont.147e3378.woff","147e3378b44bc9570418b1eece10dd7c"],["fonts/materialdesignicons-webfont.174c02fc.ttf","174c02fc4609e8fc4389f5d21f16a296"],["fonts/materialdesignicons-webfont.64d4cf64.eot","64d4cf64afd77a4ad2713f648eb920e6"],["fonts/materialdesignicons-webfont.7a44ea19.woff2","7a44ea195f395e1d086010e44555a5c4"],["fonts/roboto-latin-100.5cb7edfc.woff","5cb7edfceb233100075dc9a1e12e8da3"],["fonts/roboto-latin-100.7370c367.woff2","7370c3679472e9560965ff48a4399d0b"],["fonts/roboto-latin-100italic.f8b1df51.woff2","f8b1df51ba843179fa1cc9b53d58127a"],["fonts/roboto-latin-100italic.f9e8e590.woff","f9e8e590b4e0f1ff83469bb2a55b8488"],["fonts/roboto-latin-300.b00849e0.woff","b00849e00f4c2331cddd8ffb44a6720b"],["fonts/roboto-latin-300.ef7c6637.woff2","ef7c6637c68f269a882e73bcb57a7f6a"],["fonts/roboto-latin-300italic.14286f3b.woff2","14286f3ba79c6627433572dfa925202e"],["fonts/roboto-latin-300italic.4df32891.woff","4df32891a5f2f98a363314f595482e08"],["fonts/roboto-latin-400.479970ff.woff2","479970ffb74f2117317f9d24d9e317fe"],["fonts/roboto-latin-400.60fa3c06.woff","60fa3c0614b8fb2f394fa29944c21540"],["fonts/roboto-latin-400italic.51521a2a.woff2","51521a2a8da71e50d871ac6fd2187e87"],["fonts/roboto-latin-400italic.fe65b833.woff","fe65b8335ee19dd944289f9ed3178c78"],["fonts/roboto-latin-500.020c97dc.woff2","020c97dc8e0463259c2f9df929bb0c69"],["fonts/roboto-latin-500.87284894.woff","87284894879f5b1c229cb49c8ff6decc"],["fonts/roboto-latin-500italic.288ad9c6.woff","288ad9c6e8b43cf02443a1f499bdf67e"],["fonts/roboto-latin-500italic.db4a2a23.woff2","db4a2a231f52e497c0191e8966b0ee58"],["fonts/roboto-latin-700.2735a3a6.woff2","2735a3a69b509faf3577afd25bdf552e"],["fonts/roboto-latin-700.adcde98f.woff","adcde98f1d584de52060ad7b16373da3"],["fonts/roboto-latin-700italic.81f57861.woff","81f57861ed4ac74741f5671e1dff2fd9"],["fonts/roboto-latin-700italic.da0e7178.woff2","da0e717829e033a69dec97f1e155ae42"],["fonts/roboto-latin-900.9b3766ef.woff2","9b3766ef4a402ad3fdeef7501a456512"],["fonts/roboto-latin-900.bb1e4dc6.woff","bb1e4dc6333675d11ada2e857e7f95d7"],["fonts/roboto-latin-900italic.28f91510.woff","28f9151055c950874d2c6803a39b425b"],["fonts/roboto-latin-900italic.ebf6d164.woff2","ebf6d1640ccddb99fb49f73c052c55a8"],["images/icons-192.png","401090d4f59a54de8032fd15e0518335"],["images/icons-512.png","1d1e44c35f22a0cacdc15b81c49523c2"],["index.html","3815dbf2ccd4b2feca9b7be04ba2e2f6"],["js/app.f6ad08b3.js","307d2309750c9e006c0b64b7ddd39fec"],["js/app.f6ad08b3.js.map","d3d2cd6adde9c9ed4ae5f0d062ab1e99"],["js/chunk-vendors.d5846106.js","ba4545f3ff8bba9932f9bf637548288c"],["manifest.json","44dc31f9bf1dcaf3aaa58cc5a719507a"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







