import requests
import json
import xmltodict
from pprint import pprint

def get_shipping(zipcode):
  response = requests.get(f'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=08082650&sDsSenha=564321&sCepOrigem=37550024&sCepDestino={zipcode}&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3').content

  data_dict = xmltodict.parse(response)['Servicos']['cServico']
  return data_dict
