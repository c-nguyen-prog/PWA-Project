from pywebpush import webpush, WebPushException
from backend.PushSettings import *
import logging


def send_web_push(subscription_information, message_body):
    try:
        webpush(
            subscription_info=subscription_information,
            data=message_body,
            vapid_private_key=PRIVATE_KEY,
            vapid_claims=VAPID_CLAIMS
        )
    except WebPushException as exception:
        logging.error(exception)
