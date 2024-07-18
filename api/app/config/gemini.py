import json
import google.generativeai as genai

from app.config import GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config={"response_mime_type": "application/json"},
)


def get_competition_data(description: str) -> dict:
    prompt = """
    Fill in the details for the data competition including the competition name, organizer, last registration date(using ISOformat contain all, if the time is unknow assume it is 23:59 at western indonesia time), and the registration link(if unknown assume it is guidebook link). If any data is unknown, use None. Follow this JSON schema:

    Competition = {'competition_name': str, 'organizer': str, 'last_registration_date': str, 'register_link': str}
    Return: Competition"""

    try:
        raw_response = model.generate_content([description, prompt])
        return json.loads(raw_response.text)
    except Exception:
        return False
