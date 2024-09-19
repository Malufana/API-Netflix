# O Serializer serve para a conversão dos dados para Json
from rest_framework import serializers
from .models import Filmes, Genero, Classificacao, Imagem

class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = ['id', 'genero']

class FilmesSerializar(serializers.ModelSerializer): 
    # genero = GeneroSerializer()

    class Meta:
        model = Filmes
        fields = ['id', 'titulo', 'genero', 'ano', 'idioma', 'classific']
        #'urlImage'

class ClassificacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classificacao
        fields = ['id', 'classific']

class ImagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagem
        fields = ['id', 'imagem']