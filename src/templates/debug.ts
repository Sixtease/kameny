import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

const history: string[] = [];

class Debug extends Component {
  render() {
    return html`
      <pre class="debug">
        ${history.join("\n")}
      </pre>
    `;
  }
}

export const debug = (data: Object) => {
  const str = JSON.stringify(data);
  history.push(str);
  const root = document.getElementById('debug-console');
  render(
    html`<${Debug}/>`,
    root
  );
  root.classList.add('debug-console-shown');
};

