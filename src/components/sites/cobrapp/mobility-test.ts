const defaultForm = 'https://docs.google.com/forms/d/1jJbtmFa4AWw1vVNgNoYVvpM4sNwjLMEnxoxsrB9aAgc/viewform';

function publishedForm(raw: string | undefined) {
  try {
    const url = new URL(raw?.trim() || defaultForm);
    const isShortLink = url.hostname === 'forms.gle' && /^\/[\w-]+\/?$/.test(url.pathname);
    const isForm = url.hostname === 'docs.google.com' &&
      /^\/forms\/(?:u\/\d+\/)?d\/(?:e\/)?[\w-]+\/viewform\/?$/.test(url.pathname);

    if (url.protocol !== 'https:' || url.username || url.password || url.port || !(isShortLink || isForm)) {
      return defaultForm;
    }

    return url.origin + url.pathname;
  } catch {
    return defaultForm;
  }
}

export const mobilityTestURL = publishedForm(undefined);
export const mobilityTestCta = {es: 'Test gratuito', en: 'Free quiz', pt: 'Teste grátis'};
