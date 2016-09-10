import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import { hint } from 'css-effects';
import style from './style.scss';

function Button(props) {
  const className = classNames(props.icon ? props.icon : null);
  const attrs = _.pick(props);
  let btnClass = '';
  const btnAttrs = _.pick(props, 'onClick');
  if (props.title) {
    btnClass = hint();
    btnAttrs['data-hint'] = props.title;
  }
  return (
    <span className={btnClass} {...btnAttrs}>
      <i className={className} {...attrs}>{props.text}</i>
    </span>
  );
}

export default function Toolbar(props) {
  const action = type => () => props.onAction(type);
  const editMode = props.mode === 'edit';
  const modeButton = {
    icon: editMode ? 'fa fa-eye' : 'fa fa-edit',
    title: editMode ? 'Preview' : 'Edit',
    onClick: action('mode'),
  };
  // TODO disabled button states
  return (
    <div className={style.toolbar}>
      <Button {...modeButton} />
      <Button icon="fa fa-floppy-o" title="Save" onClick={action('save')} />
      <Button icon="fa fa-undo" title="Undo" onClick={action('undo')} />
      <Button icon="fa fa-repeat" title="Redo" onClick={action('redo')} />
      <Button icon="fa fa-bold" title="Bold" onClick={action('bold')} />
      <Button icon="fa fa-italic" title="Italic" onClick={action('italic')} />
      <Button icon="fa fa-list-ol" title="Numbered list" onClick={action('ol')} />
      <Button icon="fa fa-list" title="Bulleted list" onClick={action('ul')} />
    </div>
  );
}
