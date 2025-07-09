import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function ConversorMoeda() {
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const consultarDados = async () => {
    setCarregando(true);

    const dataInicio = inicio.replace(/-/g, '');
    const dataFim = fim.replace(/-/g, '');

    const url = `https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=${dataInicio}&end_date=${dataFim}`;

    try {
      const resposta = await fetch(url);
      const resultado = await resposta.json();
      setHistorico(resultado);
    } catch (erro) {
      console.error('Erro ao consultar dados:', erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Cotação do Dólar em Reais</h1>

      <div className={styles.inputGroup}>
        <label>Selecione a data inicial:</label>
        <input
          type="date"
          value={inicio}
          onChange={e => setInicio(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Escolha a data final:</label>
        <input
          type="date"
          value={fim}
          onChange={e => setFim(e.target.value)}
        />
      </div>

      <button className={styles.button} onClick={consultarDados}>
        Consultar Cotação
      </button>

      <Link href="/">
        <button className={styles.button}>Voltar ao Início</button>
      </Link>

      {carregando && <p>Buscando dados...</p>}

      {historico.length > 0 && (
        <div>
          <h2 className={styles.title}>Histórico:</h2>
          <ul className={styles.resultList}>
            {historico.map((item, idx) => (
              <li key={idx}>
                <strong>Dia:</strong> {new Date(item.timestamp * 1000).toLocaleDateString('pt-BR')} |
                <strong> Compra:</strong> R$ {item.bid} |
                <strong> Venda:</strong> R$ {item.ask}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
