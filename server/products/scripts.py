import requests
import json
import xmltodict
from pprint import pprint

def get_shipping(zipcode):
  pac_response = requests.get(f'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=37550024&sCepDestino={zipcode}&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3').content
  sedex_response = requests.get(f'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=37550024&sCepDestino={zipcode}&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=4014&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3').content
  pac = xmltodict.parse(pac_response)['Servicos']['cServico']
  sedex = xmltodict.parse(sedex_response)['Servicos']['cServico']

  return sedex, pac

get_shipping('30110001')