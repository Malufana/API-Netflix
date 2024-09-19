from typing import Any
from django.db import models

class Genero(models.Model):
    genero = models.CharField(max_length=255)

class Classificacao(models.Model):
    classific = models.CharField(max_length=255)

class Filmes(models.Model):
    titulo = models.CharField(max_length=255)
    genero = models.ForeignKey(Genero, on_delete=models.CASCADE)
    ano = models.CharField(max_length=255)
    idioma = models.CharField(max_length=255)
    classific = models.ForeignKey(Classificacao, on_delete=models.CASCADE)
    # urlImage = models.CharField(max_length=255)
    # imagem = models.ImageField(upload_to="capa/", blank=True, null=True)
    
class Imagem(models.Model):
    imagem = models.ImageField(upload_to='capas', blank=True, null=True)