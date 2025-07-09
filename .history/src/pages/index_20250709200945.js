import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Painel de Consulta Financeira</title>
        <meta name="description" content="Projeto em Next.js para acompanhar o dólar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Bem-vindo(a) ao Painel Financeiro</h1>
        <p className={styles.description}>
          Sistema simples feito em Next.js para consultar a cotação do dólar.
        </p>

        <Link href="/cotacao">
          <button className={styles.button}>Ver Cotação USD/BRL</button>
        </Link>
      </main>

      <footer className={styles.footer}>
        <p>Desenvolvido com Next.js — Projeto Escolar</p>
      </footer>
    </div>
  )
}
