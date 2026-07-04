export async function notificarPerigo(bairro: string): Promise<void> {
  const mensagem = `Nível de água em PERIGO no bairro ${bairro}. Evite a zona.`;

  await fetch('https://ntfy.sh/alerta-maputo-blaze', {
    method: 'POST',
    headers: {
      Title: 'Alerta de Cheia',
      Priority: 'urgent',
    },
    body: mensagem,
  });
}
