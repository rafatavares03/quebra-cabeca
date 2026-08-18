# 🧩 Quebra-Cabeça

Um jogo interativo de quebra-cabeça desenvolvido em HTML5, CSS3 e JavaScript vanilla. Combine as peças para montar a imagem!

## Funcionalidades

- **3 Níveis de Dificuldade**
  - 🟩 Fácil: 5×3 peças (15 peças)
  - 🟨 Médio: 6×4 peças (24 peças)
  - 🟥 Difícil: 10×10 peças (100 peças)

- **Troca de Imagens**
  - Imagens aleatórias via [Picsum Photos API](https://picsum.photos)
  - Upload de imagens personalizadas
  - Redimensionamento automático das peças

- **Interação**
  - Drag and drop intuitivo
  - Feedback visual ao arrastar peças
  - Modal de resultado ao completar o quebra-cabeça
  - Opção de jogar novamente

## Como Usar

### Local
1. Clone o repositório:
```bash
git clone https://github.com/rafatavares03/quebra-cabeca.git
cd quebra-cabeca
```

2. Abra o arquivo `index.html` no navegador:
```bash
python -m http.server 8000
```

3. Navegue para `http://localhost:8000` (ou a porta indicada)

### Online
Acesse o deployment disponível no Git!

## Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e animações
- **JavaScript (Vanilla)** - Lógica do jogo
- **Canvas API** - Recorte e processamento de imagens
- **Drag and Drop API** - Interação com peças
- **Fetch API** - Integração com Picsum Photos

## Como Jogar

1. **Selecione o Nível**: Escolha Fácil, Médio ou Difícil no menu superior
2. **Mude a Imagem** (Opcional):
   - Clique em "Trocar imagem"
   - Escolha uma imagem aleatória ou faça upload da sua
3. **Arraste as Peças**: Pegue as peças do baralho e arraste para o tabuleiro
4. **Complete o Quebra-cabeça**: Encaixe todas as peças para ganhar
5. **Jogar Novamente**: Clique no botão para começar um novo jogo

## Detalhes Técnicos

### Recorte de Imagens
As imagens são recortadas dinamicamente usando a **Canvas API** com base no nível selecionado:
- Cada peça é um canvas renderizado com a parte correspondente da imagem
- O tamanho das peças é calculado automaticamente para preencher o tabuleiro

### Validação de Peças
Cada peça tem um ID único que permite validar se está na posição correta no tabuleiro.

### Responsividade
O projeto se adapta a diferentes tamanhos de tela, mantendo a proporção das peças.

## API Utilizada

- **Picsum Photos** (`https://picsum.photos`) - Imagens aleatórias de alta qualidade

## Dependências

- Nenhuma! Projeto sem dependências externas (exceto a API de imagens)


---

**Desenvolvido com ❤️**
