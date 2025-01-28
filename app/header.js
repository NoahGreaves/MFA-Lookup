
const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

export default function Header({ title }) {
    return <h1>{title ? title : 'Default title'}</h1>;
  }