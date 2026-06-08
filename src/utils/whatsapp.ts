export function submitToWhatsApp(e: any) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  let text = 'Новая заявка с сайта:\n\n';
  for (const [key, value] of formData.entries()) {
    if (value) text += key + ': ' + value + '\n';
  }
  window.open('https://wa.me/77073134050?text=' + encodeURIComponent(text), '_blank');
}
