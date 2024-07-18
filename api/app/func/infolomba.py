from json import dumps, loads
import requests
from app.config import TURNSTILE_SECRET_KEY
from app.models.response import TurnstileRes


async def turnstile(response):
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = f"secret={TURNSTILE_SECRET_KEY}&response={response}"
    response = requests.post(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        headers=headers,
        data=data,
    )
    json = response.json()
    return TurnstileRes(error_code=json["error-codes"], **json)


def find_difference(lst1, lst2):
    set1 = dics_to_set(lst1)
    set2 = dics_to_set(lst2)

    if [loads(x) for x in set1.difference(set2)]:
        raise ValueError("Please provide a valid category")


def dics_to_set(lst):
    return set(dumps(x, sort_keys=True) for x in lst)


def check_unique_items(items):
    seen = set()
    for item in items:
        key = (item["id"], item["name"])
        if key in seen:
            raise ValueError(f"Duplicate item found: {item}")
        seen.add(key)


def short_ig_url(post_url):
    start = post_url.find("/p/") + 3
    end = post_url.find("/", start)
    if end == -1:
        end = post_url.find("?", start)
    if end == -1:
        end = len(post_url)
    shortcode = post_url[start:end]
    return shortcode
