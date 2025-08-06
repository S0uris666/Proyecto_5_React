import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar la UI de error
    //Que tipo de error te trae

    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    //

    // Podés registrar el error en un servicio externo como Sentry o LogRocket

    console.error("Error atrapado por ErrorBoundary:", error, errorInfo);

    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", color: "#ff0000" }}>
          <h2>¡Uy! Algo salió mal.</h2>
           <img
            src="public/ErrorBoundary.png"
            alt="Cohete estrellado"
            style={{ width: '150px', margin: '20px 0' }}
          />


          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />

            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
