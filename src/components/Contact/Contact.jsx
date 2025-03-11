import React from "react";
import clsx from "clsx";

import css from "./Contact.module.css";
import { deleteContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";

function Contact({ name, number, id }) {
  const dispatch = useDispatch();

  return (
    <li className={clsx(css.contactItem)}>
      <div>
        <span>👤</span>
        <span>{name}</span>
      </div>
      <div>
        <span>📞</span>
        <span>{number}</span>
      </div>
      <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
    </li>
  );
}

export default Contact;
