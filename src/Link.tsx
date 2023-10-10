import { Component } from 'solid-js'

const Link: Component<{ href: string; text: string }> = props => {
  return (
    <a href={props.href} target="__blank">
      {props.text}
    </a>
  )
}

export default Link
