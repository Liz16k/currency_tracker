import { CONTACTS } from '@utils/constants';
import { APP_CONTACT_ADDRESS, APP_CONTACT_EMAIL } from '@utils/environment';
import { generateSuccessReceiptMessage } from '@utils/index';
import React, { type FormEvent } from 'react';

import IconMail from './IconMail';
import S from './styled';

const Contact: React.FC = () => {
  const {
    FORM_DATA: { PLACEHOLDERS, BUTTON }, ADDRESS_PREFIX, EMAIL_PREFIX, TITLE,
  } = CONTACTS;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, msg } = e.currentTarget.elements as unknown as {
      name: HTMLInputElement
      email: HTMLInputElement
      msg: HTMLTextAreaElement
    };

    if (name.value !== '' && email.value !== '' && msg.value !== '') {
      alert(generateSuccessReceiptMessage(name.value, email.value));
      name.value = '';
      email.value = '';
      msg.value = '';
    }
  };
  return (
    <S.ContactWrapper>
      <div>
        <h3>{TITLE}</h3>
        <form onSubmit={handleSubmit}>
          <S.Input type="text" name="name" placeholder={PLACEHOLDERS.NAME} />
          <S.Input type="email" name="email" placeholder={PLACEHOLDERS.EMAIL} />
          <S.Textarea name="msg" id="msg" cols={30} rows={6} placeholder={PLACEHOLDERS.MSG} />
          <S.Button type="submit">{BUTTON}</S.Button>
        </form>
      </div>
      <div>
        <IconMail />
        <p>
          {EMAIL_PREFIX} <p>{APP_CONTACT_EMAIL}</p>
        </p>
        <p>
          {ADDRESS_PREFIX} <p>{APP_CONTACT_ADDRESS}</p>
        </p>
      </div>
    </S.ContactWrapper>
  );
};

export default Contact;
