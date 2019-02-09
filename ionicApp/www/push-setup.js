/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

// import { Api } from '../api/api';

/* eslint-env browser, es6 */

'use strict';
/*
 subscription info basically generates endpoint, it is linked to the browser and you get it with
  swRegistrqation.pushmanager.getSubscription()

  file service worker is for defining the content of the push notification and declaring the listener (listening for incoming push notifications)

endpoint is the localisation of the targeted device
subscription info HAS endpoint info among OTHER THINGS

pushSCript (formerly main.js) is the JS script where permissions, subscribe method (generate subscription info and turn into JSON string for endpoints)


  */


console.log("main.js invoked");


setInterval(function attemptSubscription(){
//what happens
  var username = sessionStorage.getItem("username");

  console.log("Interval invoked for main.js:", username);

  if(!username){

    if (isSubscribed == false) {
      subscribeUser();
      isSubscribed = true;
      sendSubscribeInfoToBackend(username, swRegistration.pushManager.getSubscription());
      return; //or break or something that takes you out

    } else {

    }
  }


}, 5000);;


function postAndCheck(postInfo) {
  let seq = this.api.post('subscription', postInfo).share();
  seq.subscribe((res) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status === "success") {

    } else {
    }
  }, err => {
    console.error('ERROR in subscription', err);
  });

  return seq;

}



function sendSubscribeInfoToBackend(username, subInfo){  //this is done once you're already subscribed
  let sub_Info = {username: username, subscription_info: subInfo}
  postAndCheck(sub_Info);

}


//using API send username, subscription_info to backend using
//login(accountInfo: any)
//{
//let seq = this.api.post('login', accountInfo).share();
//seq
//  (replace login with subscription_info, of course)


const applicationServerPublicKey = 'BAQrd8Zlbiw-GwnoZON03SKCTbM7S4MsopPDDJyr7c3_-PLAzZl1OQ4iMhTsqzqwwxPKuXohHBZiWvy6Tl35Qpk';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then(function(subscription) {
      console.log('User is subscribed.');

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;

      updateBtn();
    })
    .catch(function(err) {
      console.log('Failed to subscribe the user: ', err);
      updateBtn();
    });
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(function(error) {
      console.log('Error unsubscribing', error);
    })
    .then(function() {
      updateSubscriptionOnServer(null);

      console.log('User is unsubscribed.');
      isSubscribed = false;

      updateBtn();
    });
}

function initializeUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      isSubscribed = !(subscription === null);

      updateSubscriptionOnServer(subscription);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }

      updateBtn();
    });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
      initializeUI();
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

