# Saimo TV · LG webOS

**Canais ao vivo, filmes, séries, animes e doramas na sua TV LG** — com guia de programação (EPG), favoritos, rádios, jogos do dia e pareamento pelo celular. Feito para webOS, roda direto na TV, sem TV Box.

- **Canais ao vivo** com EPG (o que está passando e o que vem a seguir) e múltiplas fontes por canal — se uma cai, o player pula para a próxima
- **On Demand**: catálogo de filmes, séries, animes e doramas com fichas (sinopse, elenco, nota), temporadas e episódios
- **Busca global**: acha canais, filmes, séries e animes de uma vez
- **Sua lista no celular**: adicione sua lista M3U/Xtream pelo celular e pareie com a TV por código
- **Rádios, jogos de hoje com horários, favoritos** e modo lista/grade no Ao vivo

---

## ⬇️ Baixar o instalador (IPK)

1. Abra a página de **[versões (Releases)](https://github.com/michellcosta/nx-connect/releases/latest)**
2. Na seção **Assets**, baixe o arquivo **`com.saimo.tv_…_all.ipk`** — sempre o da versão mais recente
3. Siga a instalação abaixo

> Link direto da versão mais recente (para quem prefere URL): `https://github.com/michellcosta/nx-connect/releases/latest`
> O histórico de mudanças de cada versão está na descrição de cada Release.

---

## 📺 Instalar na TV LG

Você precisa deixar a TV em **modo desenvolvedor** uma única vez. Depois, instalar o app leva 1 minuto.

### Caminho A — só com a TV e o celular (sem PC)

1. Na TV, abra a **LG Content Store** e instale o app **Developer Mode**
2. Abra o Developer Mode, crie/entre numa conta LG Developer (grátis) e **ative o Dev Mode**
   - A TV reinicia e passa a aceitar apps fora da loja
   - ⚠️ O Dev Mode expira de tempos em tempos (50 horas de uso): basta reabrir o app Developer Mode e renovar — o Saimo continua instalado
3. Instale na TV o app **Dev Manager** (ou *Device Manager*) pela LG Content Store
4. No Dev Manager, escolha **Install app / Instalar via arquivo** e selecione o `.ipk` que você baixou (pode estar num pendrive ou no celular)
5. Pronto — o **Saimo TV** aparece na barra de apps da TV

### Caminho B — com computador (linha de comando)

```bash
# uma vez, no PC (precisa de Node.js instalado)
npm install -g @webosose/ares-cli

# descobrir a TV (TV no mesmo Wi-Fi, Dev Mode ativo — o passphrase aparece no app Developer Mode)
ares-install-setup

# instalar
ares-install com.saimo.tv_2.1.0_all.ipk
```

---

## 🚀 Primeiros passos no app

1. **Coloque sua lista para rodar**: no celular ou PC, acesse **[nx-conexao.pages.dev/ligar](https://nx-conexao.pages.dev/ligar)**, cole o endereço da sua lista (M3U ou Xtream) e gere um **código de 6 letras**
2. No Saimo TV, abra **Ajustes → Minha lista** e digite o código — TV e celular se conectam
3. Navegue com as setas do controle, **OK** abre, o botão **vermelho** busca
4. **Botão amarelo** favorita um canal; **Ajustes** tem qualidade de capa, áudio dublado/legendado, legendas e mais

---

## ✅ Requisitos

| | |
|---|---|
| TV | LG com webOS **3.0 ou superior** (recomendado webOS 22+ — TVs 2022 em diante) |
| Modo | Developer Mode ativo (ver instalação) |
| Internet | Wi-Fi ou cabo; o app baixa catálogos e capas sozinho |

---

## 🔧 Para desenvolvedores — build próprio

```bash
git clone https://github.com/michellcosta/nx-connect.git
cd nx-connect
npm install

npm run build     # transpila src/ → js/ (Chromium 38, webOS 3.x+) e gera js/versao.js a partir do appinfo.json
gerar_ipk.bat     # Windows — empacota o IPK com ares-package (ou use empacotar.sh no Linux/Mac)
```

Estrutura principal: `saimo-lg-webos/` (app), `saimo-lg-webos/worker/` (worker Cloudflare: proxy, EPG em KV, ranking), `tools/` (build e conversores).

### Como lançar uma versão nova

1. Suba a versão em `saimo-lg-webos/appinfo.json` (é dela que o `js/versao.js` e o nome do IPK derivam)
2. Commite e marque a tag **igual à versão**: `git tag v2.0.3 && git push origin main --tags`
3. O GitHub Action builda o IPK e publica a Release automaticamente com o arquivo anexado

---

## ⚠️ Aviso

O Saimo TV é um **player**: não fornece nem hospeda conteúdo. Canais, filmes e séries dependem **da lista que você configura** (sua conta IPTV/M3U/Xtream). Use de acordo com as leis da sua região e os termos do seu provedor.
