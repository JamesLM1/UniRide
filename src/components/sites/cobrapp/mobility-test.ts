const defaultForm = 'https://docs.google.com/forms/d/e/1FAIpQLSdiS0ax9OnsiHCObwjds_rpDUpFROSVNxNAj-iT4tec7ko0lQ/viewform';

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

export const mobilityTestURL = publishedForm(process.env.NEXT_PUBLIC_UNIRIDE_TEST_FORM_URL);
export const mobilityTestCta = {es: 'Test gratuito', en: 'Free quiz', pt: 'Teste grátis'};
