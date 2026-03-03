# PetroLog v2.1.0 - Backlog & Planning

Este documento centraliza as correções e novas funcionalidades planejadas para o próximo grande update do aplicativo, com foco em uma melhor experiência nativa no Android e aprimoramento de UX/Cálculos.

---

## 🐞 Bugs Android (Nativos via Capacitor)

Quando empacotado como APK, algumas APIs nativas da web param de funcionar como o esperado. As seguintes correções precisam ser implementadas:

- [ ] **Interface sobreposta:** Navbar do sistema Android e a barra de notificação (status bar) estão sobrepondo o conteúdo do app.
  * **Solução:** Configurar `viewport-fit=cover` e usar variavéis CSS de safe-area (`env(safe-area-inset-top)`) no Header e no BottomNav.
- [ ] **Notificações não ativam:** A solicitação nativa do JS (`Notification.requestPermission`) devolve que o navegador não suporta.
  * **Solução:** Instalar `@capacitor/local-notifications`. O app deve verificar `Capacitor.isNativePlatform()` e usar o plugin apropriado.
- [ ] **Exportação de Backup não baixa:** O evento de clique em um blob (`URL.createObjectURL`) é ignorado pela WebView do Android.
  * **Solução:** Instalar os plugins `@capacitor/filesystem` e `@capacitor/share`. O app deve salvar o JSON localmente e abrir a janela de "Compartilhamento" nativa do Android.

---

## 🛠️ Novas Funcionalidades (Features)

- [ ] **Edição de Registros:** Permitir que o usuário clique em um abastecimento ou manutenção já salvo na lista e edite seus valores.
- [ ] **Esqueci o Odômetro:** Adicionar um botão no formulário de abastecimento para "Não lembro a km". O app deve estimar a km com base na média histórica e nos litros recém-colocados, ou apenas isolar aquele registro do histórico exato.
- [ ] **Tipo de Combustível:** Incluir um seletor visual na hora do abastecimento (Gasolina Comum, Gasolina Aditivada, Etanol, Podium, etc). 
  * Essa flag vai enriquecer as estatísticas no futuro (ex: qual combustível rende mais).

---

## 🎨 Melhorias de UX & Cálculos

- [ ] **Auto-formatação (Máscaras):** Inputs de moeda e odômetro devem formatar automaticamente enquanto o usuário digita (ex: digitando "5000", o campo de dinheiro converte instantaneamente para "R$ 50,00"), no padrão de aplicativos de banco.
- [ ] **Fim das Dízimas Periódicas:** Revisar todos os cálculos no `AppContext` para garantir que o JavaScript não gere imprecisões de float (ex: `12.60000000001`). Usar coerção dura ou ferramentas de arredondamento em todas as contas (distância / litros).

---

> Esse arquivo serve como guia de implementação técnica para que não se perca o escopo do que precisa ser desenvolvido na atualização v2.1.0.
