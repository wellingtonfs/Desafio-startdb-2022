class Forca {
    constructor (palavra, options = { vidas: 6 }) {
        this.palavra = palavra
        this.state = {
            estado: "aguardando chute",
            vidas: options.vidas,
            letrasChutadas: [],
            palavra: new Array(this.palavra.length).fill('_')
        }
    }

    #addLetrasPalavra(letra) {
        // realiza um mapeamento de cada letra na palavra de estado
        // substituindo os '_' pela nova letra nas posições corretas
        this.state.palavra = this.state.palavra.map(
            (item, index) => {
                if (this.palavra.charAt(index) == letra)
                    return letra
                return item
            }
        )
    }

    #updateState() {
        // caso o número de vidas seja 0, game over
        if (this.state.vidas <= 0)
            this.state.estado = "perdeu"
        // caso a palavra tenha sido finalizada, jogo ganho
        else if (!this.state.palavra.includes('_'))
            this.state.estado = "ganhou"
    }

    chutar(letra) {
        // verifica se a palavra tem mais de uma letra ou já foi utilizada
        if (letra.length > 1 || this.state.letrasChutadas.includes(letra))
            return;

        // adiciona a letra as letras já chutadas
        this.state.letrasChutadas.push(letra)

        // se a palavra contém a letra em questão, atualiza a palavra do state
        if (this.palavra.includes(letra)) {
            this.#addLetrasPalavra(letra)
        // caso contrario, remove uma vida
        } else {
            this.state.vidas -= 1
        }

        // verifica se o jogador deve continuar jogando ou não
        this.#updateState()
    }

    // retorna o estado do jogo
    buscarEstado() {
        return this.state.estado;
    }

    // retorna as informações do jogo
    buscarDadosDoJogo() {
        return {
            letrasChutadas: this.state.letrasChutadas,
            vidas: this.state.vidas,
            palavra: this.state.palavra
        }
    }
}

module.exports = Forca;
