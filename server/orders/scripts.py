import requests
import json
from django.conf import settings

url = "https://sandbox.api.pagseguro.com/charges"

headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer 901C3D43CDE64592B1EDF751AF7BE790',
  'x-api-version': '4.0',
  'x-idempotency-key': ''
}

def pagseguro_credit_card_request(value, name, exp_month, exp_year, ccv):
    payload = json.dumps({
  "reference_id": "ex-00001",
  "description": "Shoes from Breathe Shoes",
  "amount": {
    "value": value,
    "currency": "BRL"
  },
  "payment_method": {
    "type": "CREDIT_CARD",
    "installments": 1,
    "capture": False,
    "card": {
      "number": "4111111111111111",
      "exp_month": "0"+exp_month,
      "exp_year": exp_year,
      "security_code": ccv,
      "holder": {
        "name": name.upper()
      }
    }
  }
})
    response = requests.post(url, headers=headers, data=payload)
    return json.loads(response.text)


def pagseguro_boleto_payment(product, value, shipping_info):
    payload = json.dumps({
  "reference_id": "ex-00001",
  "description": product,
  "amount": {
    "value": value*100,
    "currency": "BRL"
  },
  "payment_method": {
    "type": "BOLETO",
    "installments": 1,
    "capture": False,
    "boleto": {
      "due_date": "2022-08-10",
      "holder": {
        "address": {
          "country": "Brasil",
          "street": shipping_info['adress'],
          "number": "150",
          "locality": "São José",
          "city": shipping_info['city'],
          "region": "Minas Gerais",
          "region_code": "MG",
          "postal_code": shipping_info['zipcode']
        },
        "tax_id": "22222222222",
        "email": shipping_info['email'],
        "name": shipping_info['name']
      }
    }
  }
})
    response = requests.post(url, headers=headers, data=payload)
    return json.loads(response.text)


