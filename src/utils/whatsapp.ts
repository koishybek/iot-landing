export function submitToWhatsApp(e: any) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  let text = 'Новая заявка с сайта:\n\n';
  let city = '';
  let customText = '';
  
  for (const [key, value] of formData.entries()) {
    if (value) {
      if (key.toString().toLowerCase().trim() === 'заказ') {
        customText = value.toString();
      } else {
        text += key + ': ' + value + '\n';
      }
      if (key.toString().toLowerCase().trim() === 'город') {
        city = value.toString().toLowerCase().trim();
      }
    }
  }

  const finalMessage = customText || text;

  let phoneNo = '77711731722'; // default: Astana service department
  if (city === 'алматы') {
    // Alternate between Nursultan (77073134050) and Alexandr (77057055051)
    const currentAlt = localStorage.getItem('wa_almaty_alt');
    if (currentAlt === 'alexandr') {
      phoneNo = '77073134050'; // Nursultan
      localStorage.setItem('wa_almaty_alt', 'nursultan');
    } else {
      phoneNo = '77057055051'; // Alexandr
      localStorage.setItem('wa_almaty_alt', 'alexandr');
    }
  } else if (city === 'астана') {
    phoneNo = '77711731722'; // Astana service department
  }

  window.open('https://wa.me/' + phoneNo + '?text=' + encodeURIComponent(finalMessage), '_blank');
}

