
import { Injectable } from '@angular/core';
import {Transaction} from "../../app/interfaces/iTransaction";
import {Api} from "..";


@Injectable()
export class PushProvider {


  swRegistration = null;
  isSubscribed = false;
  readonly applicationServerPublicKey = 'BAQrd8Zlbiw-GwnoZON03SKCTbM7S4MsopPDDJyr7c3_-PLAzZl1OQ4iMhTsqzqwwxPKuXohHBZiWvy6Tl35Qpk';

  constructor(public api: Api) {
  }


  initPush() {
      console.log("initPush called")
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');

      navigator.serviceWorker.register('service-worker.js')
        .then((swReg) => {
          console.log('Service Worker is registered', swReg);

          this.swRegistration = swReg;

          setInterval(() => {
            //what happens
            var username = sessionStorage.getItem("username");

            console.log("Interval invoked for main.js:", username);

            if (!username) {

              if (this.isSubscribed == false) {
                this.subscribeUser();
                this.sendSubscribeInfoToBackend(username, this.swRegistration.pushManager.getSubscription());
                return; //or break or something that takes you out

              } else {

              }
            }


          }, 5000);

        })
        .catch(function (error) {
          console.error('Service Worker Error', error);
        });
    } else {
      console.warn('Push messaging is not supported');
    }
  }

  subscribeUser() {
    const applicationServerKey = this.urlB64ToUint8Array(this.applicationServerPublicKey);
    this.swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
      .then(function(subscription) {
        console.log('User is subscribed.');

        this.updateSubscriptionOnServer(subscription);

        this.isSubscribed = true;

        // updateBtn();
      })
      .catch(function(err) {
        console.log('Failed to subscribe the user: ', err);
        // updateBtn();
      });
  }

  sendSubscribeInfoToBackend(username, subInfo) {
    let postInfo = {username: username, subscription_info: subInfo }
    let seq = this.api.post('subscription', postInfo).share()
    seq.subscribe((res) => {
      console.log("Subscription result", res)
    }, err => {
      console.error("ERROR in subscription", err)
    })
  }

  updateSubscriptionOnServer(subscription) {
    //
  }

  urlB64ToUint8Array(base64String) {
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



}
