function BrokenComponent() {
  throw new Error("Este componente ha fallado");
  return (<div>Componente roto</div>)
}

export default BrokenComponent;