# Image Recognition API com Express e TypeScript

Este projeto é uma API de reconhecimento de imagens que utiliza Express e TypeScript. A API recebe imagens enviadas pelos usuários, armazena no Google Cloud Storage e as analisa usando a API Google Vision para retornar uma lista de rótulos associados à imagem. Além disso, torna a imagem pública e retorna seu URL.

## Pré-requisitos

Node.js
npm
Conta no Google Cloud Platform (GCP)
Ativar a API Google Vision e Google Cloud Storage no GCP
Criar um bucket no Google Cloud Storage
Gerar uma chave de API e uma chave de autenticação JSON para o projeto no GCP

## Instalação

1 - Clone o repositório:

```
git clone https://github.com/codehiga/gcp-image-recognition.git
cd gcp-image-recognition
```

2 - Instale as dependências do projeto:

```
npm install
```

3 - Configure as variáveis de ambiente. Copie o arquivo .env.example para .env e preencha as informações do seu projeto no GCP:

```
GCS_BUCKET_NAME=your_bucket_name
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/google-credentials.json
```

## Execução

Para executar o projeto em modo de desenvolvimento, use o comando:

```
npm run dev
```

Para compilar o projeto e executá-lo em modo de produção, use os comandos:

```
npm run build
npm start
```

A API estará disponível em http://localhost:3000.

## Endpoints

POST /api/image/upload
Recebe uma imagem no formato multipart/form-data e retorna o URL e URI da imagem armazenada no Google Cloud Storage.

```
// Response:
{
    "imageUploaded": {
        "uri": "gs://bucket-name/file-name",
        "url": "https://storage.googleapis.com/bucket-name/file-name"
    }
}
```

POST /api/image/analyze
Recebe no body a uri (exemplo abaixo) e retorna uma lista com a descrição da analise efetuada e a chance de acerto;

```
// Request:
{
    "uri": "gs://bucket-name/file-name"
}
```

```
// Response:
{
    "labels": [
        {
            "score": 0.942572295665741,
            "description": "Photograph"
        },
        {
            "score": 0.9226526618003845,
            "description": "Ecoregion"
        }
    ]
}
```

Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter detalhes.
