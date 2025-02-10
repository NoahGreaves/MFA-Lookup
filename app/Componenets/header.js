const header = {
    // position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    // backgroundColor: '#0072f0', // KEEP - OFFICIAL BLUE ATB COLOUR
    backgroundColor: 'red', // KEEP - OFFICIAL BLUE ATB COLOUR
    // marginBottom: '20%'
}

export default function Header({ title }) {
    return <h1 style={header}>{title ? title : 'Default title'}</h1>;
  }