
const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const text = {
    color: 'white'
}

export default function Header({ title }) {
    return <h1 style={text}>{title ? title : 'Default title'}</h1>;
  }