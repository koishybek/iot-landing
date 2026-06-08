const fs = require('fs');
const files = [
  'src/pages/About.tsx', 
  'src/pages/Solutions.tsx', 
  'src/pages/Services.tsx', 
  'src/pages/Projects.tsx', 
  'src/pages/Partners.tsx', 
  'src/pages/Contacts.tsx', 
  'src/pages/Catalog.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    let original = c;
    
    if (!c.includes('submitToWhatsApp') && (c.includes('placeholder="Ваше имя"') || c.includes('placeholder="Опишите вашу задачу"'))) {
      c = c.replace(/import React(?:.*?) from 'react';/, match => match + '\nimport { submitToWhatsApp } from \'../utils/whatsapp\';');
      
      // Update Dialog forms
      c = c.replace(/<div className="space-y-4 pt-4">([\s\S]*?)<\/div>\s*<\/DialogContent>/g, (match, inner) => {
         inner = inner.replace(/<input type="text" placeholder="Ваше имя"/g, '<input type="text" name="Имя" required placeholder="Ваше имя"');
         inner = inner.replace(/<input type="tel" placeholder="Телефон"/g, '<input type="tel" name="Телефон" required placeholder="Телефон"');
         inner = inner.replace(/<input type="email" placeholder="Email"/g, '<input type="email" name="Email" placeholder="Email"');
         inner = inner.replace(/<input type="text" placeholder="Название компании"/g, '<input type="text" name="Компания" placeholder="Название компании"');
         inner = inner.replace(/<textarea([^>]*)placeholder="([^"]*)"/g, '<textarea$1name="$2" placeholder="$2"');
         inner = inner.replace(/<button([^>]*)onClick=\{\(\) => setConsultOpen\(false\)\}([^>]*)>/g, '<button type="submit"$1$2>');
         return `<form className="space-y-4 pt-4" onSubmit={(e) => { setConsultOpen(false); submitToWhatsApp(e); }}>${inner}</form>\n        </DialogContent>`;
      });

      // Replace standalone sections that are essentially forms but lack <form> tag
      c = c.replace(/<div className="bg-\[#F8FBF9\] rounded-2xl p-8 border border-\[#D8E8DE\] shadow-sm">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g, (match, inner) => {
         inner = inner.replace(/<input([^>]*)type="text"([^>]*)placeholder="Ваше имя"/g, '<input$1type="text" name="Имя" required$2placeholder="Ваше имя"');
         inner = inner.replace(/<input([^>]*)type="tel"([^>]*)placeholder="(?:Телефон|\+7 \(___\) ___-__-__)"/g, '<input$1type="tel" name="Телефон" required$2placeholder="+7 (___) ___-__-__"');
         inner = inner.replace(/<input([^>]*)type="email"([^>]*)placeholder="(?:Email|example@mail.com)"/g, '<input$1type="email" name="Email"$2placeholder="example@mail.com"');
         inner = inner.replace(/<textarea([^>]*)placeholder="([^"]*)"/g, '<textarea$1name="$2" placeholder="$2"');
         inner = inner.replace(/<button([^>]*)type="button"([^>]*)>/g, '<button$1type="submit"$2>');
         return `<form className="bg-[#F8FBF9] rounded-2xl p-8 border border-[#D8E8DE] shadow-sm" onSubmit={submitToWhatsApp}>${inner}</form>\n          </div>\n        </div>`;
      });
      
      // Specific to Partners.tsx and Contacts.tsx
      c = c.replace(/<div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba\(0,0,0,0.05\)] border border-\[#D8E8DE\]">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/g, (match, inner) => {
         inner = inner.replace(/<input([^>]*)type="text"([^>]*)placeholder="Ваше имя"/g, '<input$1type="text" name="Имя" required$2placeholder="Ваше имя"');
         inner = inner.replace(/<input([^>]*)type="tel"([^>]*)placeholder="(?:Телефон|\+7 \(___\) ___-__-__)"/g, '<input$1type="tel" name="Телефон" required$2placeholder="+7 (___) ___-__-__"');
         inner = inner.replace(/<input([^>]*)type="email"([^>]*)placeholder="(?:Email|example@mail.com)"/g, '<input$1type="email" name="Email"$2placeholder="example@mail.com"');
         inner = inner.replace(/<input([^>]*)type="text"([^>]*)placeholder="Название компании"/g, '<input$1type="text" name="Компания"$2placeholder="Название компании"');
         inner = inner.replace(/<textarea([^>]*)placeholder="([^"]*)"/g, '<textarea$1name="$2" placeholder="$2"');
         inner = inner.replace(/<button([^>]*)type="button"([^>]*)>/g, '<button$1type="submit"$2>');
         return `<form className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#D8E8DE]" onSubmit={submitToWhatsApp}>${inner}</form>\n          </div>\n      </section>`;
      });

      if (c !== original) {
        fs.writeFileSync(f, c);
        console.log('Updated', f);
      }
    }
  }
});
