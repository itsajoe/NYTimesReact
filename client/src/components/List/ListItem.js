import React from "react";
// import { FormBtn } from "../Form";

export const ListItem = props =>
  <li className="list-group-item">
    <h3>{props.title}</h3>
    <p>{props.body}</p>
    <a href={props.url}>{props.url}</a> 
    {props.children}
  </li>;
