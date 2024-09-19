from django.shortcuts import render
from .models import Filmes, Genero, Classificacao, Imagem
from .serializer import FilmesSerializar, GeneroSerializer, ClassificacaoSerializer, ImagemSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

@api_view(['GET', 'POST'])
def listar_filmes(request):
    if request.method == 'GET':
        queryset = Filmes.objects.all()
        serializer = FilmesSerializar(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = FilmesSerializar(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class FilmesViews(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Filmes.objects.all()
    serializer_class = FilmesSerializar
    
class FilmesDetailView(RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Filmes.objects.all()
    serializer_class = FilmesSerializar

class GeneroViews(RetrieveUpdateDestroyAPIView):
    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer

class ClassificacaoViews(RetrieveUpdateDestroyAPIView):
    queryset = Classificacao.objects.all()
    serializer_class = ClassificacaoSerializer

class ImagemListCreateView(ListCreateAPIView):
    queryset = Imagem.objects.all()
    serializer_class = ImagemSerializer

# class GeneroList(ListCreateAPIView):
#     queryset = Genero.objects.all()
#     serializer_class = GeneroSerializer