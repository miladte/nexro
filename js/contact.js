const contactForm = document.getElementById('contact-message-form');

if (contactForm instanceof HTMLFormElement) {
  const submitButton = document.getElementById('contact-submit');
  const formStatus = document.getElementById('form-status');
  const fields = {
    name: {
      input: document.getElementById('contact-name'),
      error: document.getElementById('name-error'),
      message: 'لطفاً نام خود را وارد کنید.'
    },
    email: {
      input: document.getElementById('contact-email'),
      error: document.getElementById('email-error'),
      message: 'لطفاً آدرس ایمیل معتبر وارد کنید.'
    },
    subject: {
      input: document.getElementById('contact-subject'),
      error: document.getElementById('subject-error'),
      message: 'لطفاً موضوع پیام را انتخاب کنید.'
    },
    message: {
      input: document.getElementById('contact-message'),
      error: document.getElementById('message-error'),
      message: 'لطفاً متن پیام را وارد کنید.'
    }
  };
  let isSubmitting = false;

  function validateField(field) {
    const value = field.input.value.trim();
    const isEmail = field.input.type === 'email';
    const isValid = value.length > 0 && (!isEmail || field.input.validity.valid);

    field.input.setAttribute('aria-invalid', String(!isValid));
    field.error.textContent = isValid ? '' : field.message;
    return isValid;
  }

  Object.values(fields).forEach((field) => {
    field.input.addEventListener('input', () => {
      if (field.input.getAttribute('aria-invalid') === 'true') {
        validateField(field);
      }
      formStatus.textContent = '';
    });
    field.input.addEventListener('change', () => {
      if (field.input.getAttribute('aria-invalid') === 'true') {
        validateField(field);
      }
    });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    formStatus.textContent = '';

    const isValid = Object.values(fields).map(validateField).every(Boolean);
    if (!isValid) {
      const firstInvalidField = Object.values(fields).find(
        (field) => field.input.getAttribute('aria-invalid') === 'true'
      );
      firstInvalidField.input.focus();
      return;
    }

    isSubmitting = true;
    Object.values(fields).forEach((field) => {
      field.input.value = field.input.value.trim();
    });

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    formStatus.textContent = 'این یک ثبت نمایشی است؛ پیام شما به سرور ارسال یا ذخیره نشد.';

    window.setTimeout(() => {
      isSubmitting = false;
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      contactForm.reset();
      Object.values(fields).forEach((field) => {
        field.input.removeAttribute('aria-invalid');
        field.error.textContent = '';
      });
      formStatus.textContent = 'فرم نمایشی با موفقیت بررسی شد؛ پیام به سرور ارسال یا ذخیره نشد.';
    }, 600);
  });
}
